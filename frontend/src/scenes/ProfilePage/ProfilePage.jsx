import { Box, useMediaQuery } from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendsListWidget from "scenes/Widgets/FriendsListWidget";
import MyPostWidget from "scenes/Widgets/MyPostWidget";
import PostsWidget from "scenes/Widgets/PostsWidget";
import UserWidget from "scenes/Widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const isXXLScreens = useMediaQuery("(min-width: 1700px");
  const isXLScreens = useMediaQuery("(min-width: 1400px");
  const isLargeScreens = useMediaQuery("(min-width: 1200px");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  useEffect(() => {}, []);
  return (
    <Box
      width={
        isXLScreens
          ? "70vw"
          : isLargeScreens
          ? "90vw"
          : isNonMobileScreens
          ? "90vw"
          : "70vw"
      }
      sx={{ m: "auto" }}
    >
      <Box
        display={isNonMobileScreens ? "flex" : "block"}
        justifyContent="space-evenly"
        p="1rem 2.25rem"
        // rowGap="2rem"
        // sx={{ mb: "2rem" }}
      >
        <Box>
          <Box flexBasis={isXXLScreens ? "25%" : "30%"} mb="2rem">
            <UserWidget />
          </Box>
          <Box>
            <FriendsListWidget />
          </Box>
        </Box>

        <Box flexBasis="60%">
          <PostsWidget />
        </Box>
      </Box>
    </Box>
  );
};
export default ProfilePage;
