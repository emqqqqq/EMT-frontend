import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Author, AuthorFormData } from "../../../api/types/author";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import AuthorEditDialog from "../AuthorEditDialog/AuthorEditDialog";
import AuthorDeleteDialog from "../AuthorDeleteDialog/AuthorDeleteDialog";
import useAuthors from "../../../../hooks/useAuthors";
import useAuth from '../../../../hooks/useAuth.ts';

interface Props {
  author: Author;
  onEdit: (id: number, data: AuthorFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const AuthorCard = ({ author, onEdit, onDelete }: Props) => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const navigate = useNavigate();
  const [editAuthorDialogOpen, setEditAuthorDialogOpen] = useState(false);
  const [deleteAuthorDialogOpen, setDeleteAuthorDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

  const handleEdit = async (id: number, data: AuthorFormData) => {
    try {
      await onEdit(id, data);
      setEditOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Failed to edit author"
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
        message: err instanceof Error ? err.message : "Failed to delete author"
      });
    }
  };

  return (
      <>
    <Card sx={{ width: "100%" }}>
    <CardContent>
      <Typography>{author.name}</Typography> <Typography>{author.surname}</Typography>
      <Typography>{author.country.name}</Typography>
    </CardContent>
     <CardActions sx={{ justifyContent: 'space-between' }}>
              <Button
                startIcon={<InfoIcon/>}
                onClick={() => navigate(`/authors/${author.id}`)}
              >
                Info
              </Button>
              <Box>
              {isAdmin && (
                  <Button
                    startIcon={<EditIcon />}
                    color="warning"
                    onClick={() => setEditAuthorDialogOpen(true)}
                  >
                    Edit
                  </Button>
                )}
                {isAdmin && (
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => setDeleteAuthorDialogOpen(true)}
                  >
                    Delete
                  </Button>
                  )}
                </Box>
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

      <AuthorEditDialog
        author={author}
        open={editAuthorDialogOpen}
        onClose={() => setEditAuthorDialogOpen(false)}
        onEdit={handleEdit}
      />

      <AuthorDeleteDialog
        author={author}
        open={deleteAuthorDialogOpen}
        onClose={() => setDeleteAuthorDialogOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default AuthorCard;