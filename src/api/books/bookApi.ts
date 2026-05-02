import axiosInstance from "../../axios/axios";
import type { Book } from "../types/book";

const booksApi = {
  findAll: async () => {
    return await axiosInstance.get<Book[]>("/books");
  },

  findById: async (id: number) => {
    return await axiosInstance.get<Book>(`/books/${id}`);
  }
};

export default bookApi;