import React from "react";
import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./scenes/Navbar/Navbar";
import LoginPage from "./scenes/LoginPage/LoginPage";
import HomePage from "scenes/HomePage/HomePage";
import UserWidget from "scenes/Widgets/UserWidget";

const App = () => {
  const navigate = useNavigate();
  // Pass selected mode as an argument to themeSettings so that createTheme can generate a theme with given options
  // After that useMemo is going to memoize and cache results returned from createTheme and only run again when the dependency has altered
  const { mode, token, user } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/home" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/:id" element={user ? <UserWidget /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
};
export default App;
