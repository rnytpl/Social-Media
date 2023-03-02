import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getUser,
  getUsers,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.route("/").get(getUsers);

router.get("/:id", verifyToken, getUser);

router.get("/:id/friends", getUserFriends);

router.route("/:id/:friendId").patch(verifyToken, addRemoveFriend);

export default router;
