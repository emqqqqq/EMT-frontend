import type { Author } from "./author";
import type { Category } from "./category";
import type { State } from "./state";

export interface Book {
  id: number;
  name: string;
  category: Category;
  author: Author;
  state: State;
  availableCopies: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookFormData {
  name: string;
  category: string;
  authorId: string;
  availableCopies: string;
}