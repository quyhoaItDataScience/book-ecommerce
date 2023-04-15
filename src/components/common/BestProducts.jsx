import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
// import CardBook from "./CardBook";
// import products from "../../mockData/mockProducts";

const CardBook = lazy(() => import("./CardBook"));

function BestProducts({ products }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h4" mt={4} textAlign="center">
        Sách nổi bật
      </Typography>
      <Grid container mt={5} gap="20px" justifyContent="center">
        {products?.map((product) => (
          <Grid item sm={6} md={2.5} key={product._id}>
            <Suspense fallback={<div>Loading...</div>}>
              <CardBook product={product} />
            </Suspense>{" "}
          </Grid>
        ))}
      </Grid>
      <Box my={5}>
        <Button component={Link} to="/products">
          Xem thêm
        </Button>
      </Box>
    </Container>
  );
}

export default BestProducts;
