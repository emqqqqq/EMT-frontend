import axiosInstance from "../../axios/axios";

const wishlistApi = {
  getWishlist: () => axiosInstance.get("/wishlist"),

  addToWishlist: (bookId: number) =>
    axiosInstance.post("/wishlist", { bookId }),

  removeFromWishlist: (bookId: number) =>
    axiosInstance.delete(`/wishlist/${bookId}`),
};

export default wishlistApi;