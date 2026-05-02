import { Box, CircularProgress, Typography } from "@mui/material";
import useCountries from "../../../hooks/useCountries";
import CountryGrid from "../../components/country/CountryGrid/CountryGrid.tsx";

const CountriesPage = () => {
  const { countries, loading } = useCountries();

  return (
    <Box sx={{ p: 3 }}>
      {loading && <CircularProgress />}

      {!loading && (
        <>
          <Typography variant="h4" mb={2}>
            Countries
          </Typography>

          <CountryGrid countries={countries} />
        </>
      )}
    </Box>
  );
};

export default CountriesPage;