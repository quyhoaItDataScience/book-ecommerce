import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { formatPrice } from "../../utils/helper";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";
import { toast } from "react-toastify";

function CreateBook() {
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState(null);
  const [book, setBook] = useState({
    name: "",
    description: "",
    authorName: "",
    category: 10,
    publicUrl:
      "https://images.pexels.com/photos/3166839/pexels-photo-3166839.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: formatPrice("100"),
  });

  useState(() => {
    const getCategories = async () => {
      const res = await categoryApi.getCategories();
      setCategories(res);
      setBook({ ...book, category: res[0]?.name });
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "price") {
      setBook({ ...book, [name]: value });
      return;
    }
    setBook({ ...book, price: formatPrice(value) });
  };
  const handleSubmit = async () => {
    let price = "";
    // convert price string to number
    for (const num of book.price) {
      if (num !== ",") {
        price += num;
      }
    }
    const tempBook = { ...book, price: Number(price) };
    let formData = new FormData();
    formData.append("productImages", files);
    for (const key of Object.keys(tempBook)) {
      console.log(key);
      formData.append(key, tempBook[key]);
    }

    const res = await productApi.createBook(formData);
    // reset form
    setFiles(null);
    setBook({
      name: "",
      description: "",
      authorName: "",
      category: categories[0]?.name,
      price: formatPrice("100"),
    });
    // toast.success("Created successfully");
  };

  const handleFile = async (e) => {
    const newFiles = e.target.files;
    // const newUrls = [];
    // for (const file of newFiles) {
    //   const url = URL.createObjectURL(file);
    //   newUrls.push(url);
    // }
    setFiles(e.target.files);
  };

  return (
    <Box margin="20px 0">
      <Typography variant="h5" align="center">
        Create book
      </Typography>
      <Box
        sx={{
          backgroundColor: "#fff",
          marginY: "20px",
        }}
      >
        <Box
          width="80%"
          marginX="auto"
          paddingY="20px"
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <TextField
            label="Name"
            name="name"
            variant="standard"
            fullWidth
            value={book.name}
            onChange={handleChange}
          />
          <TextField
            label="Author Name"
            name="authorName"
            variant="standard"
            fullWidth
            value={book.authorName}
            onChange={handleChange}
          />
          <TextField
            name="price"
            label="Price"
            variant="standard"
            fullWidth
            value={book.price}
            onChange={handleChange}
          />
          <TextField
            value={book.description}
            onChange={handleChange}
            label="Description"
            name="description"
            variant="standard"
            fullWidth
            multiline
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={book.category}
            onChange={handleChange}
            label="Category"
            name="category"
            fullWidth
          >
            {categories?.map((category) => (
              <MenuItem value={category.name}>{category.name}</MenuItem>
            ))}
          </Select>
          <TextField
            name="publicUrl"
            label="Public Url"
            variant="standard"
            fullWidth
            value={book.publicUrl}
            onChange={handleChange}
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleFile}
            />
          </Button>
          {/* {files &&
            files?.map((url, index) => (
              <img
                key={index}
                style={{
                  maxWidth: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
                src={url}
              />
            ))} */}

          <Button variant="outlined" onClick={handleSubmit}>
            Create book
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateBook;
