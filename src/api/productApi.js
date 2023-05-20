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
      const response = await axiosClient.get("/products/recent");
      console.log("getBooks", response);
      return response;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  },
  getBooksForAdmin: async () => {
    try {
      const response = await axiosClient.get("/products/admin");
      console.log("getBooksForAdmin", response);
      return response;
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  },
  getBookById: async (bookId) => {
    try {
      const response = await axiosClient.get(`/products/${bookId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  updateBookById: async (bookId, book) => {
    try {
      const response = await axiosClient.put(`/products/${bookId}`, {
        ...book,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default productApi;
