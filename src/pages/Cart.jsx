import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CartProduct from "../components/common/CartProduct";
import { useCartContext } from "../context/CartContext";
import { formatVND } from "../utils/helper";

function Cart() {
  const { cartItems, cartTotal, clearCart } = useCartContext();
  return (
    <Grid container>
      <Grid item xs={12} md={7}>
        {cartItems?.map((cartItem, idx) => (
          <CartProduct key={idx} cartItem={cartItem} />
        ))}
        {cartItems.length > 0 ? (
          <Box textAlign={"right"} my={3}>
            <Button onClick={clearCart}>Xoá giỏ hàng</Button>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h4">Giỏ hàng trống</Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={5} my={3}>
        <Box
          width="80%"
          ml={3}
          display="flex"
          flexDirection="column"
          rowGap={2}
        >
          <Typography variant="h4">Hoá đơn</Typography>
          <Divider />
          <Typography>Số lượng sách: {cartItems.length}</Typography>
          <Typography>Tạm tính: {formatVND(cartTotal)}</Typography>
          <Typography>Tiền ship: 50,000VND</Typography>
          <Divider />
          <Typography>Tổng cộng: {formatVND(cartTotal + 50000)}</Typography>
          <Button variant="contained" component={Link} to="/checkout">
            Tiến hành thanh toán
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Cart;
