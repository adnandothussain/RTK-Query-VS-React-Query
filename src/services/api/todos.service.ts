import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface TodoInput {
  userId: number;
  title: string;
  completed?: boolean;
}
export interface Todo extends TodoInput {
  id: number;
}
