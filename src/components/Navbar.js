import React, { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Menu, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "../api/axiosConfig";

const Navbar = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // State to store user details
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const isMenuOpen = Boolean(anchorEl);

  // Fetch user details if `authToken` is available
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authToken) {
        try {
          const response = await axios.get("/auth/profile", {
            headers: {
              Authorization: `Bearer ${authToken}`, // Send token in Authorization header
            },
          });
          setUser(response.data); // Set user details
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [authToken]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff", // White background
        color: "#333333", // Dark text color
        boxShadow: "none",
        borderBottom: "2px solid #F5B041", // Light orange border
      }}
      dir="rtl"
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Site Name and Ticket Dropdown */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "IRANSans",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#FF9800", // Light orange logo color
              fontSize: "18px",
            }}
            onClick={() => navigate("/")}
          >
            تورسا
          </Typography>

          {/* Ticket Dropdown */}
          <Button
            sx={{
              fontFamily: "IRANSans",
              color: "#333333",
              fontSize: "16px",
              textTransform: "none",
            }}
            onClick={handleMenuOpen}
            endIcon={<ArrowDropDown />} // Use arrow icon for dropdown
          >
            بلیط
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{
              "& .MuiMenu-paper": {
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0e0e0",
                padding: "5px",
              },
            }}
          >
            <MenuItem
                onClick={() => {
                    navigate("/search?transportation_type=اتوبوس"); // Add the transportation type as a query parameter
                    handleMenuClose();
                }}
                sx={{
                    fontFamily: "IRANSans",
                    fontSize: "14px",
                    borderBottom: "1px solid #e0e0e0",
                }}
                >
                اتوبوس
                </MenuItem>
                <MenuItem
                onClick={() => {
                    navigate("/search?transportation_type=قطار"); // Add the transportation type as a query parameter
                    handleMenuClose();
                }}
                sx={{
                    fontFamily: "IRANSans",
                    fontSize: "14px",
                    borderBottom: "1px solid #e0e0e0",
                }}
                >
                قطار
                </MenuItem>
                <MenuItem
                onClick={() => {
                    navigate("/search?transportation_type=پرواز داخلی"); // Add the transportation type as a query parameter
                    handleMenuClose();
                }}
                sx={{
                    fontFamily: "IRANSans",
                    fontSize: "14px",
                    borderBottom: "1px solid #e0e0e0",
                }}
                >
                پرواز داخلی
                </MenuItem>
                <MenuItem
                onClick={() => {
                    navigate("/search?transportation_type=پرواز خارجی"); // Add the transportation type as a query parameter
                    handleMenuClose();
                }}
                sx={{
                    fontFamily: "IRANSans",
                    fontSize: "14px",
                }}
                >
                پرواز خارجی
                </MenuItem>

          </Menu>
        </Box>

        {/* Right Section: User Authentication */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Left: My Trips Button */}
          {authToken && user && (
            <Button
              variant="outlined"
              sx={{
                color: "#333333",
                borderColor: "#333333",
                fontFamily: "IRANSans",
                textTransform: "none",
                fontSize: "14px",
                marginLeft: "auto", // Align button to the left
              }}
              onClick={() => navigate("/my-travels")}
            >
              سفرهای من
            </Button>
          )}

          {/* Right: Username and Profile */}
          {authToken && user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1, // Space between username and profile image
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontFamily: "IRANSans",
                  fontSize: "16px",
                  color: "#333333",
                  cursor: "pointer",
                  ":hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/profile")}
              >
                {user.username || "کاربر"}
              </Typography>
              <Avatar
                src={user.profile_photo || ""}
                alt="Profile"
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: "#FFD54F", // Fallback color
                }}
              />
            </Box>
          )}

          {!authToken && (
            <Button
              variant="outlined"
              sx={{
                color: "#333333",
                borderColor: "#333333",
                fontFamily: "IRANSans",
                textTransform: "none",
                fontSize: "14px",
              }}
              onClick={() => navigate("/login")}
            >
              ورود یا ثبت‌نام
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
