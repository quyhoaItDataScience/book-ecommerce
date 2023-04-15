import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const productImg = [
  "https://product.hstatic.net/200000211451/product/ef47b163-b8f1-4b89-b17e-9536568e8522_75a2b198db57405ba752b4508349d3b8_master.jpg",
  "https://product.hstatic.net/200000211451/product/8c4afe07-161b-4bf1-aacf-1a57b6bed986_690ba44fd025449abee5a6a40df659be_small.jpg",
  "https://product.hstatic.net/200000211451/product/e88c7b6a-60ee-4ea4-a8a8-1f0dbc9d918f_be7c2ce66e934239abbca49b88ad7dcd_small.jpg",
  "https://product.hstatic.net/200000211451/product/6280242d-6803-451a-b8b9-5b3c861a039c_296273a144c9409892bf90a8231209eb_master.jpg",
  "https://product.hstatic.net/200000211451/product/8c4afe07-161b-4bf1-aacf-1a57b6bed986_690ba44fd025449abee5a6a40df659be_small.jpg",
  "https://product.hstatic.net/200000211451/product/c90becb0-e0c1-4199-8024-9b3ede6449f2_9f7662d1d4404ac58524e410fc114a1f_master.jpg",
];
function ProductDetail() {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <Container>
      <Grid container>
        <Grid item sm={12} md={4} my={5}>
          <Box height="300px" width="300px">
            <img
              src={productImg[activeThumb]}
              alt="product image"
              style={{
                maxWidth: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box
            width="300px"
            height="120px"
            sx={{
              "& .swiper-button-prev": {
                left: "0",
              },
            }}
          >
            <Swiper
              spaceBetween={10}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {productImg.map((item, idx) => (
                <SwiperSlide onClick={() => setActiveThumb(idx)}>
                  <img
                    src={item}
                    alt="product image"
                    style={{
                      maxWidth: "100%",
                      height: "100%",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>
        <Grid item sm={12} md={8} my={5}>
          <Typography variant="h4">Clean code</Typography>
          <Box display="flex" gap="20px" mt={3} alignItems="center">
            <Typography variant="h6" color="primary.main">
              200,000VND
            </Typography>
            <Typography
              variant="caption"
              sx={{
                textDecoration: "line-through",
              }}
            >
              300,000VND
            </Typography>
          </Box>
          <Box mt={3}>
            <Button variant="contained" onClick={() => addToCart()}>
              Thêm vào giỏ
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography>Mô tả sản phẩm</Typography>
        <Divider />
        <Box my={3}>
          <Typography>Sản phẩm rất chất lượng</Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductDetail;
