import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";
import useProductFilter from "../../hooks/productsHook";
import categories from "../../mockData/mockCategories";

function Categories({ setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await categoryApi.getCategories();
      setCategories(res);
    };
    getCategories();
  }, []);

  return (
    <div>
      <Typography variant="h6">Danh mục</Typography>
      <Divider variant="fullWidth" />
      <List>
        {categories?.map((cate) => (
          <div key={cate._id}>
            <ListItem>
              <ListItemText
                onClick={() => {
                  setCategory(cate.name);
                  console.log(cate.name);
                }}
                primary={cate.name}
                sx={{
                  "&:hover": {
                    color: "primary.main",
                    cursor: "pointer",
                  },
                }}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default Categories;
