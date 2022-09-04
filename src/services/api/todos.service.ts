import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface TodoInput {
  userId: number;
  title: string;
  completed?: boolean;
}
export interface Todo extends TodoInput {
  id: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo" as const, id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    addTodo: builder.mutation<Todo, TodoInput>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api;
