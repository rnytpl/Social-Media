import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  newComment,
} from "../controllers/postsControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* READ */
router.route("/").get(getFeedPosts).post(createPost);

router.post("/:postId", verifyToken, newComment);

router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
