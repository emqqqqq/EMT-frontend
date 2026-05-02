import { Grid } from "@mui/material";
import type { Country } from "../../../api/types/country";
import CountryCard from "../CountryCard/CountryCard";

interface Props {
  countries: Country[];
}

const CountryGrid = ({ countries = [] }: Props) => {
  return (
    <Grid container spacing={2}>
      {countries.map((country) => (
        <Grid item key={country.id} xs={12} sm={6} md={4}>
          <CountryCard country={country} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryGrid;