import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Hotel } from "../../types/hotel.types";
import { useAppSelector } from "../../hooks/useAppSelector";

import { FaBed } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { CiCamera } from "react-icons/ci";
import { BiShapeSquare } from "react-icons/bi";

interface HotelAboutProps {
  hotel?: Hotel;
}

const HotelAbout: React.FC<HotelAboutProps> = ({ hotel: propHotel }) => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const { currentHotel, reviews } = useAppSelector((state) => state.hotel);

  const hotel = propHotel || currentHotel;

  const handleAddPhoto = () => {
    alert("Add photo feature coming soon...");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* القسم الأول: Rating - Bathtub - Phone */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <FaBed className="w-5 h-5 text-yellow-500" />
          <span className="text-gray-700">
            { "3 beds"} 
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <GiBathtub className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700">
            { "2 baths"}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <BiShapeSquare className="w-5 h-5 text-blue-500" />
          <span className="text-gray-700">
            {"1,848 Sqrt"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Gallery (200)
        </h2>
        <button
          onClick={handleAddPhoto}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          <CiCamera className="h-5 w-5" />
      <span>  Add Photo </span> 
        </button>
      </div>

      {/* القسم الثالث: About */}
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          About {hotel.name}
        </h3>
        <p className="text-gray-700 mb-4">{hotel.about}</p>
      </div>
    </div>
  );
};

export default HotelAbout;
