import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import mockProducts from "../mockData/mockProducts";
import { handleRoute } from "../utils/helper";
const pageSize = 4;

function useProductFilter() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchQuery = handleRoute(page, category);
        console.log(searchQuery);
        const res = await axiosClient.get(`/products/${searchQuery}`);
        setProducts(res.data);
        setTotalPage(res.totalPages);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [page, category]);

  return {
    products,
    setProducts,
    page,
    setPage,
    category,
    setCategory,
    totalPage,
    setTotalPage,
  };
}

export default useProductFilter;
