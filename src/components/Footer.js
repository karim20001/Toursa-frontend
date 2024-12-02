import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link as RouterLink } from 'react-router-dom'; // Import the RouterLink from react-router-dom


const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F9F9F9", // Light gray background
        padding: "30px",
        borderTop: "2px solid #F5B041", // Light orange top border
      }}
      dir="rtl"
    >
      <Grid container spacing={4}>
        {/* Section 1: About Torsa */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "IRANSans", color: "#F5B041", marginBottom: "15px" }}
          >
            تورسا
          </Typography>
          <Box sx={{ fontFamily: "IRANSans", fontSize: "14px", color: "#333333", lineHeight: "1.8" }}>
          <Link component={RouterLink} to="/about-us" underline="none">
            <Typography sx={{color: '#333333'}}>
              درباره ما
            </Typography>
          </Link>

            <Typography>تماس با ما</Typography>
            <Typography>چرا تورسا</Typography>
            <Typography>بیمه مسافرتی</Typography>
            <Typography>مجله تورسا</Typography>
          </Box>
        </Grid>

        {/* Section 2: Customer Services */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "IRANSans", color: "#F5B041", marginBottom: "15px" }}
          >
            خدمات مشتریان
          </Typography>
          <Box sx={{ fontFamily: "IRANSans", fontSize: "14px", color: "#333333", lineHeight: "1.8" }}>
            <Typography>مرکز پشتیبانی آنلاین</Typography>
            <Typography>راهنمای خرید</Typography>
            <Typography>استرداد و مقررات</Typography>
            <Typography>پرسش و پاسخ</Typography>
          </Box>
        </Grid>

        {/* Section 3: Contact Info */}
        <Grid item xs={12} md={3}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "IRANSans", color: "#F5B041", marginBottom: "15px" }}
          >
            تماس با ما
          </Typography>
          <Box sx={{ fontFamily: "IRANSans", fontSize: "14px", color: "#333333", lineHeight: "1.8" }}>
            <Typography>تلفن پشتیبانی: ۰۲۱-۴۳۹۰۰۰۰۰</Typography>
            <Typography>
              آدرس: خیابان بیمه، کوی بیمه، بن‌بست گل‌ها، پلاک ۱
            </Typography>
          </Box>
        </Grid>

        {/* Section 4: Social Media Links */}
        <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
          <Box sx={{ marginBottom: "15px" }}>
            <img
              src='http://127.0.0.1:8000/media/hero-f5969150.webp' // Replace with the Torsa logo
              alt="Torsa Logo"
              style={{ width: "80px", marginBottom: "10px" }}
            />
          </Box>
          <Box>
            <IconButton
              component="a"
              href="https://t.me/yourchannel"
              sx={{ color: "#0088CC", margin: "0 5px" }}
            >
              <TelegramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://youtube.com/yourchannel"
              sx={{ color: "#FF0000", margin: "0 5px" }}
            >
              <YouTubeIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com/youraccount"
              sx={{ color: "#E4405F", margin: "0 5px" }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/youraccount"
              sx={{ color: "#0A66C2", margin: "0 5px" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Separator */}
      <Box sx={{ margin: "30px 0", borderTop: "1px solid #e0e0e0" }}></Box>

      {/* Bottom Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "IRANSans",
              fontSize: "12px",
              color: "#999999",
            }}
          >
            کلیه حقوق این سرویس (وب‌سایت و اپلیکیشن‌های موبایل) محفوظ و متعلق به شرکت سفرهای تورسا می‌باشد.
          </Typography>
        </Box>
        <Box>
          <IconButton sx={{ color: "#555" }}>
            <i className="fab fa-telegram"></i>
          </IconButton>
          <IconButton sx={{ color: "#555" }}>
            <i className="fab fa-youtube"></i>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
