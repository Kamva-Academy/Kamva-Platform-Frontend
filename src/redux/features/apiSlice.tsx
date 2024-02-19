import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from 'configs/Constants';


export const api = createApi({
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: 'http://localhost:9000/api/',
  }),
  endpoints: build => ({
    // // A query endpoint with no arguments
    // getTodos: build.query({
    //   query: () => '/todos'
    // }),
    // // A query endpoint with an argument
    // userById: build.query({
    //   query: userId => `/users/${userId}`
    // }),
    // // A mutation endpoint
    // updateTodo: build.mutation({
    //   query: updatedTodo => ({
    //     url: `/todos/${updatedTodo.id}`,
    //     method: 'POST',
    //     body: updatedTodo
    //   })
    // })
  })
})

// export const { useGetTodosQuery, useUserByIdQuery, useUpdateTodoMutation } = api;
