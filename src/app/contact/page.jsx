'use client';

import React, { useState } from 'react';
import { Boxes } from '@/components/ui/background-boxes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Link from 'next/link';
import { LogoBar, VerticalNavbar } from '@/components/index';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/sendEmail', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setEmail('');
        setMessage('');
        toast.success("Email sent to Next Door team. We will reach you soon.");
      } else {
        setStatus('Failed to send message.');
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Failed to send message.');
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-10 relative overflow-hidden">
      <Boxes className="absolute top-0 left-0 w-full h-full z-0" />
      <LogoBar />
      <VerticalNavbar />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-3xl md:text-4xl text-center font-sans font-bold mb-8 text-black dark:text-white">
          Contact Us
        </h1>
        <p className="text-slate-700 dark:text-neutral-500 max-w-lg mx-auto my-2 text-center">
          We&apos;re here to help with any questions about our rental properties,
          or related inquiries. Reach out and let us know how we can assist you
          in your journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 dark:bg-neutral-950 bg-gray-300 text-black dark:text-white placeholder:text-neutral-700"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 dark:bg-neutral-950 bg-gray-300 text-black dark:text-white placeholder:text-neutral-700"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
        <div className="flex justify-center space-x-4 mt-8">
          <Link href="https://github.com/AmanUpadhyay1211" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-black dark:text-white text-2xl hover:text-teal-500 transition-colors duration-200" />
          </Link>
          <Link href="https://www.linkedin.com/in/allthingsaman" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-black dark:text-white text-2xl hover:text-teal-500 transition-colors duration-200" />
          </Link>
          <Link href="https://instagram.com/allthingsaman" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-black dark:text-white text-2xl hover:text-teal-500 transition-colors duration-200" />
          </Link>
          <Link href="http://twitter.com/AmanUpa59504263?s=09" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-black dark:text-white text-2xl hover:text-teal-500 transition-colors duration-200" />
          </Link>
          <Link href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-black dark:text-white text-2xl hover:text-teal-500 transition-colors duration-200" />
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact;
