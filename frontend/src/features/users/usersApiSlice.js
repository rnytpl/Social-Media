import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ([token, friends]) => ({
        url: `users`,
        body: friends,
        headers: {
          authorization: token,
        },
      }),

      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result = [], error, arg) => {
        if (result?.ids) {
          return [
            // Create an object that contains two objects
            {
              type: "User",
              id: "LIST",
            },
            // map over result.ids to create an object for each user to tag them so in future we can use the same tag for invalidation
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    getUser: builder.query({
      query: ([id, token]) => ({
        url: `users/${id}`,
        headers: {
          authorization: token,
        },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log(responseData);
        const user = { ...responseData };
        user.id = user._id;
        return usersAdapter.setOne(initialState, responseData);
      },
      providesTags: (result = [], error, arg) => {
        if (result?.ids) {
          return [
            {
              type: "User",
              id: "LIST",
            },
            // map over result.ids to create an object for each user to tag them so in future we can use the same tag for invalidation
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApiSlice;

// // Get getUsers query result
// // export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
// export const selectUserResult = usersApiSlice.endpoints.getUser.select();

// const selectUsersData = createSelector(selectUsersResult, (usersResult) => {
//   return usersResult.data;
// });
// const selectUserData = createSelector(selectUserResult, (userResult) => {
//   return userResult.data;
// });

// export const { selectAll: selectAllUsers, selectIds: selectUserIds } =
//   usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

// export const { selectById: selectUserById } = usersAdapter.getSelectors(
//   (state) => selectUserData(state) ?? initialState
// );
