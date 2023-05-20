import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useCartContext } from "../context/CartContext";
import { formatVND } from "../utils/helper";
import * as yup from "yup";
import { useAuthCtx } from "../context/AuthContext";
import orderApi from "../api/orderApi";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState(1);
  const { cartItems, cartTotal, setCartItems } = useCartContext();
  const { user } = useAuthCtx();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      phone: "",
      paymentMethod: 1,
    },
    validationSchema: yup.object({
      fullname: yup.string().required("Vui lòng nhập họ tên"),
      address: yup.string().required("Vui lòng nhập địa chỉ"),
      phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
    }),
    onSubmit: async (values) => {
      values["paymentMethod"] = paymentMethod;
      values["cartItems"] = cartItems.map((item) => item._id);
      values["cartTotal"] = cartTotal;
      await orderApi.createOrder(user._id, values);
      setCartItems([]);
      navigate("/checkout/success");
    },
  });

  return (
    <Grid container my={4} component={"form"}>
      <Grid item xs={12} md={7}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "25px",
          }}
          elevation={3}
        >
          <Typography variant="h5">Thông tin giao hàng</Typography>
          <FormControl>
            <FormLabel htmlFor="fullname">Họ và tên</FormLabel>
            <TextField
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              id="fullname"
              label="Họ và tên"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Địa chỉ</FormLabel>
            <TextField
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              id="address"
              label="Địa chỉ"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
            <TextField
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              id="phone"
              label="Số điện thoại"
              variant="outlined"
              required
            />
          </FormControl>
        </Paper>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "25px",
            marginTop: "20px",
          }}
          elevation={3}
        >
          <Typography variant="h5">Phương thức thanh toán</Typography>
          <Select
            name="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value={1}>Momo</MenuItem>
            <MenuItem value={2}>Chuyển khoản ngân hàng</MenuItem>
          </Select>
          {paymentMethod === 1 ? (
            <Box
              color="grey.800"
              backgroundColor="grey.background"
              padding="20px"
              textAlign="center"
            >
              <Typography>Sđt: 0908627291</Typography>
              <Typography> Tên: Phan Truong Quy Hoa</Typography>
            </Box>
          ) : (
            <Box
              color="grey.800"
              backgroundColor="grey.background"
              padding="20px"
              textAlign="center"
            >
              <Typography>Stk: 090990990 (Vietcombank)</Typography>
              <Typography>Tên: Phan Truong Quy Hoa</Typography>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} md={5} my={3}>
        <Box
          width="80%"
          ml={3}
          display="flex"
          flexDirection="column"
          rowGap={2}
        >
          <Typography>Hoá đơn</Typography>
          <Divider />
          <Typography>Tạm tính: {formatVND(cartTotal)}</Typography>
          <Typography>Tiền ship: 50,000VND</Typography>
          <Divider />
          <Typography>Tổng cộng: {formatVND(cartTotal + 50000)}</Typography>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Thanh toán
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;
