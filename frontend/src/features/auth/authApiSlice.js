import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const authAdapter = createEntityAdapter({});

const initialState = authAdapter.getInitialState();

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApiSlice;
