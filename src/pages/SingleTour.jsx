import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer

const SingleTour = () => {
  const { id } = useParams(); // Extract tour ID from the URL
  const [tour, setTour] = useState(null); // Tour data
  const [loading, setLoading] = useState(true); // Loading state
  const [userTourStatus, setUserTourStatus] = useState({
    already_purchased: false,
    no_seats_left: false,
    tour_not_available: false,
  }); // Tour status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const tourResponse = await axios.get(`/tours/${id}/`); // Fetch single tour details
        setTour(tourResponse.data);

        // Fetch user's tour status
        const statusResponse = await axios.get(`/tours/${id}/status/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setUserTourStatus(statusResponse.data);
        console.log(statusResponse.data)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour details or status:", error);
        setLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h5" sx={{ fontFamily: "IRANSans" }}>
          تور مورد نظر یافت نشد.
        </Typography>
        <Button
          variant="outlined"
          sx={{ color: "#FF9800", borderColor: "#FF9800", fontFamily: "IRANSans" }}
          onClick={() => navigate("/")}
        >
          بازگشت به خانه
        </Button>
      </Box>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Box
        sx={{
          padding: "20px",
          backgroundImage: `url('http://0.0.0.0:8000/media/hero-f5969150.webp')`, // Background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        dir="rtl"
      >
        {/* Content Box */}
        <Box
          sx={{
            width: { xs: "90%", md: "70%", lg: "60%" },
            backgroundColor: "rgba(255, 255, 255, 0.75)", // Semi-transparent white background
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Grid container spacing={4}>
            {/* Tour Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "400px",
                  backgroundImage: `url(${tour.image || "https://via.placeholder.com/400"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              ></Box>
            </Grid>

            {/* Tour Details */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "IRANSans",
                  marginBottom: "20px",
                  color: "#333",
                }}
              >
                {tour.title}
              </Typography>

              {/* Origin and Destination */}
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>مبدا:</strong> {tour.origin_city}, {tour.origin_country}
              </Typography>
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>مقصد:</strong> {tour.destination_city}, {tour.destination_country}
              </Typography>

              {/* Date and Capacity */}
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>تاریخ شروع:</strong> {tour.start_date}
              </Typography>
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>تاریخ پایان:</strong> {tour.end_date}
              </Typography>
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>ظرفیت باقی‌مانده:</strong> {tour.remaining_capacity}
              </Typography>

              {/* Transportation */}
              <Typography sx={{ fontFamily: "IRANSans", marginBottom: "10px", color: "#555" }}>
                <strong>نوع وسیله:</strong> {tour.transportation_type}
              </Typography>

              {/* Price */}
              <Box sx={{ marginBottom: "20px" }}>
                {tour.price_off > 0 ? (
                  <>
                    {/* Price Before Discount */}
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#757575",
                        textDecoration: "line-through",
                        display: "inline",
                        marginRight: "10px",
                      }}
                    >
                      {tour.price.toLocaleString()} تومان
                    </Typography>

                    {/* Discount Percentage */}
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: "#FF9800",
                        color: "white",
                        borderRadius: "4px",
                        padding: "3px 10px",
                        fontFamily: "IRANSans",
                        fontSize: "12px",
                        marginRight: "10px",
                      }}
                    >
                      %{tour.price_off} تخفیف
                    </Box>

                    {/* Price After Discount */}
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#FF5722",
                        display: "block",
                        marginTop: "5px",
                      }}
                    >
                      {tour.discounted_price.toLocaleString()} تومان
                    </Typography>
                  </>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: "IRANSans",
                      color: "#333333",
                      fontSize: "20px",
                    }}
                  >
                    {tour.price.toLocaleString()} تومان
                  </Typography>
                )}
              </Box>

              {/* Display appropriate message or button */}
              {userTourStatus.tour_not_available ? (
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#FF5722",
                    fontSize: "16px",
                  }}
                >
                  این تور دیگر در دسترس نیست.
                </Typography>
              ) : userTourStatus.no_seats_left ? (
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#FF5722",
                    fontSize: "16px",
                  }}
                >
                  صندلی خالی وجود ندارد.
                </Typography>
              ) : userTourStatus.already_purchased ? (
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#4CAF50",
                    fontSize: "16px",
                  }}
                >
                  شما این تور را قبلاً خریداری کرده‌اید.
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9800",
                    color: "white",
                    fontFamily: "IRANSans",
                    fontSize: "16px",
                    padding: "10px 20px",
                    ":hover": {
                      backgroundColor: "#E65100",
                    },
                  }}
                  onClick={() => navigate(`/payment/${id}`)}
                >
                  پرداخت
                </Button>
              )}
            </Grid>
          </Grid>

          {/* Description */}
          <Box sx={{ marginTop: "40px" }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "IRANSans",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              توضیحات تور
            </Typography>
            <Typography sx={{ fontFamily: "IRANSans", color: "#555", lineHeight: "1.8" }}>
              {tour.description || "بدون توضیحات اضافی"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default SingleTour;
