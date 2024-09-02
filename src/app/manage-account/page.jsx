"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { LogoBar, VerticalNavbar } from "@/components/index";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import manageCartService from "@/appwrite/manageCartService";
import authService from "@/appwrite/authService";
import userService from "@/appwrite/userService";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUserData, logout } from "@/Redux/slices/authSlice";
import { signOut } from "next-auth/react";
import { destroyCookie } from "nookies";

const ManageAccount = () => {
  const userData = useSelector((state) => state.auth.userData);
  const isTraditionalUser = Boolean(userData.$id);
  const [redirecting, setRedirecting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState({
    email: false,
    password: false,
    avatar: false,
    name: false,
  });
  const [isLoading, setIsLoading] = useState({
    email: false,
    password: false,
    avatar: false,
    name: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    oldPassword: false,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const userInfo = {
    profileName: "ALL THINGS",
    email: "amanupadhyay1211@gmail.com",
    connectedAccounts: [
      {
        provider: "Google",
        email: "amanupadhyay1211@gmail.com",
        icon: <FaGoogle />,
      },
    ],
    devices: [
      {
        name: "X11",
        os: "Chrome 127.0.0.0",
        ip: "2401:4900:8842:7788:96db:5a5c:440:5a35",
        location: "Delhi, IN",
        lastActive: "Today at 8:01 PM",
      },
    ],
  };

  const handleUpdateEmail = async (data) => {
    setIsLoading((prev) => ({ ...prev, email: true }));
    try {
      const updation = await authService.updateEmail({
        email: data.newEmail,
        password: data.password,
      });
      if (updation) {
        toast.success("Email updated successfully");
        reset();
        setIsFormOpen({ ...isFormOpen, email: false });
        // Update state to trigger re-render with new email
        dispatch(updateUserData({ email: data.newEmail }));
      }
    } catch (error) {
      console.log("Email Updation Error: ", error);
      toast.error("Failed to update email");
    } finally {
      setIsLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const handleUpdatePassword = async (data) => {
    setIsLoading((prev) => ({ ...prev, password: true }));
    try {
      const updation = await authService.updatePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      if (updation) {
        toast.success("Password updated successfully");
        reset();
        setIsFormOpen({ ...isFormOpen, password: false });
      }
    } catch (error) {
      console.log("Password Updation Error: ", error);
      toast.error("Failed to update password");
    } finally {
      setIsLoading((prev) => ({ ...prev, password: false }));
    }
  };

  const handleUpdateAvatar = async (data) => {
    setIsLoading((prev) => ({ ...prev, avatar: true }));
    try {
      if (data.avatar && data.avatar.length > 0) {
        const res = await manageCartService.uploadFile(data.avatar[0]);
        if (res) {
          await manageCartService.deleteFile(userData.prefs.avatar);
          data.avatar = res.$id;
          const updation = await authService.setAvatar({
            avatar: data.avatar,
          });
          if (updation) {
            toast.success("Avatar updated successfully");
            reset();
            setIsFormOpen({ ...isFormOpen, avatar: false });
            // Update state to trigger re-render with new avatar
            dispatch(updateUserData({ prefs: { avatar: data.avatar } }));
          }
        } else {
          throw new Error("Failed to upload avatar");
        }
      }
    } catch (error) {
      console.log("Avatar Updation Error: ", error);
      toast.error("Failed to update avatar");
    } finally {
      setIsLoading((prev) => ({ ...prev, avatar: false }));
    }
  };

  const handleUpdateName = async (data) => {
    setIsLoading((prev) => ({ ...prev, name: true }));
    try {
      const updation = await authService.updateName({
        newName: data.newName,
      });
      if (updation) {
        toast.success("Name updated successfully");
        reset();
        setIsFormOpen({ ...isFormOpen, name: false });
        // Update state to trigger re-render with new name
        dispatch(updateUserData({ name: data.newName }));
      }
    } catch (error) {
      console.log("Name Updation Error: ", error);
      toast.error("Failed to update name");
    } finally {
      setIsLoading((prev) => ({ ...prev, name: false }));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setRedirecting(true);
      await manageCartService.deleteFile(userData.prefs.avatar);
      await userService.deleteAccount({
        userID: userData.$id,
      });
      dispatch(logout());
      destroyCookie(null, 'traditionalUSer', {
        path: '/',  
      });
      router.replace("/");
    } catch (error) {
      console.log("Account Deletion Error: ", error);
      toast.error("Failed to delete account");
    }
  };

  const handleLogoutDevice = async () => {
    if (isTraditionalUser) {
      setRedirecting(true);
      try {
        const logout = await authService.deleteSession();
        if (logout) {
          dispatch(logout());
          destroyCookie(null, 'traditionalUSer', {
            path: '/',  
          });
          router.replace("/");
        }
      } catch (error) {
        console.log("Logout Error: ", error);
        toast.error("Failed to log out");
      }
    } else {
      setRedirecting(true);
      signOut();
      dispatch(logout());
      router.replace("/");
    }
  };

  if (redirecting) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900  p-8">
      <ToastContainer />
      <LogoBar />
      <VerticalNavbar />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 dark:text-gray-100">
          Account
        </h2>

        {/* Profile Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold dark:text-gray-100">Profile</h3>
          <div className="flex items-center mt-4">
            {userData.prefs || userData.image ? (
              userData.prefs ? (
                <Image
                  src={
                    manageCartService.getFilePreview(userData.prefs.avatar)
                      ?.href
                  }
                  alt="avatar"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={userData.image}
                  alt="avatar"
                  height={60}
                  width={60}
                  className="rounded-full"
                />
              )
            ) : (
              getInitials(userData?.userName || userData?.name)
            )}
            <div className="ml-4">
              <h4 className="font-bold text-lg dark:text-gray-100">
                {userData.userName || userData.name}
              </h4>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>

            {isTraditionalUser ? (
              <button
                onClick={() =>
                  setIsFormOpen({ ...isFormOpen, name: !isFormOpen.name })
                }
                className="text-blue-500 ml-4 hover:underline"
              >
                + Update Name
              </button>
            ) : (
              <span className="ml-4 text-gray-500 dark:text-gray-400 cursor-not-allowed">
                <FaLock className="mr-2" />
              </span>
            )}
          </div>

          {isFormOpen.name && (
            <form
              onSubmit={handleSubmit(handleUpdateName)}
              className="mt-4 flex flex-col gap-4"
            >
              <input
                type="text"
                {...register("newName")}
                placeholder="New Name"
                className="block w-full p-2 mb-4 border rounded"
              />
              <button
                type="submit"
                className={`${
                  isSubmitting || isLoading.name
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isSubmitting || isLoading.name}
              >
                {isLoading.name ? "Updating..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Email Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold dark:text-gray-100">
            Email address
          </h3>
          <div className="mt-4 dark:text-gray-100">
            <p>
              {userData.email}{" "}
              <span className="text-sm text-gray-500">(Primary)</span>
            </p>
            {isTraditionalUser ? (
              <button
                onClick={() =>
                  setIsFormOpen({ ...isFormOpen, email: !isFormOpen.email })
                }
                className="text-blue-500 hover:underline mt-2"
              >
                + Update Email
              </button>
            ) : (
              <p className="text-gray-500 mt-2 flex items-center">
                <FaLock className="mr-2" /> Locked
              </p>
            )}
          </div>
          {isFormOpen.email && (
            <form
              onSubmit={handleSubmit(handleUpdateEmail)}
              className="mt-4 flex flex-col gap-4"
            >
              <input
                type="email"
                {...register("newEmail")}
                placeholder="New Email"
                className="block w-full p-2 mb-4 border rounded"
              />
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="block w-full p-2 mb-4 border rounded"
                />
                <span
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className={`${
                  isSubmitting || isLoading.email
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isSubmitting || isLoading.email}
              >
                {isLoading.email ? "Updating..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Password Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold dark:text-gray-100">Password</h3>
          {isTraditionalUser ? (
            <button
              onClick={() =>
                setIsFormOpen({ ...isFormOpen, password: !isFormOpen.password })
              }
              className="text-blue-500 hover:underline mt-2"
            >
              + Update Password
            </button>
          ) : (
            <p className="text-gray-500 mt-2 flex items-center">
              <FaLock className="mr-2" /> Locked
            </p>
          )}
          {isFormOpen.password && (
            <form
              onSubmit={handleSubmit(handleUpdatePassword)}
              className="mt-4 flex flex-col gap-4"
            >
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? "text" : "password"}
                  {...register("oldPassword")}
                  placeholder="Old Password"
                  className="block w-full p-2 mb-4 border rounded"
                />
                <span
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      oldPassword: !showPassword.oldPassword,
                    })
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword.oldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="New Password"
                  className="block w-full p-2 mb-4 border rounded"
                />
                <span
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className={`${
                  isSubmitting || isLoading.password
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isSubmitting || isLoading.password}
              >
                {isLoading.password ? "Updating..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Avatar Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold dark:text-gray-100">Avatar</h3>
          {isTraditionalUser ? (
            <button
              onClick={() =>
                setIsFormOpen({ ...isFormOpen, avatar: !isFormOpen.avatar })
              }
              className="text-blue-500 hover:underline mt-2"
            >
              + Update Avatar
            </button>
          ) : (
            <p className="text-gray-500 mt-2 flex items-center">
              <FaLock className="mr-2" /> Locked
            </p>
          )}
          {isFormOpen.avatar && (
            <form
              onSubmit={handleSubmit(handleUpdateAvatar)}
              className="mt-4 flex flex-col gap-4"
            >
              <input
                type="file"
                {...register("avatar")}
                className="block w-full p-2 mb-4 border rounded"
              />
              <button
                type="submit"
                className={`${
                  isSubmitting || isLoading.avatar
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={isSubmitting || isLoading.avatar}
              >
                {isLoading.avatar ? "Updating..." : "Submit"}
              </button>
            </form>
          )}
        </div>

        {/* Active Devices */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold dark:text-gray-100">
            Active devices
          </h3>
          <div className="mt-4">
            {userInfo.devices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"
              >
                <div>
                  <p className="font-bold dark:text-gray-100">{device.name}</p>
                  <p className="text-sm text-gray-500">{device.os}</p>
                  <p className="text-sm text-gray-500">IP: {device.ip}</p>
                  <p className="text-sm text-gray-500">{device.location}</p>
                  <p className="text-sm text-gray-500">{device.lastActive}</p>
                </div>
                <button
                  onClick={() => handleLogoutDevice(device)}
                  className="text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-red-500">Danger</h3>
          <button
            onClick={
              isTraditionalUser ? handleDeleteAccount : handleLogoutDevice
            }
            className="text-red-500 mt-2 hover:underline"
          >
            DELETE ACCOUNT
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Delete your account and all its associated data.
          </p>
        </div>
      </div>
    </div>
  );
};

const getInitials = (name) => {
  const nameArray = name.split(" ");
  const initials = nameArray.map((n) => n[0]).join("");
  return (
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white">
      {initials}
    </div>
  );
};

export default ManageAccount;
