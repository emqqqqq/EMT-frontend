import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Country } from "../../../api/types/country";
import { useNavigate } from "react-router-dom";

interface Props {
  country: Country;
}

const CountryCard = ({ country }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/countries/${country.id}`)}
      sx={{
        p: 2,
        border: "1px solid #ddd",
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
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
                              <Button startIcon={<EditIcon/>} color='warning'>Edit</Button>
                              <Button startIcon={<DeleteIcon/>} color='error'>Delete</Button>
                            </Box>
                      </CardActions>
    </Card>
  );
};

export default CountryCard;