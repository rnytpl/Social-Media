import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { selectPostById } from "features/posts/postsApiSlice";
import { useLikePostMutation } from "features/posts/postsApiSlice";
import CommentBox from "components/CommentBox";
import { useSelector } from "react-redux";
import CommentUserImage from "components/CommentUserImage";

const PostWidget = ({ postId }) => {
  const {
    id,
    userId,
    firstName,
    lastName,
    description,
    location,
    picturePath,
    comments,
    likes,
    userPicturePath,
  } = useSelector((state) => selectPostById(state, postId));

  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const user = useSelector((state) => state.auth.user);
  const isLiked = Boolean(likes[user._id]);
  const primaryLight = palette.primary.main;
  const main = palette.neutral.main;
  const [likePostMutation] = useLikePostMutation();

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        name={`${firstName} ${lastName}`}
        location={location}
        userPicturePath={userPicturePath}
        postId={id}
        postUserId={userId}
      />
      <Box textAlign="center" p="1rem 0.25rem">
        {picturePath && <img width="50%" height="auto" src={picturePath} />}
      </Box>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => likePostMutation({ postId: id, userId: user._id })}
            >
              {isLiked ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
            </IconButton>

            <Typography>{Object.keys(likes).length}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box>
          {comments.map((comment) => (
            <Box key={comment._id} mt="1rem">
              <FlexBetween sx={{ justifyContent: "flex-start" }}>
                <CommentUserImage userId={comment.userId} />
                <Typography
                  sx={{
                    color: main,
                    m: "0.5rem",
                    pl: "1rem",
                  }}
                >
                  {comment.comment}
                </Typography>
              </FlexBetween>
            </Box>
          ))}
        </Box>
      )}
      <CommentBox userId={user._id} postId={postId} />
    </WidgetWrapper>
  );
};

export default PostWidget;
