"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCartItem,
  incrementItemQuantity,
  decrementItemQuantity,addBookedItem,
  addCartItem
} from "@/Redux/slices/cartSlice";
import Image from "next/image";
import Script from "next/script";
import envConf from "@/envConf/envConf";
import { LogoBar, VerticalNavbar } from "@/components/index";

const Cart = () => {
  const dispatch = useDispatch();
  const reduxUserData = useSelector((state) => state.auth.userData);
  const reduxCartData = useSelector((state) => state.cart.cart);
  const [cartItem, setCartItem] = useState(reduxCartData?.cartItem || []);
  const [JSONcart, setJSONcart] = useState([]);

  useEffect(() => {
    setCartItem(reduxCartData?.cartItem || []);
  }, [reduxCartData]);

  useEffect(() => {
    const parsedCart = cartItem
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch (error) {
          console.error("Invalid JSON string:", item);
          return null;
        }
      })
      .filter((item) => item !== null);
    setJSONcart(parsedCart);
  }, [cartItem]);

  const totalItems = JSONcart.length;
  const amount = JSONcart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/razorpayPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }), // Pass amount here
      });
      const data = await response.json();
  
      if (response.ok) {
        const options = {
          key: envConf.razorpayKeyID,
          amount: amount * 100, // Use the same amount for Razorpay options
          currency: "INR",
          name: "Next Door : Test Payment",
          description: "Next Door : Test Payment",
          order_id: data.orderId,
          handler: function (response) {
            console.log(response);
          },
          prefill: {
            name: reduxUserData.name || reduxUserData?.userName,
            email: reduxUserData.email,
            contact: "+91 XXXXX XXXXX",
          },
          theme: {
            color: "#3b82f6",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.log("Error creating order:", data.error);
      }
    } catch (error) {
      console.log("payment failed:", error);
    } finally {
      setIsProcessing(false);
      // add Cart Item to booked item and remove from cart
    }
  };
  ;

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementItemQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementItemQuantity(id));
  };



  return (
    <div className="container mx-auto my-10 p-5">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <LogoBar />
      <VerticalNavbar />
      <h2 className="text-3xl font-bold mb-8 text-center text-white dark:text-gray-200">
        Cart Items
      </h2>
      {reduxCartData ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {JSONcart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row items-center p-5 mb-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  height={500}
                  width={500}
                  className="w-full lg:w-24 h-24 rounded-md mb-4 lg:mb-0"
                />
                <div className="lg:ml-5 flex-1 text-center lg:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>
                  <p className="text-lg font-bold text-blue-500">₹ {item.price}</p>
                  <div className="flex items-center justify-center lg:justify-start mt-4">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-0 lg:ml-5 mt-4 lg:mt-0 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 p-5 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-5 text-gray-900 dark:text-gray-100">
              Order Summary
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Total Items: {totalItems}
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Total Amount: ₹ {amount.toFixed(2)}
            </p>
            {reduxUserData ? (
              <>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Full Name: {reduxUserData.name}
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Email: {reduxUserData.email}
                </p>
              </>
            ) : (
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                User data not available
              </p>
            )}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Loading cart data...
        </p>
      )}
    </div>
  );
};

export default Cart;
