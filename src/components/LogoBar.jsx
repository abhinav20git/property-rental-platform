// components/LogoBar.js
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function LogoBar() {

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-[10vh] w-[100px] bg-transparent p-4 z-40 `}
      >
        <Link href="/">
          <Image
            src="/images/NextDoor.png"
            alt="Logo"
            height={80}
            width={80}
            priority
          />
        </Link>
      </div>
    </>
  );
}
