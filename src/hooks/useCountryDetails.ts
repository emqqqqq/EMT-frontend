import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Country } from "../api/types/country";

const useCountry = (id: string | number | undefined) => {
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCountry = async () => {
      try {
        const res = await axiosInstance.get<Country>(`/countries/${id}`);
        setCountry(res.data);
      } catch (error) {
        console.error("Country error:", error);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [id]);

  return { country, loading };
};

export default useCountry;