import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyTravels = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMyTravels = async () => {
      if (!hasMore) return;

      setLoading(true);
      try {
        const response = await axios.get("/my-travels/", {
          params: { page: nextPage },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        setTours((prevTours) => [...prevTours, ...response.data.results]);
        setHasMore(!!response.data.next); // Check if there are more pages
        setNextPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error fetching my travels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTravels();
  }, [nextPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      setNextPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Background with results */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('http://127.0.0.1:8000/media/my-travels-background.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 20px",
        }}
        dir="rtl"
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "IRANSans",
            marginBottom: "20px",
            textAlign: "center",
            color: "#333",
          }}
        >
          سفرهای من
        </Typography>

        {/* Results Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "flex-start",
          }}
        >
          {tours.map((tour) => (
            <Card
              key={tour.id}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                display: "flex",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Enhanced shadow
                borderRadius: "12px", // Rounded corners for a modern look
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Slight transparency
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out", // Smooth hover effect
                "&:hover": {
                  transform: "scale(1.02)", // Slight scale on hover
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
                image={tour.image || "https://via.placeholder.com/200"}
                alt={tour.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  padding: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {tour.title}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#757575",
                    marginTop: "10px",
                  }}
                >
                  مبدأ: {tour.origin_city}, {tour.origin_country}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#757575",
                    marginTop: "5px",
                  }}
                >
                  مقصد: {tour.destination_city}, {tour.destination_country}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#757575",
                    marginTop: "5px",
                  }}
                >
                  نوع وسیله نقلیه: {tour.transportation_type}
                </Typography>

                <Box sx={{ marginTop: "10px" }}>
                  {tour.price_off > 0 ? (
                    <>
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
                      <Typography
                        sx={{
                          fontFamily: "IRANSans",
                          display: "inline",
                          backgroundColor: "#FF9800",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          marginRight: "10px",
                        }}
                      >
                        %{tour.price_off} تخفیف
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "IRANSans",
                          color: "#FF5722",
                          marginTop: "5px",
                        }}
                      >
                        {(tour.price - (tour.price * tour.price_off) / 100).toLocaleString()} تومان
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#333333",
                        fontSize: "16px",
                      }}
                    >
                      {tour.price.toLocaleString()} تومان
                    </Typography>
                  )}
                </Box>

                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#757575",
                    marginTop: "10px",
                  }}
                >
                  تاریخ سفر: {tour.start_date} تا {tour.end_date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default MyTravels;
