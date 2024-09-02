"use client";

import Image from "next/image";
import React,{useState} from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem, setCart } from "@/Redux/slices/cartSlice";
import manageCartService from "@/appwrite/manageCartService";
import { ID } from "appwrite";
import { Popup } from "@/components/index";
import { useRouter } from "next/navigation";

function PropertyCard({ property }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const cartData = useSelector((state) => state.cart.cart);
  // console.log(userData,cartData)
  const [showPopup, setShowPopup] = useState(false);

  const {
    id,
    title,
    description,
    price,
    location,
    bedrooms,
    amenities,
    images,
    rating,
  } = property;

  const openPropertyPage = (id)=>{
    // console.log("open property page clicked")
    router.push(`/property/${id}`)
}

const handleAddToCart = async () => {
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
        }
      }
    } else {
      setShowPopup(true);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};


  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
         {description}
        </CardItem>
        <div onClick={()=>openPropertyPage(id)} ><CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={images[0]}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem></div>
        <div className=" mt-10 pl-4"><CardItem
          translateZ="50"
          className="text-l font-bold text-neutral-600 dark:text-white"
        >
          {price} $
        </CardItem>
      </div>
        <div className="flex justify-between items-center mt-5">
          <CardItem
            translateZ={20}
            as={Link}
            href={`https://www.google.com/maps/place/${location}`}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal text-slate-900 dark:text-white"
          >
            {location} →
          </CardItem>
          <div onClick={() => handleAddToCart(property)}><CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Add to Cart
          </CardItem>
          <div className="Relative z-auto">{showPopup && <Popup color="purple" message="Account is required to book a property" onClose={() => setShowPopup(false)} />}</div>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default PropertyCard;
