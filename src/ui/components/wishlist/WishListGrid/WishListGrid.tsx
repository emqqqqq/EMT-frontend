import { Grid } from "@mui/material";
import WishListCard from "../WishListCard/WishListCard";

interface Props {
  wishlist: any[];
  onRemove: (bookId: number) => void;
}

const WishListGrid = ({ wishlist, onRemove }: Props) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
      {wishlist.map((item) => (
        <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
          <WishListCard item={item} onRemove={onRemove} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WishListGrid;