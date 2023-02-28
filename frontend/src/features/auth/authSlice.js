import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login",
    async (userCredentials, { rejectWithValue }) => {

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                ...userCredentials
            })
            console.log(response)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        mode: "dark",
        user: null,
        token: null,
        isLoading: false,
        isSuccess: false,
        isError: null,
        posts: [],
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = state.mode === "light" ? "dark" : "light"
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                const { token, findUser } = action.payload
                state.isLoading = false
                state.token = token
                state.user = findUser
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload)
                state.isLoading = false
                state.isError = action.payload

            })
    }
})

export const { setMode } = authSlice.actions