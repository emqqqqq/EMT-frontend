import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Author } from "../../../api/types/author";
import { useNavigate } from "react-router-dom";

interface Props {
  author: Author;
}

const AuthorCard = ({ author }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/authors/${author.id}`)}
      sx={{
        p: 2,
        border: "1px solid #ddd",
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
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
                        <Button startIcon={<EditIcon/>} color='warning'>Edit</Button>
                        <Button startIcon={<DeleteIcon/>} color='error'>Delete</Button>
                      </Box>
                </CardActions>
    </Card>

  );
};

export default AuthorCard;