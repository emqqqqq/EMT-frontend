import "./AuthorsPage.css";
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from "@mui/material";
import useAuthors from "../../../hooks/useAuthors";
import AuthorGrid from "../../components/author/AuthorGrid/AuthorGrid.tsx";
import type { AuthorFormData } from "../../../api/types/author";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddAuthorDialog from "../../components/author/AddAuthorDialog/AddAuthorDialog";
import useAuth from '../../../hooks/useAuth.ts';

const AuthorsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const { authors, loading, onAdd, onEdit, onDelete } = useAuthors();
  const navigate = useNavigate();
  const [addAuthorDialogOpen, setAddAuthorDialogOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

    const handleAdd = async (data: AuthorFormData) => {
      try {
        await onAdd(data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err instanceof Error ? err.message : 'Failed to add Author.'
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
              <Typography variant="h4">Authors</Typography>

            {isAdmin && (
                <Button variant="contained" onClick={() => setAddAuthorDialogOpen(true)}>
                  Add Author
                </Button>
            )}
            </Box>

          <AuthorGrid authors={authors ?? []} onEdit={onEdit} onDelete={onDelete}/>

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

            <AddAuthorDialog
              open={addAuthorDialogOpen}
              onClose={() => setAddAuthorDialogOpen(false)}
              onAdd={handleAdd}
            />
        </>
      )}
    </Box>
  );
};

export default AuthorsPage;