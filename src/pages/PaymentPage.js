import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const { id } = useParams(); // Get the tour ID from the URL
  const [loading, setLoading] = useState(true); // Loading state for fetching data and processing
  const [paymentUrl, setPaymentUrl] = useState(""); // Zarinpal payment URL
  const [tourPrice, setTourPrice] = useState(null); // State to store the tour price
  const [discountedPrice, setDiscountedPrice] = useState(null); // State to store the final price after discount
  const navigate = useNavigate();

  // Fetch the tour details and calculate the discounted price
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        // Fetch the tour details (including price)
        const response = await axios.get(`/tours/${id}/`);
        const price = response.data.price; // Assuming price is available in the response

        // Calculate the discounted price (for example 10% discount)
        const discount = response.data.price_off / 100; // 10% discount
        const finalPrice = price - (price * discount);

        // Set the tour price and the final discounted price
        setTourPrice(price);
        setDiscountedPrice(finalPrice);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [id]);

  // Initiate the payment request to Zarinpal API
  useEffect(() => {
    const initiatePayment = async () => {
      if (!discountedPrice) return; // Wait for the discounted price to be available

      try {
        // Initiate the payment request with the discounted price
        const response = await axios.post(`/tours/${id}/payment-request/`, {
          amount: discountedPrice, // Use the discounted price for payment
          description: `پرداخت برای تور ${id}`,
          callback_url: `http://127.0.0.1:3000/payment/callback/${id}/`, // URL to redirect after payment completion
        });

        if (response.data.payment_url) {
          setPaymentUrl(response.data.payment_url); // Get payment URL from response
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
      } finally {
        setLoading(false);
      }
    };

    initiatePayment();
  }, [id, discountedPrice]); // Trigger payment initiation when discountedPrice changes

  // Redirect the user to the payment page
  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl; // Redirect the user to Zarinpal's payment page
    }
  }, [paymentUrl]);

  // Loading state while waiting for the response
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
          در حال انتقال به درگاه پرداخت
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          لطفاً صبر کنید تا به صفحه پرداخت هدایت شوید...
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "20px" }}>
          قیمت اصلی تور: {tourPrice} تومان
        </Typography>
        <Typography variant="body2">
          قیمت با تخفیف: {discountedPrice} تومان
        </Typography>
      </Box>
      <Footer />
    </>
  );
};

export default PaymentPage;
