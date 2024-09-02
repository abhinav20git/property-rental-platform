"use client";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { LogoBar, VerticalNavbar } from '@/components/index';

const SocialMedia = () => {
  const notify = () => {
    toast.success('Welcome to our Social Media Page!', {
      autoClose: 3000,
    });
  };

  React.useEffect(() => {
    notify();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col items-center justify-center">
      <ToastContainer />
      <LogoBar />
      <VerticalNavbar />
      <h1 className="text-4xl font-bold py-5 text-center mb-6">Connect with Us</h1>
      <p className="text-center text-xl mb-8 max-w-2xl px-4">
        Follow Next Door on social media to stay updated with the latest news, property listings, and more.
        Join our community and be a part of our growing family!
      </p>

      <div className="flex space-x-6 mb-12">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-4xl transition-colors">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 text-4xl transition-colors">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 text-4xl transition-colors">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400 text-4xl transition-colors">
          <FaLinkedinIn />
        </a>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-5xl w-full mx-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Social Media Reach</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <FaFacebookF className="text-blue-600 dark:text-blue-400 text-6xl mb-4" />
            <p className="text-xl font-medium">10k Followers</p>
            <p className="text-gray-600 dark:text-gray-400">Facebook</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTwitter className="text-blue-400 dark:text-blue-300 text-6xl mb-4" />
            <p className="text-xl font-medium">8k Followers</p>
            <p className="text-gray-600 dark:text-gray-400">Twitter</p>
          </div>
          <div className="flex flex-col items-center">
            <FaInstagram className="text-pink-500 dark:text-pink-400 text-6xl mb-4" />
            <p className="text-xl font-medium">15k Followers</p>
            <p className="text-gray-600 dark:text-gray-400">Instagram</p>
          </div>
          <div className="flex flex-col items-center">
            <FaLinkedinIn className="text-blue-700 dark:text-blue-500 text-6xl mb-4" />
            <p className="text-xl font-medium">12k Followers</p>
            <p className="text-gray-600 dark:text-gray-400">LinkedIn</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-8 mt-12 max-w-5xl w-full mx-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image src="https://thumbs.dreamstime.com/b/portrait-young-brutal-african-american-man-applying-facial-cream-his-cheek-close-up-portrait-men-s-beauty-skin-care-portrait-185903653.jpg" height={100} width={100} alt="Team Member 1" className="rounded-full w-32 h-32 mb-4"/>
            <h3 className="text-xl font-medium">Jane Doe</h3>
            <p className="text-gray-600 dark:text-gray-400">CEO</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" height={100} width={100} alt="Team Member 2" className="rounded-full w-32 h-32 mb-4"/>
            <h3 className="text-xl font-medium">John Smith</h3>
            <p className="text-gray-600 dark:text-gray-400">CTO</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src="https://www.imageconsultinginstitute.com/wp-content/uploads/2021/12/smiling-confident-businesswoman-posing-with-arms-folded.jpg" height={100} width={100} alt="Team Member 3" className="rounded-full w-32 h-32 mb-4"/>
            <h3 className="text-xl font-medium">Emily Johnson</h3>
            <p className="text-gray-600 dark:text-gray-400">CMO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
