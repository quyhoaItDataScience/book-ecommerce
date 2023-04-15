import { toast } from "react-toastify";
import axiosClient from "./axiosClient";

const orderApi = {
  getOrders: async (orderId) => {
    try {
      const response = await axiosClient.get(`/orders/admin`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getOrder: async (orderId) => {
    try {
      const response = await axiosClient.get(`/orders/admin/${orderId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  getOrdersByUser: async (userId) => {
    try {
      const response = await axiosClient.get(`/orders/${userId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  createOrder: async (userId, payload) => {
    try {
      const response = await axiosClient.post(`orders/${userId}`, payload);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.msg);
    }
  },
  updateOrder: async (orderId, payload) => {
    try {
      const response = await axiosClient.put(
        `orders/admin/${orderId}`,
        payload
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteOrder: async (orderId) => {
    try {
      const response = await axiosClient.delete(`orders/admin/${orderId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default orderApi;
