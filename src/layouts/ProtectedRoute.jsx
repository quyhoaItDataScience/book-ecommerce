import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthCtx } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuthCtx();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
