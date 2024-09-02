"use client"
import React from 'react';
import { FaRocket, FaUserFriends, FaShieldAlt } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LogoBar, VerticalNavbar } from "@/components/index";

const AboutPage = () => {
  const notify = () => {
    toast.info('Welcome to Our About Page!', {
      autoClose: 3000,
      theme: 'colored',
    });
  };

  React.useEffect(() => {
    notify();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-8">
      <LogoBar />
      <VerticalNavbar />
        <ToastContainer />
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-center text-xl mb-8">
          Welcome to <span className="text-blue-500 dark:text-blue-300">Next Door</span>, where we bring you the best platform for property rentals.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0">
          <div className="flex-1 text-center">
            <FaRocket className="text-blue-500 dark:text-blue-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="px-4">
              Our mission is to provide a seamless and efficient property rental experience. We aim to revolutionize the real estate industry with innovative and user-friendly solutions.
            </p>
          </div>

          <div className="flex-1 text-center">
            <FaUserFriends className="text-green-500 dark:text-green-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
            <p className="px-4">
              Our team is composed of talented and passionate individuals dedicated to making Next Door the best it can be. We believe in teamwork and innovation.
            </p>
          </div>

          <div className="flex-1 text-center">
            <FaShieldAlt className="text-red-500 dark:text-red-300 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <p className="px-4">
              We prioritize security, integrity, and user satisfaction in everything we do. Our values guide us in delivering top-notch services to our users.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-lg px-4">
            We are constantly working on new features and improvements. Stay tuned and be a part of our exciting journey towards making Next Door even better.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold mb-4">Connect with Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-900 dark:text-gray-100 text-3xl hover:text-blue-500 dark:hover:text-blue-300" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-700 dark:text-blue-300 text-3xl hover:text-blue-500 dark:hover:text-blue-300" />
            </a>
            <a href="https://instagram.com/allthingsman" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 dark:text-pink-300 text-3xl hover:text-blue-500 dark:hover:text-blue-300" />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-400 dark:text-blue-300 text-3xl hover:text-blue-500 dark:hover:text-blue-300" />
            </a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blue-600 dark:text-blue-300 text-3xl hover:text-blue-500 dark:hover:text-blue-300" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
