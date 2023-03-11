import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById } from "features/posts/postsApiSlice";
import { useLikePostMutation } from "features/posts/postsApiSlice";
import CommentBox from "components/CommentBox";
const PostWidget = ({ postId }) => {
  const {
    id,
    userId,
    firstName,
    lastName,
    description,
    location,
    occupation,
    comments,
    likes,
    userPicturePath,
  } = useSelector((state) => selectPostById(state, postId));
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(likes[user._id]);
  const primaryLight = palette.primary.main;
  const main = palette.neutral.main;
  console.log(comments, "comments");
  const [likePostMutation, { isLoading }] = useLikePostMutation();

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        name={`${firstName} ${lastName}`}
        location={location}
        userPicturePath={userPicturePath}
        postId={id}
        postUserId={userId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() =>
                likePostMutation({ postId: id, userId: user._id, token })
              }
            >
              {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>

            <Typography>{Object.keys(likes).length}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <Box key={comment._id}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                {comment.comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
      <CommentBox userId={user._id} postId={postId} token={token} />
    </WidgetWrapper>
  );
};

export default PostWidget;
