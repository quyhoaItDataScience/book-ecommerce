import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const authApi = {
  signup: async (payload) => {
    try {
      const response = await axiosClient.post("auth/signup", payload);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  },
  login: async (payload) => {
    try {
      const response = await axiosClient.post("auth/login", payload);
      return response;
    } catch (err) {
      toast.error(err.response.data.msg ? err.response.data.msg : err.message);
      console.log(err);
    }
  },
};

export default authApi;
