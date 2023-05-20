import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import categoryApi from "../../api/categoryApi";

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
        <ListItem>
          <ListItemText
            onClick={() => {
              setCategory({
                name: "Tất cả",
                slug: "Tat-ca",
              });
            }}
            primary="Tất cả"
            sx={{
              "&:hover": {
                color: "primary.main",
                cursor: "pointer",
              },
            }}
          />
        </ListItem>
        <Divider />
        {categories?.map((cate) => (
          <div key={cate?._id}>
            <ListItem>
              <ListItemText
                onClick={() => {
                  setCategory({
                    name: cate?.name,
                    slug: cate?.slug,
                  });
                  console.log(cate?.slug);
                }}
                primary={cate?.name}
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
