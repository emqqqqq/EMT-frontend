import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useAuthor from "../../../hooks/useAuthorDetails";

const AuthorDetailsPage = () => {
  const { id } = useParams();
  const { author, loading } = useAuthor(id);

  if (loading) return <CircularProgress />;

  if (!author) return <Typography>Author not found</Typography>;

  return (
    <Box align="center">
      <Typography variant="h4">
        {author.name} {author.surname}
      </Typography>

      <Typography mt={2}>
        Country: {author.country?.name}
      </Typography>
    </Box>
  );
};

export default AuthorDetailsPage;