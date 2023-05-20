import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthCtx } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useAuthCtx();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Vui lòng nhập username")
        .min(6, "Tên đăng nhập phải có ít nhất 6 kí tự"),
      password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
    }),
    onSubmit: async (values) => {
      const res = await authApi.signup({
        username: values.username,
        password: values.password,
      });
      localStorage.setItem("token", JSON.stringify(res.token));
      setUser(res.user);
      navigate("/");
    },
  });

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
        Đăng ký
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
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          Đăng ký
        </Button>
        <Box component={Link} to="/login">
          <Typography>Đã có tài khoản ? Đăng nhập</Typography>
        </Box>
      </Box>
    </Box>
  );
}
