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
  createCategory: async (name) => {
    try {
      const response = await axiosClient.post("/category", {
        name,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteCategoryById: async (categoryId) => {
    try {
      const response = await axiosClient.delete(`/category/${categoryId}`);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  updateCategoryById: async (categoryId, updatedName) => {
    try {
      const response = await axiosClient.put(`/category/${categoryId}`, {
        name: updatedName,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};

export default categoryApi;
