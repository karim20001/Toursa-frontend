import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SearchResults = () => {
  const [tours, setTours] = useState([]); // Stores all tours
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [nextUrl, setNextUrl] = useState(null); // Tracks the next URL for pagination
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more pages to load
  const [searchParams] = useSearchParams(); // Search parameters from URL
  const navigate = useNavigate();

  // Fetch tours from the API
  const fetchTours = async (url, isInitial = false) => {
    if (!url || loading || (!hasMore && !isInitial)) return; // Prevent fetch if no URL, already loading, or no more data

    setLoading(true); // Start loading
    try {
      const response = await axios.get(url);
      setTours((prevTours) => {
        const newTours = response.data.results;
        // Merge unique tours only (filter out duplicates by ID)
        const uniqueTours = [...prevTours, ...newTours].reduce((acc, tour) => {
          if (!acc.find((t) => t.id === tour.id)) {
            acc.push(tour);
          }
          return acc;
        }, []);
        return uniqueTours;
      });
      setNextUrl(response.data.next); // Set the next page URL
      setHasMore(Boolean(response.data.next)); // Check if there are more pages
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch the first page of data immediately when the component mounts or searchParams change
  useEffect(() => {
    const initialUrl = `/search/?${searchParams.toString()}&page=1`; // URL for the first page
    fetchTours(initialUrl, true); // Fetch the first page of data
  }, [searchParams]);

  // Handle scroll to load more data
  const handleScroll = () => {
    const nearBottom =
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 300; // Smaller offset for smaller devices

    if (nearBottom && hasMore && !loading) {
      fetchTours(nextUrl); // Fetch next page
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextUrl, hasMore, loading]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('http://0.0.0.0:8000/media/hero-f5969150.webp')`,
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
            fontSize: { xs: "20px", sm: "24px", md: "28px" }, // Responsive font size
          }}
        >
          نتایج جستجو
        </Typography>

        {/* Results Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center", // Center-align cards
          }}
        >
          {tours.map((tour) => (
            <Card
              key={tour.id}
              sx={{
                width: "100%",
                maxWidth: "800px", // Limit the card width for better responsiveness
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/tour/${tour.id}`)}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", sm: "180px" }, // Full width for smaller screens
                  height: "180px",
                  objectFit: "cover",
                }}
                image={tour.image || "https://via.placeholder.com/180"}
                alt={tour.title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                  padding: "15px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    fontSize: { xs: "16px", sm: "18px", md: "20px" }, // Responsive text size
                    color: "#333",
                  }}
                >
                  {tour.title}
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
                          fontSize: { xs: "14px", sm: "16px" },
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
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                      >
                        %{tour.price_off} تخفیف
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "IRANSans",
                          color: "#FF5722",
                          marginTop: "5px",
                          fontSize: { xs: "16px", sm: "18px" },
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
                        fontSize: { xs: "16px", sm: "18px" }, // Responsive text size
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
                    fontSize: { xs: "12px", sm: "14px" }, // Smaller font for smaller devices
                  }}
                >
                  تعداد صندلی‌های باقی‌مانده: {tour.remaining_capacity}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Loading Indicator */}
        {loading && hasMore && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Footer />
    </>
  );
};

export default SearchResults;
