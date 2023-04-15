import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function AdminLayout() {
  return (
    <Box display="flex">
      <Box
        component="nav"
        sx={{
          width: "400px",
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100% - 300px",
          minHeight: "100vh",
          backgroundColor: "grey.100",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
