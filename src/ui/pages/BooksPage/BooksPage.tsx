import "./BooksPage.css";
import useBooks from "../../../hooks/useBooks";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import BookGrid from "../../components/book/BookGrid/BookGrid";

const BooksPage = () => {
  const { books, loading } = useBooks();
  const navigate = useNavigate();

  console.log("BOOKS FROM HOOK:", books);

  return (
    <Box className="books-box">
      {loading && (
        <Box className="progress-box">
          <CircularProgress />
        </Box>
      )}

      <Typography variant="h4" mb={2}>
        Books
      </Typography>

        <Button onClick={() => navigate("/books/stats")}>
          View Stats
        </Button>
      {!loading && <BookGrid books={books ?? []} />}
    </Box>
  );
};

export default BooksPage;