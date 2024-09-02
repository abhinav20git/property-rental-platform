"use client";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/Redux/store";
import Loading from "./loading";
import { SessionProvider, useSession } from "next-auth/react";
import { login } from "@/Redux/slices/authSlice";
import { setCart } from "@/Redux/slices/cartSlice";
import authService from "@/appwrite/authService";
import manageCartService from "@/appwrite/manageCartService";

const AppContent = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession(); // status can be "loading", "authenticated", or "unauthenticated"

  useEffect(() => {
    const fetchData = async () => {
      try {
        let user = null;
        let userCart = null;

        // Fetch user data from Appwrite (email/password authentication)
        user = await authService.getCurrentUser();

        if (user) {
          dispatch(login(user));
          const carts = await manageCartService.getCart();
          userCart = carts.documents.find((cart) => cart.userID === user.$id);
        }

        // If user is not found, check if there's an OAuth session
        if (!user && session && status === "authenticated") {
          user = session.user;
          dispatch(login(user));
          const carts = await manageCartService.getCart();
          userCart = carts.documents.find((cart) => cart.userID === user.email);
          dispatch(setCart(userCart));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status !== "loading") {
      fetchData();
    }
  }, [dispatch, session, status]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

const AppProvider = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AppContent>{children}</AppContent>
      </Provider>
    </SessionProvider>
  );
};

export default AppProvider;