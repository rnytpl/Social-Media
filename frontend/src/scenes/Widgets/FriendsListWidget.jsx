import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import { Chat } from "@mui/icons-material";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useGetUsersQuery } from "features/users/usersApiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FriendsListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.friends);
  console.log(friends);
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {friends.map((friend) => (
        <Box mb="1rem" key={friend._id}>
          <FlexBetween>
            <UserImage image={friend.picturePath} />
            <Typography
              textAlign="start"
              width="50%"
              fontWeight="500"
              color={palette.neutral.main}
            >{`${friend.firstName} ${friend.lastName}`}</Typography>
            <Chat />
          </FlexBetween>
        </Box>
      ))}
      <Box display="flex" flexDirection="column" gap="1.5rem"></Box>
    </WidgetWrapper>
  );
};
export default FriendsListWidget;
