import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Book } from "../api/types/book";

const useBook = (id: string | number | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get<Book>(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Book error:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading };
};

export default useBook;