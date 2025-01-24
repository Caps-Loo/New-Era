// src/pages/Home.jsx
import React, { useContext } from "react";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Hero";
import Job from "./Job";
import ReviewCarousel from "../components/ReviewCarousel";
import { SearchContext } from "../context/SearchContext"; // Import SearchContext

const Home = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  return (
    <>
      <Navbar />
      <Hero />
      <Job searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Operkan konteks */}
      <ReviewCarousel />
    </>
  );
};

export default Home;
