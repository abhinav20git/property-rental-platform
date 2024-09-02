"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaShoppingCart, FaInfoCircle, FaPhone, FaCompass, FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import Image from "next/image";
import manageCartService from "@/appwrite/manageCartService";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";

export default function VerticalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const reduxUserData = useSelector((state) => state.auth.userData);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      if (userData && userData.$id) {
        await authService.logout();
        dispatch(logout());
        destroyCookie(null, 'traditionalUSer', {
          path: '/',  
        });
        router.push("/");
      } else {
        signOut();
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleNavbar}
        className="fixed top-0 right-0 p-4 z-50 text-blue-700 dark:text-gray-200"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed flex flex-col gap-3 top-0 right-0 h-screen w-[350px] bg-gray-900 p-4 z-40 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out dark:bg-gray-800`}
      >
        {reduxUserData ? (
          <div><div className="flex items-center space-x-4">
              {reduxUserData.prefs || reduxUserData.image ? (
              reduxUserData.prefs ? (
                <Image
                  src={
                    manageCartService.getFilePreview(reduxUserData.prefs.avatar)
                      ?.href
                  }
                  alt="avatar"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={reduxUserData.image}
                  alt="avatar"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              )
            ) : (
              getInitials(reduxUserData?.userName || reduxUserData?.name)
            )}
            <div>
              <p className="text-gray-100 font-semibold dark:text-gray-300">
                {reduxUserData?.userName || reduxUserData?.name}
              </p>
              <p className="text-gray-300 dark:text-gray-400">
                {reduxUserData?.email || reduxUserData?.email}
              </p>
            </div>
          </div>
          <div className=" text-gray-100 text-lg font-semibold dark:text-gray-300">
            <Link
              href={"/manage-account"}
              className="flex justify-start items-center gap-2 w-full px-4 py-2 text-left  hover:text-yellow-500 dark:hover:text-yellow-400"
            >
              {" "}
              <AiOutlineSetting />
              Manage Account
            </Link>
            <button
              onClick={handleLogout}
              className=" w-full flex justify-start items-center gap-2 px-4 py-2 text-left hover:text-yellow-500 dark:hover:text-yellow-400"
            >
              {" "}
              <AiOutlineLogout />
              Logout
            </button>
          </div>
          </div>
        ) : (
          <Link href="/signin">
            <div className="text-white flex items-center text-xl font-bold dark:text-gray-200 hover:text-yellow-500 dark:hover:text-yellow-400">
            <MdAccountCircle className="mr-2 text-2xl" />Sign In
            </div>
          </Link>
        )}

        <div className="my-2">
          <Link href="/cart">
            <p className="text-xl font-bold text-gray-100 dark:text-gray-300 flex items-center hover:text-yellow-500 dark:hover:text-yellow-400">
              <FaShoppingCart className="mr-2" /> Cart
            </p>
          </Link>
        </div>

        <div>
          <div className="text-xl font-bold text-gray-100 dark:text-gray-300 flex items-center">
            <FaCompass className="mr-2" /> More
          </div>
          <div className="flex flex-col text-white dark:text-gray-300 space-y-4 mt-4 ml-4">
            <Link href="/contact">
              <p className="hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center">
                <FaPhone className="mr-2" /> Contact
              </p>
            </Link>
            <Link href="/explore">
              <p className="hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center">
                <FaCompass className="mr-2" /> Explore
              </p>
            </Link>
            <Link href="/about">
              <p className="hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center">
                <FaInfoCircle className="mr-2" /> About
              </p>
            </Link>
            <Link href="/social-media">
              <p className="hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center">
                <FaUser className="mr-2" /> Social Media
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
