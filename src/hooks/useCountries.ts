import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import type { Country } from "../api/types/country";

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axiosInstance.get<Country[]>("/countries");
        setCountries(res.data ?? []);
      } catch (error) {
        console.error("Countries error:", error);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
};

export default useCountries;