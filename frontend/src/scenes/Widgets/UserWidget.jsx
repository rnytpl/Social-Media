import {
  ManageAccountsOutlied,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import { FlexBetween } from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { selectUserById } from "features/users/usersApiSlice";
// import { useGetUserQuery } from "features/users/usersApiSlice";

const UserWidget = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const { id } = useParams();
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetUserQuery([id, token]);
  // const user = useSelector((state) => selectUserById(state, id));
  // console.log(user, "user");
  // if (isLoading) {
  //   <p>Loading...</p>;
  // }

  // if (isError) {
  //   return <p className="isError">{error?.data?.message}</p>;
  // }

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${id}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={user.picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>{user.friends.length}</Typography>
          </Box>
          <ManageAccountsOutlined />
        </FlexBetween>
        <Divider />
        {/* SECOND ROW */}
        <Box p="1rem 0">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>{user.location}</Typography>
          </Box>
        </Box>
        {/* THIRD ROW */}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Who's viewed your profile</Typography>
            <Typography color={medium} fontWeight="500">
              {user.viewedProfile}
            </Typography>
          </FlexBetween>
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Impressions of your post</Typography>
            <Typography color={medium} fontWeight="500">
              {user.impressions}
            </Typography>
          </FlexBetween>
        </Box>
        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween>
            <FlexBetween gap="1rem">
              <img src="../assets/twitter.png" alt="twitter" />
              <Box>
                <Typography color={main} fontWeight="500">
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default UserWidget;
