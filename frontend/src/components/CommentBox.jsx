import { Box, Divider, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { FlexBetween } from "./FlexBetween";
import { useCreateCommentMutation } from "features/posts/postsApiSlice";
import { useState } from "react";

const CommentBox = ({ userId, postId, token }) => {
  const [comment, setComment] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const commentHandler = async (e) => {
    e.preventDefault();
    await createComment([userId, postId, token, comment]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box width="100%" padding="0.5rem">
      <FlexBetween>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mr: "0.5rem" }}
          placeholder="Write your comment here"
          variant="standard"
          fullWidth
        />
        <IconButton onClick={commentHandler}>
          <Send />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};
export default CommentBox;
