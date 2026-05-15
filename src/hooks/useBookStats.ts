import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { BookStats } from "../api/types/bookStats";

const useBookStats = () => {
  const [stats, setStats] = useState<BookStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get<BookStats[]>(
          "/books/stats"
        );

        setStats(res.data ?? []);
      } catch (err) {
        console.error("Stats error:", err);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
};

export default useBookStats;