import type { Book } from "./book";

export interface WishlistItem {
  id: number;
  book: Book;
}

export interface WishlistRequest {
  userId: number;
  bookId: number;
}