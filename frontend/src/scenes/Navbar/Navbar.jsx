import { FlexBetween } from "../../components/FlexBetween"
import { Box, Typography, InputBase, FormControl, IconButton, Select, MenuItem, useMediaQuery } from "@mui/material"
import { Search, Message, Notifications, Help, DarkMode, LightMode, Menu, Close } from '@mui/icons-material/';
import { useTheme } from "@mui/material";
import { setMode } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const isNonMobileScreen = useMediaQuery('(min-width:1000px)')
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);


    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    return (
        <FlexBetween sx={{ p: "1.15rem 2.75rem" }} backgroundColor={alt}>
            <FlexBetween gap="2.25rem">
                <Typography color="primary" fontSize="26px" fontWeight="bold">
                    SocioPedia
                </Typography>
                <Link to="/login">Login</Link>
                {
                    isNonMobileScreen && (
                        <FlexBetween gap="2.25rem" backgroundColor={neutralLight} padding="0.1rem 1.5rem" borderRadius="0.25rem">
                            <InputBase placeholder="Search..." />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                    )
                }

            </FlexBetween>
            {/* DESKTOP MAV */}
            {
                isNonMobileScreen && (
                    <FlexBetween gap="1.25rem">
                        <FlexBetween>
                            <IconButton sx={{ mr: "0.75rem" }} onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? <DarkMode sx={{ fontSize: "25px" }} /> : <LightMode sx={{ fontSize: "25px" }} />}
                            </IconButton>
                            <IconButton sx={{ mr: "0.75rem" }}>
                                <Message sx={{ fontSize: "25px" }} />
                            </IconButton>
                            <IconButton sx={{ mr: "0.75rem" }}>
                                <Notifications sx={{ fontSize: "25px" }} />
                            </IconButton>
                            <IconButton sx={{ mr: "0.75rem" }}>
                                <Help sx={{ fontSize: "25px" }} />
                            </IconButton>
                        </FlexBetween>
                        <FlexBetween>
                            <FormControl value="Hilal">
                                <Select value="Hilal" sx={{ width: "125px" }}>
                                    <MenuItem value="Hilal">
                                        <Typography>Hilal</Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        Logout
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </FlexBetween>
                )
            }
            {/* MOBILE NAV */}
            {
                !isNonMobileScreen && !isMobileMenuToggled && (
                    <Menu onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} />
                )
            }
            {
                isMobileMenuToggled && (
                    <Box position="fixed"
                        right="0"
                        top="0"
                        zIndex="10"
                        maxWidth="300px"
                        minWidth="200px"
                        backgroundColor={background}
                    >
                        <Box display="flex" height="100%">
                            <MenuItem onClick={() => dispatch(setMode())} sx={{ width: "100%" }}>
                                {theme.palette.mode === "dark" ?
                                    <DarkMode
                                        sx={{ fontSize: "25px", width: "100%" }}
                                    /> :
                                    <LightMode
                                        sx={{ fontSize: "25px", width: "100%" }}
                                    />}
                            </MenuItem>
                            <MenuItem
                                onClick={() => setIsMobileMenuToggled(prev => !prev)}
                                sx={{
                                    width: "100%"
                                }}>
                                <Close sx={{ fontSize: "25px", height: "30px", width: "100%", padding: "0.25rem 0" }} />
                            </MenuItem>
                        </Box>

                        <MenuItem
                            sx={{
                                padding: "1rem 2rem",
                                textAlign: "center"
                            }}
                        >
                            Hilal
                        </MenuItem>
                        <MenuItem
                            sx={{
                                padding: "1rem 2rem",
                                textAlign: "center"
                            }}
                        >
                            Logout
                        </MenuItem>
                    </Box>
                )
            }
        </FlexBetween >
    )
}
export default Navbar