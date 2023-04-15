import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <Box
      minHeight="75vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" flexDirection={"column"} gap="15px">
        <Typography variant="h4">Cảm ơn bạn đã đặt hàng</Typography>
        <Button fullWidth size="large" onClick={handleClick}>
          <Typography variant="h5">Tiếp tục mua hàng</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default CheckoutSuccessPage;
