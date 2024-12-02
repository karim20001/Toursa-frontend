import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  TextField,
  Button,
  Alert,
  Avatar,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import apiClient from "../api/axiosConfig";

const Profile = () => {
  const { logout, authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [previewImage, setPreviewImage] = useState(""); // For image preview
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch user profile on mount
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("auth/profile/", {
          headers: { Authorization: `Token ${authToken}` },
        });
        setProfile(response.data);
        console.log(response.data.profile_photo)
        setPreviewImage(response.data.profile_photo || ""); // Set the current profile photo
      } catch (error) {
        setMessage("دریافت اطلاعات پروفایل با مشکل مواجه شد.");
      }
    };

    fetchProfile();
  }, [authToken]);

  const handleUpdate = async () => {
    try {
      // Update text fields
      await apiClient.put("auth/profile/", profile, {
        headers: { Authorization: `Token ${authToken}` },
      });

      // Update profile photo if a new image is selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("profile_photo", selectedImage); // Add the image file
        await apiClient.put("profile/", formData, {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setMessage("پروفایل با موفقیت به‌روز شد!");
    } catch (error) {
      setMessage("به‌روزرسانی پروفایل با مشکل مواجه شد.");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-image-input").click();
  };

  const handleLogout = () => {
    logout();  // This is the logout function from AuthContext
    navigate("/");  // Redirect to the home page after logout
  };

  if (!profile) return <Typography sx={{ textAlign: "center" }}>در حال بارگذاری...</Typography>;

  return (
    <Box dir="rtl">
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            مشخصات فردی
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleLogout}> {/* Use handleLogout */}
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box padding="20px" sx={{ textAlign: "center" }}>
          <Avatar
            alt="Profile Photo"
            src={previewImage || ""}
            sx={{ width: 120, height: 120, margin: "0 auto", cursor: "pointer" }}
            onClick={triggerFileInput} // Trigger file input on click
          />
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          <Typography variant="h4" sx={{ mt: 2 }}>
            {profile.first_name} {profile.last_name}
          </Typography>
          {message && <Alert severity="info" sx={{ mt: 2 }}>{message}</Alert>}
        </Box>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            label="نام کاربری"
            name="username"
            value={profile.username}
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
            }}
          />
          <TextField
            label="شماره تلفن"
            name="phone_number"
            value={profile.phone_number}
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
            }}
          />
          <TextField
            label="آدرس"
            name="address"
            value={profile.address}
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
            }}
          />
          <TextField
            label="نام"
            name="first_name"
            value={profile.first_name}
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
            }}
          />
          <TextField
            label="نام خانوادگی"
            name="last_name"
            value={profile.last_name}
            margin="normal"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{
              sx: { right: 30, transformOrigin: "top right", textAlign: "right" },
            }}
            sx={{
              "& .MuiInputBase-input": { textAlign: "right" },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 3, width: "100%" }}
          >
            ذخیره تغییرات
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
