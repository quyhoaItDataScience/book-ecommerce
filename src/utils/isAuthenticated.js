import jwt_decode from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp > currentTime) {
      return true;
    }
  }
  return false;
};

export default isAuthenticated;
