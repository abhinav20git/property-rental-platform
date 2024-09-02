"use client";
import React, { useEffect } from "react";
import { FaMapMarkedAlt, FaSearch, FaHeart, FaHome } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogoBar, VerticalNavbar } from '@/components/index';

const ExploreMorePage = () => {
  useEffect(() => {
    toast.info("Explore more properties!", {
      autoClose: 3000,
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <LogoBar /><VerticalNavbar />
      <div className="container mx-auto px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Explore More</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaMapMarkedAlt className="text-blue-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Discover Nearby
            </h2>
            <p className="text-center">
              Explore properties near your current location with ease. Find your dream property just a few steps away.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaSearch className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Advanced Search
            </h2>
            <p className="text-center">
              Utilize our advanced search filters to find properties that meet your specific needs and preferences.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaHeart className="text-red-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Saved Favorites
            </h2>
            <p className="text-center">
              Keep track of your favorite properties and revisit them anytime to make the best decision.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaHome className="text-yellow-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              New Listings
            </h2>
            <p className="text-center">
              Stay updated with the latest property listings. Be the first to discover new opportunities.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaSearch className="text-purple-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Virtual Tours
            </h2>
            <p className="text-center">
              Take virtual tours of properties from the comfort of your home. Experience the property before you visit.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <FaHeart className="text-pink-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center mb-2">
              Personalized Recommendations
            </h2>
            <p className="text-center">
              Receive personalized property recommendations based on your preferences and past searches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreMorePage;
