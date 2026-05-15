import { Grid } from "@mui/material";
import type { Country } from "../../../api/types/country";
import CountryCard from "../CountryCard/CountryCard";

interface Props {
  countries: Country[];
  onEdit: (id: number, data: CountryFormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const CountryGrid = ({ countries = [], onEdit, onDelete }: Props) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
      {countries.map((country) => (
        <Grid item key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CountryCard country={country} onEdit={onEdit} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryGrid;