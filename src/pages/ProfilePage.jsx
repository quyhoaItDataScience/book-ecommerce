import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { useAuthCtx } from "../context/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";

const avatarImage = "https://mui.com/static/images/avatar/1.jpg";

function ProfilePage() {
  const { token } = useAuthCtx();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { id: userId } = jwtDecode(token);
        const res = await userApi.getUser(userId);
        setUser(res);
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const validationSchema = yup.object({
    name: yup.string("Nhập tên"),
    username: yup.string().min(6, "Ít nhất 6 ký tự").required("Email bắt buộc"),
    password: yup
      .string("Enter your password")
      .min(8, "Mật khẩu từ 6 ký ")
      .required("Mật khẩu bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      username: user?.username,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik.values);

  const updateImage = async (e) => {
    const data = new FormData();
    data.append("profileImage", e.target.files[0]);
    setLoading(true);
    const res = await userApi.updateImage(user._id, data);
    setUser({ ...user, profileImage: res.profileImage });
    setLoading(false);
    console.log("update image");
  };

  const deleteImage = async () => {
    const res = await userApi.deleteImage(user?.profileImage._id, {
      userId: user._id,
    });
    console.log(res);
  };

  const handleUpdateUser = async () => {
    const res = await userApi.updateUser(user._id, user);
    const { profileImage, ...other } = res;
    console.log(other);
    const oldImage = user.profileImage;
    setUser({ ...other, profileImage: oldImage });
  };

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h5" textAlign="center">
          Thông tin cá nhân
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="20px"
          my={3}
        >
          <Avatar
            alt="Profile Image"
            src={user?.profileImage.imageUrl ?? avatarImage}
            sx={{ width: 120, height: 120 }}
          />
          <Box display="flex" flexDirection="column" gap="10px">
            <Button variant="contained" component="label">
              Tải ảnh
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={updateImage}
              />
            </Button>
            <Button variant="contained" onClick={deleteImage}>
              Xoá ảnh
            </Button>
          </Box>
        </Box>

        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap="20px"
          onSubmit={formik.handleSubmit}
        >
          <FormControl>
            <FormLabel
              htmlFor="fullname"
              sx={{
                fontWeight: "bold",
              }}
            >
              Họ tên
            </FormLabel>
            <TextField
              id="fullname"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="email"
              sx={{
                fontWeight: "bold",
              }}
            >
              Username
            </FormLabel>
            <TextField
              id="email"
              value={user?.username}
              handleChange={formik.handleChange}
              InputProps={{
                readOnly: true,
              }}
              sx={{
                backgroundColor: "grey.main",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="password"
              sx={{
                fontWeight: "bold",
              }}
            >
              Mật khẩu (thay đổi nếu cần)
            </FormLabel>
            <TextField
              type="password"
              id="password"
              defaultValue={formik.values.password}
            />
          </FormControl>

          <FormControl>
            <FormLabel
              htmlFor="orderNumber"
              sx={{
                fontWeight: "bold",
              }}
            >
              Số đơn hàng đã đặt
            </FormLabel>
            <TextField
              id="orderNumber"
              defaultValue="0"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                backgroundColor: "grey.main",
              }}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfilePage;
