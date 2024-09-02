"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/authService";
import { logout } from "@/Redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import Link from "next/link";
import manageCartService from "@/appwrite/manageCartService";
import { destroyCookie } from "nookies";

function ManageAccount() {
  const reduxUserData = useSelector((state) => state.auth.userData);
  // console.log(reduxUserData);
  const [userData, setUserData] = useState(reduxUserData);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const sessionUserData = session?.user;

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

  const getInitials = (fullName) => {
    let nameParts = fullName.split(" ");
    let initials = nameParts.map((name) => name.charAt(0)).join("");
    return initials.toUpperCase();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!userData && !sessionUserData) {
    return null;
  }

  return (
    <div className="relative">
      <div
        className="flex items-center space-x-4 cursor-pointer"
        onClick={toggleMenu}
      >
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
          {userData.prefs || userData.image ? (
            userData.prefs ? (
              <Image
                src={
                  manageCartService.getFilePreview(userData.prefs.avatar)?.href
                } // Ensure that the URL is extracted correctly
                alt="avatar"
                height={500}
                width={500}
                className="rounded-full"
              />
            ) : (
              <Image
                src={userData.image}
                alt="avatar"
                height={500}
                width={500}
                className="rounded-full"
              />
            )
          ) : (
            getInitials(userData?.userName || userData?.name)
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-auto bg-white rounded-md shadow-lg z-20">
          <div className="flex items-center space-x-2 p-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
              {userData || userData.image ? (
                userData.prefs ? (
                  <Image
                    src={
                      manageCartService.getFilePreview(userData.prefs.avatar)
                        ?.href
                    } // Ensure that the URL is extracted correctly
                    alt="avatar"
                    height={500}
                    width={500}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src={userData.image}
                    alt="avatar"
                    height={500}
                    width={500}
                    className="rounded-full"
                  />
                )
              ) : (
                getInitials(userData?.userName || userData?.name)
              )}
            </div>
            <div className="text-sm ">
              <p className="text-gray-900 font-semibold">{userData?.name}</p>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
          </div>
          <div className="py-2">
            <Link
              href={"/manage-account"}
              className="flex justify-start items-center gap-2 w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
            >
              {" "}
              <AiOutlineSetting />
              Manage Account
            </Link>
            <button
              onClick={handleLogout}
              className=" w-full flex justify-start items-center gap-2 px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
            >
              {" "}
              <AiOutlineLogout />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAccount;
