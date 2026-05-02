import { Grid } from "@mui/material";
import type { Book } from "../../../api/types/book";
import BookCard from "../BookCard/BookCard";

interface Props {
  books: Book[];
}

const BookGrid = ({ books = [] }: Props) => {
  return (
    <Grid container spacing={2}>
      {books.map((book) => (
        <Grid item key={book.id} xs={12} sm={6} md={4}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;