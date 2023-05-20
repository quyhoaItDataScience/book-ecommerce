import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import productApi from "../../api/productApi";
import { toast } from "react-toastify";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];

export default function CardBookAdmin({ book }) {
  const [open, setOpen] = React.useState(false);
  const [updatedBook, setUpdatedBook] = React.useState(book);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const deleteImage = () => {
    console.log("delete img");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const res = await productApi.updateBookById(updatedBook._id, updatedBook);
    if (res && res.msg) {
      toast.success(res.msg);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          image={`${updatedBook?.publicUrl}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {updatedBook?.name || "Head First Java"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {updatedBook?.description?.substring(0, 50)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Detail
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box display="flex" flexDirection="column" paddingY={3} width="50%">
            <TextField
              label="Title"
              id="updatedBook-title"
              name="title"
              sx={{ m: 1, width: "50%" }}
              value={updatedBook?.name}
              onChange={handleChange}
              fullWidth={true}
            />
            <TextField
              label="Author"
              id="author"
              name="authorName"
              onChange={handleChange}
              sx={{ m: 1, width: "50%" }}
              value={updatedBook?.authorName}
              fullWidth={true}
            />
            <TextField
              label="Price"
              id="book-price"
              type="number"
              name="price"
              onChange={handleChange}
              sx={{ m: 1, width: "50%" }}
              value={updatedBook?.price}
              fullWidth={true}
            />
            <TextField
              label="Category"
              id="book-category"
              type="text"
              name="category"
              onChange={handleChange}
              sx={{ m: 1, width: "50%" }}
              value={updatedBook?.category || "Chưa có category"}
              fullWidth={true}
            />
            <TextField
              label="Description"
              id="book-description"
              name="description"
              onChange={handleChange}
              sx={{ m: 1, width: "100%" }}
              value={updatedBook?.description}
              multiline={true}
              minRows={3}
              fullWidth={true}
            />
            <TextField
              label="Public Url"
              id="book-publicUrl"
              name="publicUrl"
              onChange={handleChange}
              sx={{ m: 1 }}
              value={updatedBook?.publicUrl}
            />
          </Box>
          {updatedBook?.images.length > 0 && (
            <Box display="flex" gap="10px">
              {itemData.map((item, idx) => (
                <Box position="relative">
                  <img
                    src={book?.publicUrl ?? itemData[0]?.img}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                      height: "100px",
                    }}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: "-10px",
                      top: "-20px",
                    }}
                    onClick={deleteImage}
                  >
                    <CloseOutlined />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
          <Box margin="20px 0">
            <Button variant="contained" onClick={handleUpdate}>
              Update product
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
