import { Box, CircularProgress, Typography, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import useBook from "../../../hooks/useBookDetails";

const BookDetailsPage = () => {
  const { id } = useParams();
  const { book, loading } = useBook(id);

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    return (
      <Box>
        <Typography>Book not found</Typography>
      </Box>
    );
  }

  return (
    <Box align="center">
      <Typography variant="h4">{book.name}</Typography>

      <Typography mt={2}>
        Author: {book.author.name} {book.author.surname}
      </Typography>

      <Typography mt={1}>
        Country: {book.author.country.name}
      </Typography>

      <Box mt={2} display="flex" gap={1}>
        <Chip label={book.category} />
        <Chip label={book.state} />
      </Box>

      <Typography mt={2}>
        Available copies: {book.availableCopies}
      </Typography>
    </Box>
  );
};

export default BookDetailsPage;