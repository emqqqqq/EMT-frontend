import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Book, BookFormData } from "../../../api/types/book";
import EditBookDialog from "../EditBookDialog/EditBookDialog";
import DeleteBookDialog from "../DeleteBookDialog/DeleteBookDialog";
import useBooks from "../../../../hooks/useBooks";
import useAuth from '../../../../hooks/useAuth.ts';
import useWishlist from "../../../../hooks/useWishlist";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  book: Book;
  onEdit: (id: number, data: BookFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const BookCard = ({ book, onEdit, onDelete }: Props) => {
  const [liked, setLiked] = useState(false);
  const { user } = useAuth();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = wishlist?.some(
    (item) => item.book.id === book.id
  );

  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const navigate = useNavigate();

  const [editBookDialogOpen, setEditBookDialogOpen] = useState(false);
  const [deleteBookDialogOpen, setDeleteBookDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

  const handleEdit = async (id: number, data: BookFormData) => {
    try {
      await onEdit(id, data);
      setEditOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Failed to edit book"
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await onDelete(id);
      setDeleteOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Failed to delete book"
      });
    }
  };

    const handleWishlistToggle = async () => {
      try {
        if (isInWishlist) {
          await removeFromWishlist(book.id);
        } else {
          await addToWishlist(book.id);
        }
      } catch (err) {
        console.error(err);
      }
    };

  return (
  <>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="h6">{book.name}</Typography>

          <Typography variant="body2" color="text.secondary">
            {book.author.name} {book.author.surname}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            startIcon={<InfoIcon />}
            onClick={() => navigate(`/books/${book.id}`)}
          >
            Info
          </Button>

          <Box>
          {isAdmin && (
            <Button
              startIcon={<EditIcon />}
              color="warning"
              onClick={() => setEditBookDialogOpen(true)}
            >
              Edit
            </Button>
            )}
            {isAdmin && (
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => setDeleteBookDialogOpen(true)}
            >
              Delete
            </Button>
            )}
          </Box>

          <Button
            onClick={handleWishlistToggle}
            sx={{
              minWidth: 0,
              padding: 1
            }}
          >
            {isInWishlist ? (
              <FaHeart color="red" size={20} />
            ) : (
              <FaRegHeart size={20} />
            )}
          </Button>
        </CardActions>
      </Card>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">
          {snackbar.message}
        </Alert>
      </Snackbar>

      <EditBookDialog
        book={book}
        open={editBookDialogOpen}
        onClose={() => setEditBookDialogOpen(false)}
        onEdit={handleEdit}
      />

      <DeleteBookDialog
        book={book}
        open={deleteBookDialogOpen}
        onClose={() => setDeleteBookDialogOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default BookCard;