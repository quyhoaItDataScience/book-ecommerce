import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import orderApi from "../../api/orderApi";
import { formatPrice } from "../../utils/helper";

const productImg =
  "https://product.hstatic.net/200000211451/product/img_1495_e855b16e3887446c97f75aaba8a4e0bb_large.jpg";

function OrderDetails() {
  const [order, setOrder] = useState();
  const {
    state: { orderId, name },
  } = useLocation();
  useEffect(() => {
    const getOrder = async () => {
      const res = await orderApi.getOrder(orderId);
      console.log(res);
      setOrder(res);
    };
    getOrder();
  }, []);
  const handleChange = async (e) => {
    await orderApi.updateOrder(orderId, {
      status: e.target.value,
    });
    setOrder({ ...order, status: e.target.value });
  };
  const totalPrice = order?.cartItems?.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div>
      <Box>
        OrderDetails
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "grey.500",
          }}
        >
          <Typography>28/01/2003 9:00AM</Typography>
          <Select
            value={order?.status ?? "Đang xử lý"}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={"Đang xử lý"}>Đang xử lý </MenuItem>
            <MenuItem value={"Đã giao hàng"}>Đã giao hàng</MenuItem>
            <MenuItem value={"Huỷ đơn hàng"}>Huỷ đơn hàng</MenuItem>
          </Select>
        </Box>
        <Box>
          <Box>Tên khách hàng: {name}</Box>
          <Box>Phương thức thanh toán: {order?.paymentMethod}</Box>
          <Box>Địa chỉ giao hàng: {order?.address}</Box>
        </Box>
        <Box display="flex">
          <Box
            sx={{
              maxHeight: "500px",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "60%",
            }}
          >
            {order?.cartItems?.map((item, idx) => (
              <Box height={300} width={400} display="flex" key={idx}>
                <Box>
                  <img
                    src={item?.publicUrl ?? productImg}
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
                <Box>
                  <Typography>{item?.name}</Typography>
                  <Typography>Giá: {item?.price}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            <Typography>
              Tổng tiền: {totalPrice && formatPrice("" + totalPrice)}VND
            </Typography>{" "}
            <Typography>Tiền ship: 20,000VND</Typography>
            <Typography>
              Tổng tiền: {totalPrice && formatPrice(totalPrice + 20000 + "")}
            </Typography>
            <Typography>Chưa thanh toán</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default OrderDetails;
