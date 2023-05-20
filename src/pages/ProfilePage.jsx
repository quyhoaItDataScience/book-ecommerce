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
import React, { useState } from "react";
import userApi from "../api/userApi";
import { useAuthCtx } from "../context/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const avatarImage = "https://mui.com/static/images/avatar/1.jpg";

function ProfilePage() {
  const { user, setUser } = useAuthCtx();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup.string("Nhập tên"),
  });

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await updateUser(user._id, values);
      console.log(res);
      if (res && res.msg) {
        toast.success(res.msg);
      }
      setLoading(false);
    },
  });

  const updateImage = async (e) => {
    const data = new FormData();
    data.append("profileImage", e.target.files[0]);
    setLoading(true);
    const res = await userApi.updateUserImage(user._id, data);
    console.log(res);
    setUser({ ...user, profileImage: res });
    setLoading(false);
    console.log("update image");
  };

  const deleteImage = async () => {
    setLoading(true);
    const res = await userApi.deleteImage(user._id);
    setLoading(false);
    if (res?.msg) toast.success(res.msg);
    else {
      if (res?.response?.data) {
        toast.error(res.response.data.msg);
      } else {
        toast.error(res.message);
      }
    }
    setUser({ ...user, profileImage: null });
  };

  const updateUser = async (userId, payload) => {
    const res = await userApi.updateUser(userId, payload);
    const { profileImage, ...other } = res;
    const oldImage = user.profileImage;
    setUser({ ...other, profileImage: oldImage });
  };

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h4" textAlign="center">
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
            src={user?.profileImage?.imageUrl ?? avatarImage}
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
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="username"
              sx={{
                fontWeight: "bold",
              }}
            >
              Username
            </FormLabel>
            <TextField
              id="username"
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
              value={formik.values.password}
              onChange={formik.handleChange}
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
          <Button disabled={loading} variant="contained" type="submit">
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfilePage;
