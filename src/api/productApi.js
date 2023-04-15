import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const productApi = {
  createBook: async (products) => {
    try {
      const response = await axiosClient.post("/products", products);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  },
  getBooks: async () => {
    try {
      const response = await axiosClient.get("/products/admin");
      console.log("getBooks", response);
      return response;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  },
};

export default productApi;
