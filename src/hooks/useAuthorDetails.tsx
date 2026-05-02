import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Author } from "../api/types/author";

const useAuthor = (id: string | number | undefined) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAuthor = async () => {
      try {
        const res = await axiosInstance.get<Author>(`/authors/${id}`);
        setAuthor(res.data);
      } catch (error) {
        console.error("Author error:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  return { author, loading };
};

export default useAuthor;