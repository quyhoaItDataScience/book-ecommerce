import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../context/AuthContext";
import { useFormik } from "formik";

export default function Login() {
  const { setUser: setAuth, token, setToken } = useAuthCtx();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const res = await authApi.login({
        username: values.username,
        password: values.password,
      });
      setAuth(res.user);
      localStorage.setItem("token", res.token);
      setToken(res.token);
      navigate("/", { replace: true });
    },
  });

  React.useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          value={formik.values.username}
          onChange={formik.handleChange}
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
        />
        <TextField
          value={formik.values.password}
          onChange={formik.handleChange}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Đăng nhập
        </Button>
        <Box component={Link} to="/signup">
          <Typography>Chưa có tài khoản ? Đăng ký</Typography>
        </Box>
      </Box>
    </Box>
  );
}
