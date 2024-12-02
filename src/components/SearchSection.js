import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    start_date: "",
    end_date: "",
    passengers: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    // Create query string for search parameters
    const queryParams = new URLSearchParams(searchData).toString();
    console.log(queryParams)
    navigate(`/search?${queryParams}`); // Redirect to the search results page
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F9F9F9",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for better design
      }}
      dir="rtl"
    >
      <TextField
        label="مبدا"
        name="origin"
        value={searchData.origin}
        onChange={handleInputChange}
        sx={{
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#FF9800",
            },
          },
          "& .MuiInputLabel-root": {
            textAlign: "right",
            right: "28px",
            transformOrigin: "top right",
            "&.Mui-focused": {
              color: "#FF9800",
            },
          },
          "& .MuiInputBase-input": {
            textAlign: "right",
          },
        }}
      />
      <TextField
        label="مقصد"
        name="destination"
        value={searchData.destination}
        onChange={handleInputChange}
        sx={{
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#FF9800",
            },
          },
          "& .MuiInputLabel-root": {
            textAlign: "right",
            right: "28px",
            transformOrigin: "top right",
            "&.Mui-focused": {
              color: "#FF9800",
            },
          },
          "& .MuiInputBase-input": {
            textAlign: "right",
          },
        }}
      />
      <TextField
        label="تاریخ رفت"
        name="start_date"
        type="date"
        value={searchData.start_date}
        onChange={handleInputChange}
        sx={{
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#FF9800",
            },
          },
          "& .MuiInputLabel-root": {
            textAlign: "right",
            right: "28px",
            transformOrigin: "top right",
            "&.Mui-focused": {
              color: "#FF9800",
            },
          },
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="تاریخ برگشت"
        name="end_date"
        type="date"
        value={searchData.end_date}
        onChange={handleInputChange}
        sx={{
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#FF9800",
            },
          },
          "& .MuiInputLabel-root": {
            textAlign: "right",
            right: "28px",
            transformOrigin: "top right",
            "&.Mui-focused": {
              color: "#FF9800",
            },
          },
        }}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="مسافران"
        name="passengers"
        value={searchData.passengers}
        onChange={handleInputChange}
        sx={{
          width: "200px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#FF9800",
            },
          },
          "& .MuiInputLabel-root": {
            textAlign: "right",
            right: "28px",
            transformOrigin: "top right",
            "&.Mui-focused": {
              color: "#FF9800",
            },
          },
          "& .MuiInputBase-input": {
            textAlign: "right",
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: "#FF9800",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
          fontFamily: "IRANSans",
          textTransform: "none",
          ":hover": {
            backgroundColor: "#E65100",
          },
        }}
      >
        جستجو
      </Button>
    </Box>
  );
};

export default SearchSection;
