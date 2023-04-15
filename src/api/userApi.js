import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const userApi = {
  updateImage: async (userId, payload) => {
    try {
      const response = await axiosClient.put(`/user/${userId}`, payload);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteImage: async (imageId, userId) => {
    try {
      const response = await axiosClient.delete(`/user/${imageId}`, userId);
      return response;
    } catch (err) {
      console.log(err.response.data);
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
  getUser: async (userId) => {
    try {
      const response = await axiosClient.get(`/user/${userId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default userApi;
