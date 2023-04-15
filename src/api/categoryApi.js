import axiosClient from "./axiosClient";

const categoryApi = {
  getCategories: async () => {
    try {
      const response = await axiosClient.get("/category");
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default categoryApi;
