import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // استفاده از useNavigate برای هدایت
import apiClient from "../api/axiosConfig";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone_number: "",
    address: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // جلوگیری از رفرش صفحه
    try {
      const response = await apiClient.post("auth/signup/", formData);
      setSuccess("ثبت‌نام با موفقیت انجام شد!");
      setError("");
      
      // هدایت به صفحه ورود پس از ثبت‌نام موفق
      setTimeout(() => {
        navigate("/login"); // هدایت به صفحه ورود
      }, 1500); // بعد از 1.5 ثانیه هدایت می‌شود
    } catch (err) {
      setError("ثبت‌نام با مشکل مواجه شد. لطفاً دوباره تلاش کنید.");
      setSuccess(null);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      sx={{ direction: 'rtl' }} // تنظیم جهت راست به چپ
    >
      <Box
        width="400px"
        padding="30px"
        bgcolor="white"
        boxShadow={3}
        borderRadius="8px"
      >
        <Typography variant="h4" color="primary" gutterBottom sx={{ textAlign: 'right' }}>
          ثبت‌نام
        </Typography>
        {success && <Alert severity="success" sx={{ textAlign: 'right' }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ textAlign: 'right' }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="نام کاربری"
            name="username"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: '30px', transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
              width: '100%', // گسترش فیلد ورودی
            }}
          />
          <TextField
            label="رمز عبور"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: '30px', transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
              width: '100%', // گسترش فیلد ورودی
            }}
          />
          <TextField
            label="شماره تلفن"
            name="phone_number"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: '30px', transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
              width: '100%', // گسترش فیلد ورودی
            }}
          />
          <TextField
            label="آدرس"
            name="address"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: '30px', transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
              width: '100%', // گسترش فیلد ورودی
            }}
          />
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            ثبت‌نام
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
