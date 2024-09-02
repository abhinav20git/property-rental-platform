"use client";

import React, { useState } from "react";
import authService from "../appwrite/authService";
import manageCartService from "@/appwrite/manageCartService";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { login, logout } from "@/Redux/slices/authSlice";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { setCookie} from "nookies";
import { Logo, Btn, Input, LogoBar, VerticalNavbar } from "@/components/index";

function SignUp() {
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
      if (session) {
        await signOut();
      }
      const res = await signIn(provider);
      dispatch(login(res));

      router.push("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const onSignUp = async (data) => {
    setError("");
    try {
      if (session) {
        await signOut();

        dispatch(logout());
      }
      const { name, email, password } = data;
      if (data.avatar && data.avatar.length > 0) {
        const res = await manageCartService.uploadFile(data.avatar[0]);
        if (res) {
          data.avatar = res.$id;
        } else {
          throw new Error("Failed to upload avatar");
        }
      }
      const newAccount = await authService.createAccount({
        email,
        password,
        name,
      });
      if (newAccount) {
        const loginSession = await authService.createSession({ email, password });
        if (loginSession) {
          const userData = await authService.getCurrentUser();
          if (userData) {
            await authService.setAvatar({ avatar: data.avatar });
            const userDataWithUpdatedAvatar = await authService.getCurrentUser();
            dispatch(login(userDataWithUpdatedAvatar));
            setCookie(null, 'traditionalUSer', 'true', {
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            });
            router.push("/");
          }
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <LogoBar />
      <VerticalNavbar />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-10 pt-0 shadow-md dark:shadow-lg">
        <div className="mb-6 flex justify-center">
          <Logo className="w-24 h-24" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?&nbsp;
          <Link
            href="/signin"
            className="font-medium text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleAuthLogin("google")}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          <button
            onClick={() => handleAuthLogin("github")}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
          >
            <FaGithub className="mr-2" /> Continue with GitHub
          </button>
        </div>
        <form onSubmit={handleSubmit(onSignUp)} className="mt-8 space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter Your Name"
              label="Name"
              {...register("name", {
                required: { value: true, message: "This field is required" },
              })}
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
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
              className="bg-gray-100 dark:bg-gray-700"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
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
            <Input
              label="Avatar (optional)"
              type="file"
              className="mb-4 bg-gray-100 dark:bg-gray-700"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("avatar", { required: false })}
            />
          </div>
          <div>
            <Btn
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Sign Up
            </Btn>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
