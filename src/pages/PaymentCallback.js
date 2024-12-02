import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material"; // Import Button here
import axios from "../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentCallback = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(`/tours/${id}/`);
        const params = new URLSearchParams(window.location.search);
        const authority = params.get("Authority");
        const status = params.get("Status");
        const price = response.data.price;
        const discount = response.data.price_off / 100; // Convert percentage to decimal
        const finalPrice = price - (price * discount);

        if (status === "OK") {
          const paymentResponse = await axios.post(`/tours/${id}/payment-verify/`, {
            Authority: authority,
            Amount: finalPrice, // Same amount used in payment request
          });

          if (paymentResponse.data.message === "Payment verified successfully") {
            setPaymentStatus("پرداخت شما با موفقیت تایید شد.");
          } else {
            setPaymentStatus("مشکلی در تایید پرداخت پیش آمد.");
          }
        } else {
          setPaymentStatus("پرداخت ناموفق بود.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentStatus("خطا در تایید پرداخت.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          وضعیت پرداخت
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          {paymentStatus}
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")} sx={{ marginTop: "20px" }}>
          بازگشت به خانه
        </Button>
      </Box>
      <Footer />
    </>
  );
};

export default PaymentCallback;
