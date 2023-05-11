import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  newComment,
  editComment,
} from "../controllers/postsControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/* READ */
router.route("/").get(getFeedPosts);

router.post("/:postId", verifyToken, newComment);

router.put("/:postId", verifyToken, editComment);

router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
