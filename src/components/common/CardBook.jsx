import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
const imageUrl =
  "https://product.hstatic.net/200000211451/product/img_1495_e855b16e3887446c97f75aaba8a4e0bb_large.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { formatVND } from "../../utils/helper";
import { useCartContext } from "../../context/CartContext";

function CardBook({ product }) {
  const { addToCart } = useCartContext();
  return (
    <Card>
      <CardMedia
        component="img"
        height={250}
        alt="bookImage"
        src={product?.image ?? product?.publicUrl ?? imageUrl}
      />
      <CardContent>
        <Typography variant="button">{product?.name}</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px"
        >
          <Typography variant="body1" color="primary.main">
            {formatVND(product?.price)}
          </Typography>
          <Typography
            variant="overline"
            sx={{
              textDecoration: "line-through",
            }}
          >
            {formatVND(product?.price + 50000)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0",
        }}
      >
        <IconButton component={Link} to={`/products/${product?._id}`}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => addToCart(product)}>
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default CardBook;
