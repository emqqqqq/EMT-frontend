import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Author } from "../api/types/author";

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await axiosInstance.get<Author[]>("/authors");
        setAuthors(res.data ?? []);
      } catch (error) {
        console.error("Authors error:", error);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, loading };
};

export default useAuthors;