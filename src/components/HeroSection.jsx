"use client";
import { useEffect, useState } from 'react';
import Images from '@/api/images';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  const [images, setImages] = useState(Images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-[100vh] bg-gray-900 dark:bg-gray-800">
      {images.length > 0 && (
        <div className="w-full h-full overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image src={image} alt={`Slide ${index}`} fill style={{ objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-50 dark:bg-opacity-60 backdrop-blur-md p-6 sm:p-8 rounded-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Welcome to Next Door: Book Your Suite Home</h1>
          <Link href="/explore">
            <div className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
              Explore More →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
