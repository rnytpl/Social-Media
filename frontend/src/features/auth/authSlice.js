import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        mode: "light",
        user: null,
        token: null,
        posts: [],
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        }
    }
})

export const { setMode } = authSlice.actions