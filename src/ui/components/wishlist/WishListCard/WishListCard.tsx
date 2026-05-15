import { Box, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import useWishlist from "../../../../hooks/useWishlist";
import { FaHeart } from "react-icons/fa";

interface Props {
  item: any;
  onRemove: (bookId: number) => void;
}

const WishListCard = ({ item, onRemove }: Props) => {
  const { removeFromWishlist } = useWishlist();

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography variant="h6">
          {item.book.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {item.book.author.name} {item.book.author.surname}
        </Typography>
        <Box sx={{ justifyContent: "space-between", mt: 2 }} >
            <FaHeart
              color="red"
              size={18}
              style={{ cursor: "pointer" }}
              onClick={() => onRemove(item.book.id)}
            />
          </Box>
      </CardContent>
    </Card>
  );
};

export default WishListCard;