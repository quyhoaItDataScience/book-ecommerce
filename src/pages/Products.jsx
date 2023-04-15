import {
  Box,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Categories from "../components/common/Categories";
import CardBook from "../components/common/CardBook";
import useProductFilter from "../hooks/productsHook";

function Products() {
  const { products, setProducts, totalPage, page, setPage, setCategory } =
    useProductFilter();
  const [sortBy, setSortBy] = useState("");

  const [select, setSelect] = useState("price-ascending");
  const handleSelect = (e) => {
    setSelect(e.target.value);
    setSortBy(e.target.value);
  };
  const handlePagination = (e, page) => {
    setPage(page);
  };

  const sortStrategies = {
    "name-ascending": (a, b) => a.name.localeCompare(b.name),
    "name-descending": (a, b) => b.name.localeCompare(a.name),
    "price-ascending": (a, b) => a.price - b.price,
    "price-descending": (a, b) => b.price - a.price,
  };

  useEffect(() => {
    if (products && sortBy) {
      const filtered = [...products];
      console.log(sortBy);
      filtered.sort(sortStrategies[sortBy]);
      setProducts(filtered);
    }
  }, [sortBy]);

  return (
    <Container maxWidth="lg">
      <Box display="flex" gap="20px" my="20px">
        <Box flex={1} position="sticky" height="100%" top={0}>
          <Categories setCategory={setCategory} />
        </Box>
        <Box flex={4}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap="10px"
          >
            <Typography variant="h6">Tất cả</Typography>
            <Box display="flex" alignItems="center" gap="10px">
              <Typography>Sắp xếp</Typography>
              <FormControl size="small">
                <Select value={select} onChange={handleSelect}>
                  <MenuItem value={"price-descending"}>
                    Giá cao đến thấp
                  </MenuItem>
                  <MenuItem value={"price-ascending"}>
                    Giá thấp đến cao
                  </MenuItem>
                  <MenuItem value={"name-ascending"}>Theo thứ tự a-z</MenuItem>
                  <MenuItem value={"name-descending"}>Theo thứ tự z-a</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container gap="10px">
            {products?.map((product) => (
              <Grid item sm={5} md={2.9} key={product._id}>
                <CardBook product={product} />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPage}
              page={page}
              color="primary"
              onChange={handlePagination}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Products;
