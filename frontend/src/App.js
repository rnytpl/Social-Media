import React from "react"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Routes, Route } from "react-router-dom";
import Navbar from "./scenes/Navbar/Navbar";
import LoginPage from "./scenes/LoginPage/LoginPage";
const App = () => {
  // Pass selected mode as an argument to themeSettings so that createTheme can generate a theme with given options
  // After that useMemo is going to memoize and cache results returned from createTheme and only run again when the dependency has altered
  const mode = useSelector(state => state.auth.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])



  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />


        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>

      </ThemeProvider>
    </div>

  )
}
export default App