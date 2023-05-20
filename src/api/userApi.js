import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const tokenFromLs = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const userApi = {
  updateImage: async (userId, payload) => {
    try {
      const response = await axiosClient.put(`/user/${userId}`, payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteImage: async (userId) => {
    try {
      const response = await axiosClient.delete(`/user/image/${userId}`);
      return response;
    } catch (err) {
      return err;
    }
  },
  updateUser: async (userId, payload) => {
    try {
      const response = await axiosClient.put(`/user/${userId}`, payload);
      toast.success("Cập nhật thành công");
      return response;
    } catch (err) {
      toast.error(err.message);
      console.log(err.response.data);
    }
  },
  updateUserImage: async (userId, payload) => {
    try {
      const response = await axiosClient.put(`/user/image/${userId}`, payload);
      return response;
    } catch (err) {
      toast.error(err.message);
      console.log(err.response.data);
    }
  },
  getUser: async (userId) => {
    try {
      const response = await axiosClient.get(`/user/${userId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getUsersForAdmin: async () => {
    try {
      const response = await axiosClient.get(`/user/admin`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  verifyUser: async () => {
    try {
      const response = await axiosClient.get(`/user/verify-user`, {
        headers: {
          Authorization: `Bearer ${tokenFromLs}`,
          "content-type": "application/json",
        },
      });
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = axiosClient.delete(`/user/${userId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default userApi;
