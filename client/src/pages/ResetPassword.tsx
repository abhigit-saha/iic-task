import React, { useState } from "react";
import axios from "./utils/axios-config";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/reset-password", formData);
      console.log(response.data);
      // Show success message to user
    } catch (error) {
      console.error(error.response?.data || error.message);
      // Show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
