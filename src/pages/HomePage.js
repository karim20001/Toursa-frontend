import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import SearchSection from "../components/SearchSection";
import HomeTours from "../components/HomeTours";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <SearchSection />
      <HomeTours />
      <Footer />
    </div>
  );
};

export default HomePage;
