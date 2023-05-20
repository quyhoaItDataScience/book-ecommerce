import React, { useEffect, useState } from "react";
import CardBookAdmin from "../../components/common/CardBookAdmin";
import productApi from "../../api/productApi";
import { Box, Typography } from "@mui/material";

function ListBooks() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await productApi.getBooksForAdmin();
      console.log(res);
      setBooks(res);
    };
    getBooks();
  }, []);
  return (
    <>
      <Typography variant="h4">List of books</Typography>
      <Box display="flex" flexWrap="wrap" gap="10px" margin={"20px 0"}>
        {books?.map((book, idx) => (
          <CardBookAdmin book={book} key={idx} />
        ))}
      </Box>
    </>
  );
}

export default ListBooks;
