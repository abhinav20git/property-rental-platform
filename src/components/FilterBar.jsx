"use client";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const FilterBar = ({ onFilterChange, availableProperties }) => {
  const Amenities = [
    "WiFi", "Free Parking", "Pet Friendly", "Breakfast Included",
    "Washer/Dryer", "Kitchen", "BBQ Grill", "Air Conditioning",
    "Fireplace", "Gym",
  ];

  const Cities = [
    "Goa, India", "Mumbai, India", "Bangalore, India", "Manali, India",
    "New Delhi, India", "Ooty, India", "Coorg, India", "Nainital, India",
    "Pune, India", "Jaipur, India",
  ];

  const Bedrooms = [1, 2, 3, 4, 5];

  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isAmenityOpen, setIsAmenityOpen] = useState(false);
  const [isBedroomOpen, setIsBedroomOpen] = useState(false);

  const handleCityChange = (city) => {
    const newSelectedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newSelectedCities);
    onFilterChange({
      cities: newSelectedCities,
      amenities: selectedAmenities,
      bedrooms: selectedBedrooms,
      priceRange,
    });
  };

  const handleAmenityChange = (amenity) => {
    const newSelectedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(newSelectedAmenities);
    onFilterChange({
      cities: selectedCities,
      amenities: newSelectedAmenities,
      bedrooms: selectedBedrooms,
      priceRange,
    });
  };

  const handleBedroomChange = (bedroom) => {
    const newSelectedBedrooms = selectedBedrooms.includes(bedroom)
      ? selectedBedrooms.filter((b) => b !== bedroom)
      : [...selectedBedrooms, bedroom];
    setSelectedBedrooms(newSelectedBedrooms);
    onFilterChange({
      cities: selectedCities,
      amenities: selectedAmenities,
      bedrooms: newSelectedBedrooms,
      priceRange,
    });
  };

  const handlePriceChange = (event) => {
    const value = Math.min(Math.max(parseInt(event.target.value), 0), 1200);
    const newPriceRange = [0, value];
    setPriceRange(newPriceRange);
    onFilterChange({
      cities: selectedCities,
      amenities: selectedAmenities,
      bedrooms: selectedBedrooms,
      priceRange: newPriceRange,
    });
  };

  return (
    <div className="bg-blue-300 text-black dark-text-white dark:bg-slate-700 my-6 mx-4 p-4 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-4">
      {/* City Filter */}
      <div className="relative">
        <button
          onClick={() => setIsCityOpen(!isCityOpen)}
          className="text-l dark:text-white"
        >
          Cities
        </button>
        {isCityOpen && (
          <div className="absolute z-10 w-48 max-h-60 overflow-y-auto p-2 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            {Cities.map((city) => (
              <div key={city} className="flex items-center">
                <input
                  type="checkbox"
                  value={city}
                  onChange={() => handleCityChange(city)}
                  checked={selectedCities.includes(city)}
                />
                <span className="ml-2 dark:text-white">{city}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Amenity Filter */}
      <div className="relative">
        <button
          onClick={() => setIsAmenityOpen(!isAmenityOpen)}
          className="text-l dark:text-white"
        >
          Amenities
        </button>
        {isAmenityOpen && (
          <div className="absolute z-10 w-48 max-h-60 overflow-y-auto p-2 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            {Amenities.map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  value={amenity}
                  onChange={() => handleAmenityChange(amenity)}
                  checked={selectedAmenities.includes(amenity)}
                />
                <span className="ml-2 dark:text-white">{amenity}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bedroom Filter */}
      <div className="relative">
        <button
          onClick={() => setIsBedroomOpen(!isBedroomOpen)}
          className="text-l dark:text-white"
        >
          Bedrooms
        </button>
        {isBedroomOpen && (
          <div className="absolute z-10 w-48 max-h-60 overflow-y-auto p-2 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            {Bedrooms.map((bedroom) => (
              <div key={bedroom} className="flex items-center">
                <input
                  type="checkbox"
                  value={bedroom}
                  onChange={() => handleBedroomChange(bedroom)}
                  checked={selectedBedrooms.includes(bedroom)}
                />
                <span className="ml-2 dark:text-white">
                  {bedroom} bedrooms
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2 items-center">
        <label className="text-l dark:text-white">Price Range:</label>
        <input
          type="range"
          min="0"
          max="1200"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="slider"
        />
        <div className="flex items-center justify-center">
          <span className="text-sm dark:text-white">{priceRange[0]}</span>
          <span> --- </span>
          <span className="text-sm dark:text-white">{priceRange[1]}$</span>
        </div>
      </div>

      {/* Houses Available */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
          {availableProperties} houses available
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
