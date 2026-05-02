import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Book } from "../api/types/book";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log(" FETCHING BOOKS...");

        const res = await axiosInstance.get<Book[]>("/books");

        console.log(" RAW RESPONSE:", res);
        console.log(" RESPONSE DATA:", res.data);

        setBooks(res.data ?? []);
      } catch (error) {
        console.error(" Books error:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading };
};

export default useBooks;