import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import apiClient from "../api/axiosConfig";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("auth/login/", credentials);
      login(response.data.token); // Save token
      console.log(response.data.token);

      // Redirect to home page after successful login
      navigate("/"); // Replace "/home" with your actual home page route
    } catch (err) {
      setError("نام کاربری یا رمز عبور اشتباه است. لطفاً دوباره تلاش کنید.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Box
      dir="rtl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      <Box
        width="400px"
        padding="20px"
        sx={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontFamily: "IRANSans" }}>
          ورود
        </Typography>
        {error && (
          <Alert severity="error" sx={{ textAlign: "right", fontFamily: "IRANSans" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="نام کاربری"
            name="username"
            fullWidth
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right", fontFamily: "IRANSans" },
            }}
          />
          <TextField
            label="رمز عبور"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right", fontFamily: "IRANSans" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "20px",
              fontFamily: "IRANSans",
            }}
          >
            ورود
          </Button>
        </form>

        {/* Clickable Text Link to Go to Sign Up Page */}
        <Box sx={{ marginTop: "15px", fontFamily: "IRANSans" }}>
          <Typography variant="body2">
            ثبت نام نکردید؟{" "}
            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
              صفحه ثبت نام
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
