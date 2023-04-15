import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { InboxOutlined, FacebookOutlined } from "@mui/icons-material";

function Footer() {
  return (
    <Box backgroundColor="#212121" padding={4}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6}>
            {/* Liên hệ */}
            <Box>
              <Typography variant="h6" color="white">
                Liên hệ
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton
                    disableRipple
                    sx={{
                      color: "grey",
                      padding: 0,
                      "&:hover": {
                        color: "#f9f7f7",
                        ".MuiListItemIcon-root": {
                          color: "#f9f7f7",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "grey",
                        minWidth: "35px",
                      }}
                    >
                      <InboxOutlined />
                    </ListItemIcon>
                    <ListItemText primary="quyhoaphantruong@gmail.com" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  component="a"
                  href="https://www.facebook.com/profile.php?id=100019002255780"
                  target="_blank"
                  disablePadding
                >
                  <ListItemButton
                    disableRipple
                    sx={{
                      color: "grey",
                      padding: 0,
                      "&:hover": {
                        color: "#f9f7f7",
                        ".MuiListItemIcon-root": {
                          color: "#f9f7f7",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "grey",
                        minWidth: "35px",
                      }}
                    >
                      <FacebookOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Hoà Trương" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Grid>
          {/* Về tôi */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="white">
              Về tôi
            </Typography>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                color: "grey",
              }}
            >
              <ListItem
                disablePadding
                sx={{
                  "&:hover": {
                    color: "#f9f7f7",
                  },
                }}
              >
                <Typography color="inherit">Blog</Typography>
              </ListItem>
              <ListItem
                disablePadding
                sx={{
                  "&:hover": {
                    color: "#f9f7f7",
                  },
                }}
              >
                <Typography color="inherit">
                  Tôi tạo ra web này chỉ để pass sách
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
