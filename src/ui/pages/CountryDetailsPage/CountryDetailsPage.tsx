import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useCountry from "../../../hooks/useCountryDetails";

const CountryDetailsPage = () => {
  const { id } = useParams();
  const { country, loading } = useCountry(id);

  if (loading) return <CircularProgress />;

  if (!country) return <Typography>Country not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{country.name}</Typography>

      <Typography mt={2}>
        Continent: {country.continent}
      </Typography>
    </Box>
  );
};

export default CountryDetailsPage;