import React, { useEffect, useState } from "react";
import BestProducts from "../components/common/BestProducts";
import productApi from "../api/productApi";

function Home() {
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
