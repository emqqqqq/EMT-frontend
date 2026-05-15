import { Grid } from "@mui/material";
import type { Book } from "../../../api/types/book";
import BookCard from "../BookCard/BookCard";

interface BookGridProps {
  books: Book[];
  onEdit: (id: number, data: BookFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const BookGrid = ({ books, onEdit, onDelete }: BookGridProps) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
      {books.map((book) => (
        <Grid item key={book.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <BookCard book={book} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;