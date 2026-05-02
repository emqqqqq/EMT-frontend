import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import type { Book } from "../../../api/types/book";

interface Props {
  book: Book;
}

const BookCard = ({ book }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {book.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {book.author.name} {book.author.surname}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
              <Button
                startIcon={<InfoIcon/>}
                onClick={() => navigate(`/books/${book.id}`)}
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

export default BookCard;