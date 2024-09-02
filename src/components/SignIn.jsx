"use client";
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import authService from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "@/Redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { Logo, Btn, Input } from "./index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogoBar, VerticalNavbar } from '@/components/index';
import { setCookie } from "nookies";

function SignIn() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleAuthLogin = async (provider) => {
    setError("");
    try {
      if (session) {await signOut();}
      const res = await signIn(provider);
      dispatch(login(res));
      router.push("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const onSignIn = async (data) => {
    setError("");
    try {
      if (session) {
        await signOut();
      }
      const loginSession = await authService.createSession({ ...data });
      if (loginSession) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData)); 
          setCookie(null, 'traditionalUSer', 'true', {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
          router.push("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <LogoBar />
      <VerticalNavbar />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-6 sm:p-10 shadow-md dark:shadow-gray-700">
        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-24" />
        </div>
        <h2 className="text-center text-black dark:text-white text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            href="/signup"
            className="font-medium text-blue-500 hover:underline dark:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 dark:text-red-400 mt-4 text-center">{error}</p>}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleAuthLogin("google")}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          <button
            onClick={() => handleAuthLogin("github")}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <FaGithub className="mr-2" /> Continue with GitHub
          </button>
        </div>
        <form onSubmit={handleSubmit(onSignIn)} className="mt-8 space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Enter Your Email"
              label="Email"
              {...register("email", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 6,
                  message: "Email must be at least 6 characters",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              label="Password"
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 top-7 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div>
            <Btn
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
            >
              Submit
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
