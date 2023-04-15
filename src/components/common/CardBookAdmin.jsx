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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const deleteImage = () => {
    console.log("delete img");
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, objectFit: "contain" }}
          image={`${book?.publicUrl}`}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book?.name || "Head First Java"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book?.description?.substring(0, 50)}
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
              label="book-title"
              id="book-title"
              sx={{ m: 1, width: "50%" }}
              value={book?.name}
              fullWidth={true}
            />
            <TextField
              label="Author"
              id="author"
              sx={{ m: 1, width: "50%" }}
              value={book?.authorName}
              fullWidth={true}
            />
            <TextField
              label="book-price"
              id="book-price"
              type="number"
              sx={{ m: 1, width: "50%" }}
              value={book?.price}
              fullWidth={true}
            />
            <TextField
              label="book-description"
              id="book-description"
              sx={{ m: 1, width: "100%" }}
              value={book?.description}
              multiline={true}
              minRows={3}
              fullWidth={true}
            />
          </Box>
          <Box display="flex" gap="10px">
            {itemData.map((item, idx) => (
              <Box position="relative">
                <img
                  src={itemData[0].img}
                  style={{
                    maxWidth: "100%",
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
          <Button variant="contained">Update product</Button>
        </Paper>
      </Modal>
    </>
  );
}
