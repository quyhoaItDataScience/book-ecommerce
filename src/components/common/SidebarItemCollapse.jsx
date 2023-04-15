import {
  CloseRounded,
  ExpandLessOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SidebarItem from "./SidebarItem";

function SidebarItemCollapse({ icon, text, childrenItem }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&:hover": {
            backgroundColor: "sidebar.hoverBg",
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={<Typography>{text}</Typography>} />
        {open ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
      </ListItemButton>
      <Collapse in={open}>
        <List>
          {childrenItem.map((item, idx) => (
            <SidebarItem
              key={idx}
              text={item.text}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
