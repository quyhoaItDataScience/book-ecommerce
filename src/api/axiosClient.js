import axios from "axios";
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      alert("Err! Netword err!");
    }
    throw err;
  }
);
export default axiosClient;
