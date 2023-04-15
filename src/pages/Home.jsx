import React, { useEffect, useState } from "react";
import BestProducts from "../components/common/BestProducts";
import { useAuthCtx } from "../context/AuthContext";
import productApi from "../api/productApi";

function Home() {
  const { user } = useAuthCtx();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await productApi.getBooks();
      setProducts(res);
    };
    getBooks();
  }, []);

  return (
    <div>
      <BestProducts products={products} />
    </div>
  );
}

export default Home;
