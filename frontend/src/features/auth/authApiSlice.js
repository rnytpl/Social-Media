import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const authAdapter = createEntityAdapter({})

const initialState = authAdapter.getInitialState()

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: responseData => {
                const { token, findUser } = responseData
                return authAdapter.setAll(initialState, findUser)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Auth', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Auth', id }))
                    ]
                } else return [{ type: 'Auth', id: 'LIST' }]
            }

        }),
        register: builder.mutation({
            query: userInfo => ({
                url: "auth/register",
                method: "POST",
                body: userInfo
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice