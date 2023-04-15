import { Drawer, List, Stack, Toolbar } from "@mui/material";
import React from "react";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import CreateIcon from "@mui/icons-material/Create";
import CategoryIcon from "@mui/icons-material/Category";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PersonIcon from "@mui/icons-material/Person";

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "400px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "400px",
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: "sidebar.bg",
          color: "sidebar.color",
        },
      }}
    >
      <List disablePadding>
        <SidebarItemCollapse
          icon={<MenuBookIcon />}
          text="Books"
          childrenItem={[
            {
              icon: <LocalLibraryIcon />,
              text: "List Books",
              link: "/admin/books",
            },
            {
              icon: <CreateIcon />,
              text: "Create",
              link: "/admin/create-book",
            },
          ]}
        />
        <SidebarItem
          text="Categories"
          icon={<CategoryIcon />}
          link="/admin/categories"
        />
        <SidebarItem text="Users" icon={<PersonIcon />} link="/admin/users" />
        <SidebarItem
          text="Orders"
          icon={<RequestQuoteIcon />}
          link="/admin/orders"
        />
        <SidebarItem text="Chat users" link="/admin/chat" />
      </List>
    </Drawer>
  );
}

export default Sidebar;
