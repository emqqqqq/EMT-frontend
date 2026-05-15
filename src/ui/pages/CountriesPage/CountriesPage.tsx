import "./CountriesPage.css";
import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from "@mui/material";
import useCountries from "../../../hooks/useCountries";
import CountryGrid from "../../components/country/CountryGrid/CountryGrid.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CountryFormData } from "../../../api/types/countries";
import AddCountryDialog from "../../components/country/AddCountryDialog/AddCountryDialog";
import useAuth from '../../../hooks/useAuth.ts';

const CountriesPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.roles?.some((r: any) => r.authority === "ROLE_ADMINISTRATOR") ?? false;

  const { countries, loading, onAdd, onEdit, onDelete } = useCountries();
    const navigate = useNavigate();
    const [addCountryDialogOpen, setAddCountryDialogOpen] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
      open: false,
      message: ""
    });

    const handleAdd = async (data: CountryFormData) => {
      try {
        await onAdd(data);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err instanceof Error ? err.message : 'Failed to add Country.'
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
              <Typography variant="h4" mb={2}>
                Countries
              </Typography>
              {isAdmin && (
              <Button variant="contained" onClick={() => setAddCountryDialogOpen(true)}>
                 Add Country
               </Button>
              )}

            </Box>

          <CountryGrid countries={countries ?? []} onEdit={onEdit} onDelete={onDelete}/>

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

            <AddCountryDialog
              open={addCountryDialogOpen}
              onClose={() => setAddCountryDialogOpen(false)}
              onAdd={handleAdd}
            />
        </>
      )}
    </Box>
  );
};

export default CountriesPage;