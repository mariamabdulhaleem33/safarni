import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import HotelAbout from "../../components/hotel/HotelAbout";
import HotelGallery from "../../components/hotel/HotelGallery";
import HotelReviews from "../../components/hotel/HotelReviews";

const HotelAboutPage: React.FC = () => {
  const { hotelId, tab = "about" } = useParams<{ hotelId: string; tab?: string }>();
  const navigate = useNavigate();

  const activeTab = tab;

  const hotelData = {
    id: hotelId || "1",
    name: "Harbor Haven Hideaway",
    location: "New York / USA",
    rating: 4.8,
    about: `Experience the ultimate luxury at Harbor Haven Hideaway...`,
    phone: "+123 456 7890",
    amenities: [
      "Free WiFi",
      "Swimming Pool",
      "Spa & Wellness",
      "Restaurant",
      "Fitness Center",
      "Free Parking",
      "24/7 Room Service",
      "Concierge Service",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
      "https://images.unsplash.com/photo-1564501049418-3c27787d01e8",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    ],
    pricePerNight: 299,
    discountPercentage: 20,
    nights: 3,
    taxesAndFees: 45,
  };

  const reviewsData = [
    {
      id: 1,
      userId: "user_001",
      userName: "John Doe",
      title: "Amazing Experience!",
      comment: "The hotel exceeded all my expectations. The service was impeccable!",
      rating: 5,
      date: "2024-01-15",
      helpful: 24,
    },
    {
      id: 2,
      userId: "user_002",
      userName: "Jane Smith",
      title: "Great Location",
      comment: "Perfect location with beautiful views. Will definitely come back!",
      rating: 4,
      date: "2024-01-10",
      helpful: 18,
    },
    {
      id: 3,
      userId: "user_003",
      userName: "Mike Johnson",
      title: "Luxurious Stay",
      comment: "The rooms were spacious and clean. The staff was very helpful.",
      rating: 5,
      date: "2024-01-05",
      helpful: 12,
    },
  ];

  const handleBookNow = () => {
    alert(`Booking ${hotelData.name}...`);
  };

  const calculateTotalPrice = () => {
    const basePrice = hotelData.pricePerNight * hotelData.nights;
    const discountAmount = (basePrice * hotelData.discountPercentage) / 100;
    const discountedPrice = basePrice - discountAmount;
    const totalPrice = discountedPrice + hotelData.taxesAndFees;

    return {
      basePrice,
      discountAmount,
      discountedPrice,
      totalPrice,
    };
  };

  const prices = calculateTotalPrice();

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <HotelAbout hotel={hotelData} />;
      case "gallery":
        return <HotelGallery images={hotelData.gallery} galleryCount={200} />;
      case "reviews":
        return <HotelReviews reviews={reviewsData} />;
      default:
        return <HotelAbout hotel={hotelData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-10 h-10 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
              title="Back"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[608px] h-[400px] lg:h-[1024px] flex-shrink-0 lg:ml-[100px]">
            <div className="h-full overflow-hidden rounded-xl lg:rounded-none">
              <img
                src={hotelData.gallery[0]}
                alt={hotelData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 px-4 lg:px-16 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 gap-4">
              <div className="bg-blue-100 text-blue-600 rounded-[20px] font-bold flex items-center justify-center text-sm w-[110px] h-[37px] px-3 py-2 whitespace-nowrap leading-none">
                20% OFF
              </div>

              <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                <FaStar className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-600 font-bold text-lg mr-2">
                  {hotelData.rating.toFixed(1)}
                </span>
                <div className="text-gray-600">(356 reviews)</div>
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {hotelData.name}
              </h1>
              <p className="text-lg lg:text-xl text-gray-600">
                {hotelData.location}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center space-x-4 lg:space-x-50 border-b border-gray-200 pb-2 overflow-x-auto">
                {[
                  { key: "about", label: "About" },
                  { key: "gallery", label: "Gallery" },
                  { key: "reviews", label: "Review" },
                ].map((tabItem) => (
                  <Link
                    key={tabItem.key}
                    to={`/hotel/${hotelId}/${tabItem.key}`}
                    className={`font-medium text-base lg:text-lg transition-colors relative pb-2 whitespace-nowrap ${
                      activeTab === tabItem.key
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tabItem.label}
                    {tabItem.key === "gallery" && (
                      <span className="ml-2 text-sm text-gray-500">(200)</span>
                    )}
                    {activeTab === tabItem.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 -mb-2" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {renderContent()}

              <div className="flex flex-col items-center">
                <div className="w-full max-w-[512px] mb-6">
                  <h4 className="text-gray-900 font-poppins font-normal text-[20px] lg:text-[24px] ">
                    Total Price :
                    <span className="ml-2 font-semibold text-[22px] lg:text-[26px]">
                      ${prices.totalPrice.toFixed(2)}/night
                    </span>
                  </h4>
                </div>

                <div className="w-full max-w-[518px]">
                  <button
                    onClick={handleBookNow}
                    className="w-full h-[56px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelAboutPage;
