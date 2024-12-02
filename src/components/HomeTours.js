import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Button, CircularProgress } from "@mui/material";
import axios from "../api/axiosConfig";

const HomeTours = () => {
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(1); // Current page number
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // Check if more data is available

  const fetchTours = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/`, { params: { page } });
      const newTours = response.data.results.home_tours;

      // Avoid duplicate data
      setTours((prevTours) => [...new Set([...prevTours, ...newTours])]);
      setPage((prevPage) => prevPage + 1);

      // Check if there are more tours
      if (newTours.length === 0 || newTours.length < 15) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  // Fetch initial data on component mount
  useEffect(() => {
    fetchTours();
  }, []);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        fetchTours();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchTours, isLoading, hasMore]);

  return (
    <Box sx={{ padding: "20px" }} dir="rtl">
      <Typography
        variant="h4"
        sx={{
          fontFamily: "IRANSans",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        تورهای پیشنهادی
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {tours.map((tour) => (
          <Card
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
            key={tour.id}
          >
            <CardMedia
              component="img"
              sx={{ width: { xs: "100%", md: "300px" }, height: "200px" }}
              image={tour.image || "https://via.placeholder.com/300"}
              alt={`${tour.title} از ${tour.origin_city} به ${tour.destination_city}`}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              {/* Title with origin and destination */}
              <Typography variant="h5" sx={{ fontFamily: "IRANSans", marginBottom: "10px" }}>
                {`${tour.title} از ${tour.origin_city}`}
              </Typography>
              {/* Display pricing with discount */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {tour.price_off > 0 ? (
                  <>
                    {/* Original Price + Discount Percentage */}
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#757575",
                      }}
                    >
                      <span style={{ textDecoration: "line-through" }}>
                        {tour.price.toLocaleString()} تومان
                      </span>{" "}
                      ({tour.price_off}% تخفیف)
                    </Typography>
                    {/* Discounted Price */}
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#FF5722", // Highlighted color for discounted price
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {tour.discounted_price.toLocaleString()} تومان
                    </Typography>
                  </>
                ) : (
                  // No discount case
                  <Typography
                    sx={{
                      fontFamily: "IRANSans",
                      color: "#757575",
                      fontWeight: "bold",
                    }}
                  >
                    قیمت: {tour.price.toLocaleString()} تومان
                  </Typography>
                )}
              </Box>
              {/* Seats Left */}
              <Typography
                sx={{
                  fontFamily: "IRANSans",
                  color: "#757575",
                  marginTop: "10px",
                }}
              >
                تعداد صندلی‌های باقی‌مانده: {tour.remaining_capacity}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: "20px",
                  alignSelf: "flex-start",
                  backgroundColor: "#FF9800",
                  color: "white",
                  ":hover": { backgroundColor: "#E65100" },
                }}
                onClick={() => window.location.href = `/tour/${tour.id}`}
              >
                اطلاعات بیشتر
              </Button>
            </CardContent>
          </Card>
        ))}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomeTours;
