import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function Header2() {
  const categories = ["Lập trình", "Đời sống", "Kỹ năng sống"];
  return (
    <Box
      sx={{
        display: {
          sm: "none",
          md: "none",
          lg: "block",
        },
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            background: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              margin: "0 auto",
              gap: "20px",
              padding: "20px",
            }}
          >
            {categories.map((cat, idx) => (
              <Typography variant="body1" color="primary" key={cat}>
                {cat}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header2;
