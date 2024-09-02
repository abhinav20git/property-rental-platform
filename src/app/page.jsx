"use client";
import { useState } from "react";
import properties from "@/api/properties";
import {
  HeroSection,
  PropertyCard,
  ReviewSection,
  Navbar,
  FilterBar,
  Fotter,
  VerticalNavbar,LogoBar
} from "@/components/index";

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6; // Number of properties to show per page
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleFilterChange = (filters) => {
    // console.log("Filters:", filters);
    const { cities, amenities, bedrooms, priceRange } = filters;
    const newFilteredProperties = properties.filter((property) => {
      const matchesCity =
        cities.length === 0 || cities.includes(property.location);
      const matchesAmenities =
        amenities.length === 0 ||
        amenities.every((amenity) => property.amenities.includes(amenity));
      const matchesBedrooms =
        bedrooms.length === 0 || bedrooms.includes(property.bedrooms);
      const matchesPrice =
        property.price >= priceRange[0] && property.price <= priceRange[1];
      return matchesCity && matchesAmenities && matchesBedrooms && matchesPrice;
    });
    // console.log("Filtered Properties:", newFilteredProperties);
    setFilteredProperties(newFilteredProperties);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <main className="min-h-screen bg-slate-600 dark:bg-black">
      <div className="md:hidden">
        <VerticalNavbar />
        <LogoBar/>
      </div>
      <div className="md:block hidden">
        <Navbar />
      </div>
      <HeroSection />
      <FilterBar
        onFilterChange={handleFilterChange}
        availableProperties={filteredProperties.length}
      />
      <div className="px-4 py-2 min-h-[100vh]">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 min-[1400px]:grid-cols-3 gap-6">
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center py-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2 text-black dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ReviewSection />
      <Fotter />
    </main>
  );
}
