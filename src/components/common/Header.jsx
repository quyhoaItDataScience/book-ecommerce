import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Drawer,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchInput from "../SearchInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import { useAuthCtx } from "../../context/AuthContext";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cartItems } = useCartContext();
  const { token, logout } = useAuthCtx();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerEl, setDrawerEl] = useState(false);
  //   @params open: boolean
  const toggleDrawer = (open) => {
    setDrawerEl(open);
  };
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{
              display: { xs: "block", md: "none" },
            }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            Trang chủ
          </Button>
          {/* <SearchInput /> */}
          <Box>
            <Button>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon
                  color="warning"
                  onClick={() => handleNavigate("/cart")}
                />
              </Badge>
            </Button>
            <IconButton onClick={handleClick}>
              <PersonIcon color="error" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Tài khoản
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/cart">
                Giỏ hàng
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/order-list">
                Đơn hàng
              </MenuItem>
            </Menu>
            {token && (
              <Button
                color="inherit"
                onClick={() => {
                  logout();
                }}
              >
                Đăng xuất
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerEl} onClose={() => toggleDrawer(false)}>
        <DrawerContent />
      </Drawer>
    </Box>
  );
}

function DrawerContent() {
  const categories = ["Lập trình", "Đời sống", "Sức khoẻ"];
  return (
    <Stack
      sx={{
        padding: "20px",
        width: "30vw",
        gap: 3,
      }}
    >
      {categories.map((cat) => (
        <Box sx={{ width: "100%" }}>
          <Typography key={cat}>{cat}</Typography>
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}

export default Header;
