import { Alert, Box, Button, CircularProgress, Snackbar, Typography } from "@mui/material";
import useWishlist from "../../../hooks/useWishlist";
import WishListGrid from "../../components/wishlist/WishListGrid/WishListGrid";

const WishListPage = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();

  if (loading) return <p>Loading...</p>;

  return (
    <Box className="products-box">

      <Typography variant="h4" sx={{ mb: 2 }}>
        My Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography>No books yet</Typography>
      ) : (
        <WishListGrid
          wishlist={wishlist}
          onRemove={removeFromWishlist}
        />
      )}

    </Box>
  );
};

export default WishListPage;