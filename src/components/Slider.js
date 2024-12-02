import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import axios from "../api/axiosConfig";

const Slider = () => {
  const [tours, setTours] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // Track slide direction

  useEffect(() => {
    const fetchTopTours = async () => {
      try {
        const response = await axios.get("/"); // Replace with your backend endpoint
        const fetchedTours = response.data.results.top_tours.map((tour) => ({
          ...tour,
          image: tour.image.startsWith("http")
            ? tour.image
            : `http://127.0.0.1:8000${tour.image}`, // Ensure full image path
        }));
        setTours(fetchedTours);
      } catch (error) {
        console.error("Error fetching top tours:", error);
        setTours([]); // Ensure the slider doesn't break
      }
    };
    fetchTopTours();
  }, []);

  // Automatic slide transition every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // 8 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [tours]);

  const handleNext = () => {
    setDirection(1); // Moving forward
    setCurrentSlide((prev) => (prev + 1) % tours.length);
  };

  const handlePrev = () => {
    setDirection(-1); // Moving backward
    setCurrentSlide((prev) => (prev - 1 + tours.length) % tours.length);
  };

  // Fallback slides when no API data is available
  const fallbackSlides = [
    {
      title: "در انتظار بارگذاری",
      description: "لطفاً منتظر بمانید...",
      price: "۰",
      image: "https://via.placeholder.com/800x400?text=Loading", // Placeholder image
    },
  ];

  // Use fallback slides if `tours` is empty
  const slidesToShow = tours.length > 0 ? tours : fallbackSlides;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundImage: `url('http://0.0.0.0:8000/media/hero-f5969150.webp')`, // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "20px 0", md: "50px 0" }, // Responsive padding
      }}
    >
      {/* Slider Container */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "40vh", md: "60vh" }, // Adjust height for smaller screens
          width: { xs: "95%", md: "80%", lg: "70%" }, // Responsive width
          overflow: "hidden",
          borderRadius: "16px",
          backgroundColor: "rgba(224, 224, 224, 0.8)", // Semi-transparent gray
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow for depth
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          {slidesToShow.length > 0 && (
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{
                x: direction === 1 ? "100%" : "-100%", // Start off-screen
                opacity: 0.8,
              }}
              animate={{
                x: "0%", // Center the slide
                opacity: 1,
              }}
              exit={{
                x: direction === 1 ? "-100%" : "100%", // Move off-screen
                opacity: 0.8,
              }}
              transition={{
                duration: 0.8, // Smooth animation duration
                ease: "easeInOut",
              }}
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: "100%",
                position: "absolute", // Stack slides
              }}
            >
              {/* Image Section */}
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" }, // Full width on small screens, half on larger
                  height: "100%",
                  backgroundImage: `url(${slidesToShow[currentSlide]?.image || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" }, // Rounded corners for mobile
                }}
              ></Box>

              {/* Text Section */}
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" }, // Full width on small screens, half on larger
                  padding: { xs: "10px 15px", md: "20px 30px" }, // Adjust padding for screens
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: { xs: "center", md: "right" }, // Center-align text on mobile, right-align on larger screens
                  color: "#333",
                  gap: "10px", // Consistent spacing between elements
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "IRANSans",
                    fontSize: { xs: "16px", md: "20px", lg: "24px" }, // Larger font size for large screens
                    color: "#333",
                  }}
                >
                  {`${slidesToShow[currentSlide]?.title || "عنوان تور"} از ${
                    slidesToShow[currentSlide]?.origin_city || "مبدا"
                  }`}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "IRANSans",
                    color: "#616161",
                    fontSize: { xs: "12px", md: "14px", lg: "16px" }, // Adjust font size for screens
                    lineHeight: "1.5", // Improve readability
                  }}
                >
                  {slidesToShow[currentSlide]?.description ||
                    "توضیحات مختصر در مورد این تور."}
                </Typography>

                {/* Pricing Section */}
                <Box>
                  {slidesToShow[currentSlide]?.price_off > 0 ? (
                    <>
                      {/* Discount Percentage */}
                      <Typography
                        sx={{
                          fontFamily: "IRANSans",
                          backgroundColor: "#FF9800",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          display: "inline",
                          marginRight: "10px",
                        }}
                      >
                        %{slidesToShow[currentSlide]?.price_off} تخفیف
                      </Typography>

                      {/* Price Before Discount */}
                      <Typography
                        sx={{
                          fontFamily: "IRANSans",
                          textDecoration: "line-through",
                          color: "#757575",
                          display: "inline",
                        }}
                      >
                        {slidesToShow[currentSlide]?.price.toLocaleString()} تومان
                      </Typography>

                      {/* Discounted Price */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "IRANSans",
                          color: "#FF5722", // Highlighted color for discounted price
                          marginTop: "10px",
                        }}
                      >
                        {slidesToShow[currentSlide]?.discounted_price.toLocaleString()} تومان
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: "IRANSans",
                        color: "#333333",
                      }}
                    >
                      قیمت: {slidesToShow[currentSlide]?.price.toLocaleString()} تومان
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF9800",
                    color: "white",
                    fontFamily: "IRANSans",
                    fontSize: { xs: "12px", md: "14px", lg: "16px" }, // Adjust button font size
                    alignSelf: { xs: "center", md: "flex-start" }, // Center-align button on mobile
                    ":hover": { backgroundColor: "#E65100" },
                  }}
                >
                  اطلاعات بیشتر
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
            color: "white",
            zIndex: 10,
            ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
            color: "white",
            zIndex: 10,
            ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
            width: "40px",
            height: "40px",
            borderRadius: "50%",
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Slider;
