import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "./utils/axios-config";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/users/logout");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
