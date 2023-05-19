import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { formatPrice } from "../../utils/helper";
import { styled } from "@mui/material/styles";

const productImg =
  "https://product.hstatic.net/200000211451/product/img_1495_e855b16e3887446c97f75aaba8a4e0bb_large.jpg";

const BoxCustomer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}));

function OrderDetails() {
  const [order, setOrder] = useState();
  const [isPaid, setIsPaid] = useState(false);

  const {
    state: { orderId, name },
  } = useLocation();
  useEffect(() => {
    const getOrder = async () => {
      const res = await orderApi.getOrder(orderId);
      setOrder(res);
      setIsPaid(res.isPaid);
    };
    getOrder();
  }, []);
  const handleChange = async (e) => {
    await orderApi.updateOrder(orderId, {
      status: e.target.value,
    });
    setOrder({ ...order, status: e.target.value });
  };
  const handlePaid = async (e) => {
    setIsPaid(e.target.checked);
    await orderApi.updateOrder(orderId, {
      isPaid: e.target.checked,
    });
  };
  const totalPrice = order?.cartItems?.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div>
      <Box padding="0 10px">
        <Box
          sx={{
            backgroundColor: "grey.200",
            padding: "20px 10px",
          }}
        >
          <Typography>Mã đơn hàng: {order?._id}</Typography>
        </Box>
        {/* Head table */}
        <Box display="flex" margin="20px 0">
          <Box flex={1}>
            <Typography>Sản phẩm</Typography>
          </Box>
          <Box flex={1}>
            <Typography>Giá</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {order?.cartItems?.map((item, idx) => (
            <Box height={300} display="flex" key={idx}>
              <Box width="50%" display="flex" gap="10px">
                <img
                  src={item?.publicUrl ?? productImg}
                  style={{
                    maxWidth: "100%",
                    height: "50%",
                  }}
                />
                <Typography>{item?.name}</Typography>
              </Box>
              <Box width="50%">
                <Typography>{formatPrice(item?.price)}VND</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          backgroundColor="grey.300"
          padding="10px"
          borderRadius="10px"
        >
          <Typography variant="h4">Thông tin đơn hàng</Typography>
          <BoxCustomer>
            <Typography>Tên khách hàng:</Typography>
            <Typography>{name}</Typography>
          </BoxCustomer>
          <BoxCustomer>
            <Typography>Phương thức thanh toán:</Typography>
            <Typography>{order?.paymentMethod}</Typography>
          </BoxCustomer>
          <BoxCustomer>
            <Typography>Địa chỉ giao hàng:</Typography>
            <Typography>{order?.address}</Typography>
          </BoxCustomer>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          backgroundColor="grey.300"
          padding="10px"
          margin="20px 0"
          borderRadius="10px"
        >
          <Typography variant="h4">Tóm tắt đơn hàng</Typography>
          <Typography>
            Tổng tiền: {totalPrice && formatPrice("" + totalPrice)}VND
          </Typography>{" "}
          <Typography>Tiền ship: 20,000VND</Typography>
          <Typography>
            Tổng tiền: {totalPrice && formatPrice(totalPrice + 20000 + "")}
          </Typography>
          <Typography>
            {order?.isPaid ? "Chưa thanh toán" : "Đã thanh toán"}
          </Typography>
        </Box>
        <Typography variant="h4">Cập nhật đơn hàng</Typography>
        <Box margin="20px 0">
          <Select
            value={order?.status ?? "Đang xử lý"}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={"Đang xử lý"}>Đang xử lý </MenuItem>
            <MenuItem value={"Đã giao hàng"}>Đã giao hàng</MenuItem>
            <MenuItem value={"Huỷ đơn hàng"}>Huỷ đơn hàng</MenuItem>
          </Select>
          <Box margin="20px 0">
            <Typography>Thanh toán</Typography>
          </Box>
          <Switch
            checked={isPaid}
            onChange={handlePaid}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>
    </div>
  );
}

export default OrderDetails;
