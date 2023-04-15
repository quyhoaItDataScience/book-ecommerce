import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCartContext } from "../../context/CartContext";
import { formatVND } from "../../utils/helper";

const imgLink =
  "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=600";

function CartProduct({ cartItem }) {
  const { removeFromCart } = useCartContext();
  return (
    <Paper>
      <Box display="flex" my={3}>
        <Box flex={1}>
          <img
            src={cartItem?.publicUrl ?? imgLink}
            alt="product img"
            style={{
              maxWidth: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" flex={4} padding={2}>
          <Box>
            <Typography variant="h5">{cartItem?.name}</Typography>
            <Typography fontWeight="bold" color="primary.main">
              {formatVND(cartItem.price)}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => removeFromCart(cartItem)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CartProduct;
