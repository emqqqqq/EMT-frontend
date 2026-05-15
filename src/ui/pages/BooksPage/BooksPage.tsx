import "./BooksPage.css";
import useBooks from "../../../hooks/useBooks";
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from "@mui/material";
import BookGrid from "../../components/book/BookGrid/BookGrid";
import AddBookDialog from "../../components/book/AddBookDialog/AddBookDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BookFormData } from "../../../api/types/book";
import useAuth from '../../../hooks/useAuth.ts';

const BooksPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const { books, loading, onAdd, onEdit, onDelete } = useBooks();
  const navigate = useNavigate();
  const [addBookDialogOpen, setAddBookDialogOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

    const handleAdd = async (data: BookFormData) => {
      try {
        await onAdd(data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err instanceof Error ? err.message : 'Failed to add Book.'
        });
      }
    };

  return (
    <Box className="products-box">

      {loading && (
        <Box className="progress-box">
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4">Books</Typography>

            <Button onClick={() => navigate("/books/stats")}>
              View Stats
            </Button>

            {isAdmin && (
               <Button variant="contained" onClick={() => setAddBookDialogOpen(true)}>
                 Add Book
               </Button>
             )}
          </Box>

          <BookGrid books={books ?? []} onEdit={onEdit} onDelete={onDelete}/>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              severity="error"
              onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          <AddBookDialog
            open={addBookDialogOpen}
            onClose={() => setAddBookDialogOpen(false)}
            onAdd={handleAdd}
          />
        </>
      )}
    </Box>
  );
};

export default BooksPage;