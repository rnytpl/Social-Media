import mongoose, { Schema } from "mongoose";

export const commentSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
