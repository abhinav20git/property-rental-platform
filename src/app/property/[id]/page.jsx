"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import properties from "@/api/properties";
import { LogoBar, VerticalNavbar } from '@/components/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState(null);
  const router = useRouter()
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const cartData = useSelector((state) => state.cart.cart);

  useEffect(() => {
    const id = params?.id;
    if (id) {
      const foundProperty = properties.find((item) => item.id === Number(id));
      setProperty(foundProperty);
      toast.info(`Viewing property: ${foundProperty.title}`, {
        autoClose: 5000,
      });
    }
  }, [params]);

  const handleBookNow = async () => {
    try {
      if (userData) {
        if (cartData && cartData.userID) {
          const carts = await manageCartService.getCart();
          const userCart = carts.documents.find(cart => cart.userID === userData?.$id || userData?.email);
          const updatedCartItem = [...userCart.cartItem, JSON.stringify(property)];
          await manageCartService.updateCart({
            slug: userCart.$id,
            cartItem: updatedCartItem,
          });
          dispatch(addCartItem(JSON.stringify(property)));
          toast.success("Item added to Cart")
        } else {
          const newCart = {
            slug: ID.unique(),
            userID: userData?.$id || userData?.email,
            userName: userData.name,
            cartItem: [JSON.stringify(property)],
            bookedItems: [],
          };
          const createdCart = await manageCartService.createCart(newCart);
          if (createdCart) {
            dispatch(setCart(createdCart));
            toast.success("Your Carted is Created with your 1st Item")
          }
        }
      } else {
        toast.error("Account is required to Book Property")
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Property Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto">
      <ToastContainer />
        <LogoBar />
        <VerticalNavbar />
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <div className="flex flex-col space-y-4">
              <Image 
                src={property.images[0]} 
                height={500} 
                width={800} 
                alt="thumbnail" 
                className="rounded-md shadow-lg w-full h-auto"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                {property.images.map((img, index) => (
                  <Image 
                    key={index}
                    src={img} 
                    height={200} 
                    width={300} 
                    alt={`thumbnail-${index}`} 
                    className="rounded-md shadow-lg w-full h-auto"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 mt-4 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg">
              <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{property.description}</p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Rating: {property.rating}</p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Price: ₹ {property.price}</p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Location: {property.location}</p>
              <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Bedrooms: {property.bedrooms}</p>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{amenity}</li>
                  ))}
                </ul>
              </div>
              <button onClick={handleBookNow} className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition duration-200">Book Now</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default PropertyPage;
