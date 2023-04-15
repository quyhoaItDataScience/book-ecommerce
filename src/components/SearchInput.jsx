import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput() {
  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "none", md: "flex", lg: "flex" },
        backgroundColor: "#e0e0e0",
        borderRadius: "5px",
        "&:hover": {
          background: "#eee",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <InputBase
        placeholder="Search…"
        sx={{
          padding: "5px",
        }}
      />
    </Box>
  );
}

export default SearchInput;
