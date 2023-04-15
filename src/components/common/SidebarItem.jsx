import { ListItemButton, ListItemIcon } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ icon, text, link }) {
  return (
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "sidebar.hoverBg",
        },
      }}
      component={Link}
      to={link ?? "/admin"}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      {text || "Users"}
    </ListItemButton>
  );
}

export default SidebarItem;
