import { Box, CircularProgress, Typography, Paper } from "@mui/material";
import useBookStats from "../../../hooks/useBookStats";

const BookStatsPage = () => {
  const { stats, loading } = useBookStats();

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Book Statistics
      </Typography>

      {stats.map((s, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">
            Category: {s.category}
          </Typography>

          <Typography>
            Total Books: {s.totalBooks}
          </Typography>

          <Typography>
            Available Copies: {s.totalAvailableCopies}
          </Typography>

          <Typography>
            Not Good Books: {s.booksNotGood}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default BookStatsPage;