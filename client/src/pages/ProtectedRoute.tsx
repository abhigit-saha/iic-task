import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "./utils/axios-config";
import Cookies from "js-cookie";
import { set } from "mongoose";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Attempt to refresh the access token using the refresh token
        await axios.post("/users/verify");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
