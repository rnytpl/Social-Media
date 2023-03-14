import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import { Chat } from "@mui/icons-material";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { selectAllUsers } from "features/users/usersApiSlice";

const FriendsListWidget = () => {
  const { palette } = useTheme();
  const friends = useSelector((state) => state.auth.user.friends);
  const allUsers = useSelector((state) => selectAllUsers(state));
  const filteredUsers = allUsers.filter((user) => friends.includes(user._id));

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
      {filteredUsers.map((friend) => (
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
