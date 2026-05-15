import { useEffect, useState } from "react";
import wishlistApi from "../api/wishlist/wishlistApi";
import type { WishlistItem } from "../api/types/wishlist";

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await wishlistApi.getWishlist();
      setWishlist(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (bookId: number) => {
    try {
      await wishlistApi.addToWishlist(bookId);
      await fetchWishlist(); // refresh state
    } catch (err) {
      console.log("ADD ERROR:", err);
    }
  };

  const removeFromWishlist = async (bookId: number) => {
    try {
      await wishlistApi.removeFromWishlist(bookId);
      await fetchWishlist(); // refresh state
    } catch (err) {
      console.log("REMOVE ERROR:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
  };
};

export default useWishlist;