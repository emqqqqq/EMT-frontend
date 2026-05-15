import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, Card, CardActions, CardContent, Snackbar, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Country, CountryFormData } from "../../../api/types/country";
import EditCountryDialog from "../EditCountryDialog/EditCountryDialog";
import DeleteCountryDialog from "../DeleteCountryDialog/DeleteCountryDialog";
import useAuth from '../../../../hooks/useAuth.ts';

interface Props {
  country: Country;
  onEdit: (id: number, data: CountryFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const CountryCard = ({ country, onEdit, onDelete }: Props) => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const navigate = useNavigate();

  const [editCountryDialogOpen, setEditCountryDialogOpen] = useState(false);
  const [deleteCountryDialogOpen, setDeleteCountryDialogOpen] = useState(false);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ""
  });

  const handleEdit = async (id: number, data: CountryFormData) => {
    try {
      await onEdit(id, data);
      setEditOpen(false);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Failed to edit country"
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
        message: err instanceof Error ? err.message : "Failed to delete country"
      });
    }
  };

  return (
      <>
    <Card sx={{ width: "100%" }}>
    <CardContent>
          <Typography>{country.name}</Typography>
          <Typography>{country.continent}</Typography>
    </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          startIcon={<InfoIcon/>}
          onClick={() => navigate(`/countries/${country.id}`)}
        >
          Info
        </Button>
        <Box>
        {isAdmin && (
        <Button
          startIcon={<EditIcon />}
          color="warning"
          onClick={() => setEditCountryDialogOpen(true)}
        >
          Edit
        </Button>
        )}
        {isAdmin && (
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => setDeleteCountryDialogOpen(true)}
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

      <EditCountryDialog
        country={country}
        open={editCountryDialogOpen}
        onClose={() => setEditCountryDialogOpen(false)}
        onEdit={handleEdit}
      />

      <DeleteCountryDialog
        country={country}
        open={deleteCountryDialogOpen}
        onClose={() => setDeleteCountryDialogOpen(false)}
        onDelete={handleDelete}
      />
     </>
  );
};

export default CountryCard;