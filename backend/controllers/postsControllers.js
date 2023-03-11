import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import asyncHandler from "express-async-handler";

export const createPost = asyncHandler(async (req, res) => {
  const { userId, description, picturePath } = req.body;

  const findUser = await User.findById(userId);

  if (!findUser) {
    res.status(401).json({ message: "User not found" });
    throw new Error("User not found, postsControllers");
  }

  const newPost = await Post.create({
    userId,
    firstName: findUser.firstName,
    lastName: findUser.lastName,
    location: findUser.location,
    description,
    picturePath,
    userPicturePath: findUser.picturePath,
    likes: {},
  });

  if (!newPost) {
    res.status(401).json({ message: "New post couldn't be created" });
    throw new Error("New post couldn't be created");
  }

  res.status(200).json(newPost);
});

export const newComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  console.log(postId);
  const { userId, comment } = req.body;
  const findUser = await User.findById(userId);
  const findPost = await Post.findById(postId);

  console.log(findPost);
  if (!findUser) {
    res.status(401).json({ message: "User not found" });
    throw new Error("User not found, comment");
  }

  if (!findPost) {
    res.status(401).json({ message: "Post not found" });
    throw new Error("Post not found, comment");
  }

  const newComment = await Comment.create({
    userId,
    comment,
  });

  if (!newComment) {
    res.status(401).json({ message: "Comment could not be created" });
    throw new Error("Comment could not be created");
  }

  findPost.comments.push(newComment);
  findPost.save();

  res.status(200).json(newComment);
});

export const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find().populate("comments");
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

export const likePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const post = await Post.findById(id);

  if (!post) {
    res.status(401).json({ message: "Post not found" });
    throw new Error("Post not found");
  }
  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likes: post.likes },
    { new: true }
  );
  res.status(200).json(updatedPost);
});
