import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import HomePage from "./pages/HomePage";
import SingleTour from "./pages/SingleTour";
import SearchResults from "./pages/SearchResults";
import MyTravels from "./pages/MyTravels";
import PaymentPage from "./pages/PaymentPage";
import PaymentCallback from "./pages/PaymentCallback";
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/my-travels" element={<MyTravels />} />
        <Route path="/tour/:id" element={<SingleTour />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/payment/callback/:id" element={<PaymentCallback />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;
