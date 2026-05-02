import { Box, CircularProgress, Typography } from "@mui/material";
import useAuthors from "../../../hooks/useAuthors";
import AuthorGrid from "../../components/author/AuthorGrid/AuthorGrid.tsx";

const AuthorsPage = () => {
  const { authors, loading } = useAuthors();

  return (
    <Box sx={{ p: 3 }}>
      {loading && <CircularProgress />}

      {!loading && (
        <>
          <Typography variant="h4" mb={2}>
            Authors
          </Typography>

          <AuthorGrid authors={authors} />
        </>
      )}
    </Box>
  );
};

export default AuthorsPage;