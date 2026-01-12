// src/pages/HotelAboutPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import HotelAbout from "../../components/hotel/HotelAbout";
import HotelGallery from "../../components/hotel/HotelGallery";
import HotelReviews from "../../components/hotel/HotelReviews";
import CheckInOutContent from "../../components/hotel/CheckInOutForm";
import { hotelApi } from "../../services/hotelApi";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  setCurrentHotel,
  setLoading,
  setError,
  setReviews,
  clearHotelData,
} from "../../store/slices/hotelSlice";
import {
  addHotelReview,
  markReviewAsHelpful,
  uploadHotelPhoto,
} from "@/store/slices/hotelActions";

const HotelAboutPage: React.FC = () => {
  const { hotelId, tab = "about" } = useParams<{
    hotelId: string;
    tab?: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    currentHotel: hotel,
    reviews: reviewsData,
    loading: loadingHotel,
  } = useAppSelector((state) => state.hotel);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const activeTab = tab;
  const hotelFromState = location.state?.hotelData;

  useEffect(() => {
    return () => {
      dispatch(clearHotelData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!hotelId) {
      dispatch(setError("Hotel ID is required"));
      return;
    }

    if (hotel && hotel.id?.toString() === hotelId?.toString()) {
      return;
    }
    
    if (hotelFromState) {
      initializeHotelData(hotelFromState);
    } else {
      fetchHotelData();
    }
  }, [hotelId, hotelFromState, hotel, dispatch]);

  const initializeHotelData = (hotelData: any) => {
    dispatch(setLoading(true));

    try {
      if (!hotelData || typeof hotelData !== "object") {
        throw new Error("Invalid hotel data format");
      }

      const formattedHotel = {
        id: Number(hotelData.id || hotelId || 0),
        name: hotelData.name || `Hotel ${hotelId || "Unknown"}`,
        location: hotelData.location || "Location not available",
        rating: parseFloat(hotelData.rating) || 4.5,
        about:
          hotelData.description ||
          hotelData.content_info ||
          hotelData.about ||
          `Welcome to ${
            hotelData.name || `Hotel ${hotelId}`
          }. This is a luxurious hotel offering premium amenities and exceptional service.`,
        phone: hotelData.phone || "+123 456 7890",
        amenities: Array.isArray(hotelData.amenities) ? hotelData.amenities : [
          "Free WiFi",
          "Swimming Pool",
          "Spa & Wellness",
          "Restaurant",
          "Fitness Center",
          "Room Service",
          "Concierge",
          "Parking"
        ],
        gallery: Array.isArray(hotelData.gallery) ? hotelData.gallery : (hotelData.image ? [hotelData.image] : [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
          'https://images.unsplash.com/photo-1564501049418-3c27787d01e8'
        ]),
        pricePerNight: hotelData.pricePerNight || 0,
        discountPercentage: hotelData.discountPercentage || 0,
        nights: hotelData.nights || 1,
        taxesAndFees: hotelData.taxesAndFees || 0,
        rooms: Array.isArray(hotelData.rooms) ? hotelData.rooms : [],
        image: hotelData.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        content_info: hotelData.content_info || hotelData.about || hotelData.description || '',
        distance: hotelData.distance || "1.2 km from city center",
      };

      dispatch(setCurrentHotel(formattedHotel));
      
      // Initialize reviews after hotel data is set
      const defaultReviews = [
        {
          id: 1,
          userId: "user_001",
          userName: "John Doe",
          title: "Amazing Experience!",
          comment: `The ${formattedHotel.name} exceeded all my expectations. The service was impeccable!`,
          rating: 5,
          date: "2024-01-15",
          helpful: 42,
        },
        {
          id: 2,
          userId: "user_002",
          userName: "Jane Smith",
          title: "Great Location",
          comment: `Perfect location with beautiful views. ${formattedHotel.name} was wonderful!`,
          rating: 4,
          date: "2024-01-10",
          helpful: 25,
        },
        {
          id: 3,
          userId: "user_003",
          userName: "Mike Johnson",
          title: "Excellent Service",
          comment: `The staff at ${formattedHotel.name} were very helpful and friendly.`,
          rating: 5,
          date: "2024-01-05",
          helpful: 18,
        },
      ];
      
      dispatch(setReviews(defaultReviews));
      dispatch(setError(null));
    } catch (error: any) {
      console.error("Error initializing hotel data:", error);
      dispatch(setError("Failed to load hotel data"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchHotelData = async () => {
    if (!hotelId) return;

    dispatch(setLoading(true));

    try {
      const hotelResponse = await hotelApi.getHotelById(hotelId);
      const hotelData = hotelResponse.data;
      
      initializeHotelData(hotelData);
      
    } catch (error: any) {
      console.error("Error in fetchHotelData:", error);
      dispatch(setError("Failed to load hotel data from server"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBookNow = () => {
    setShowBooking(true);
  };

  const calculateTotalPrice = () => {
    if (!hotel) return { totalPrice: 0 };

    const basePrice = (hotel.pricePerNight || 0) * (hotel.nights || 1);
    const discountAmount = (basePrice * (hotel.discountPercentage || 0)) / 100;
    const discountedPrice = basePrice - discountAmount;
    const totalPrice = discountedPrice + (hotel.taxesAndFees || 0);

    return {
      basePrice,
      discountAmount,
      discountedPrice,
      totalPrice,
    };
  };

  const handleAddReview = async (reviewData: any) => {
    try {
      await dispatch(addHotelReview(reviewData));
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleHelpful = async (reviewId: number) => {
    const review = reviewsData.find((r) => r.id === reviewId);
    if (review) {
      await dispatch(markReviewAsHelpful(reviewId, review.helpful));
    }
  };

  const handleAddPhoto = async (photo: File) => {
    try {
      await dispatch(uploadHotelPhoto(photo));
      alert("Photo added successfully!");
    } catch (error) {
      alert("Failed to add photo. Please try again.");
    }
  };

  const prices = calculateTotalPrice();

  const renderContent = () => {
    if (showBooking && hotel) {
      return (
        <CheckInOutContent hotel={hotel} onBack={() => setShowBooking(false)} />
      );
    }

    if (loadingHotel) {
      return (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
          </div>
        </div>
      );
    }

    if (!hotel) {
      return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-500">Hotel data not available</p>
          <button
            onClick={() => navigate("/hotel")}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Back to Hotels List
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case "about":
        return <HotelAbout onAddPhoto={handleAddPhoto} />;
      case "gallery":
        return <HotelGallery onAddPhoto={handleAddPhoto} />;
      case "reviews":
        return (
          <HotelReviews
            onReviewFormToggle={setShowReviewForm}
            onAddReview={handleAddReview}
            onHelpful={handleHelpful}
          />
        );
      default:
        return <HotelAbout onAddPhoto={handleAddPhoto} />;
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
              {hotel ? (
                <img
                  src={
                    hotel.gallery?.[0] ||
                    hotel.image ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  }
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              )}
            </div>
          </div>

          <div className="flex-1 px-4 lg:px-16 py-8">
            {hotel ? (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-6 gap-4">
                  {(hotel.discountPercentage || 0) > 0 && (
                    <div className="bg-blue-100 text-blue-600 rounded-[20px] font-bold flex items-center justify-center text-sm w-[110px] h-[37px] px-3 py-2 whitespace-nowrap leading-none">
                      {hotel.discountPercentage}% OFF
                    </div>
                  )}

                  <div className="flex items-center bg-white px-4 py-2 rounded-lg">
                    <FaStar className="w-5 h-5 text-yellow-500 mr-2" />
                    <span className="text-gray-600 font-bold text-lg mr-2">
                      {typeof hotel.rating === 'number' ? hotel.rating.toFixed(1) : 
                       !isNaN(parseFloat(hotel.rating)) ? parseFloat(hotel.rating).toFixed(1) : 
                      '4.5'}
                    </span>
                    <div className="text-gray-600">({reviewsData.length} reviews)</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {hotel.name}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-600">
                    {hotel.location}
                  </p>
                </div>
              </>
            ) : (
              <div className="animate-pulse mb-8">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            )}

            {!showBooking && (
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
                        <span className="ml-2 text-sm text-gray-500">
                          ({hotel?.gallery?.length || 0})
                        </span>
                      )}
                      {activeTab === tabItem.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 -mb-2" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {showBooking && (
              <div className="mb-8">
                <button
                  onClick={() => setShowBooking(false)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                >
                  <FiArrowLeft className="w-5 h-5" />
                  <span>Back to Hotel Details</span>
                </button>
              </div>
            )}

            <div className="space-y-8">
              {renderContent()}

              {!showBooking && activeTab !== "reviews" && hotel && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[512px] mb-6">
                    <h4 className="text-gray-900 font-poppins font-normal text-[20px] lg:text-[24px]">
                      Total Price :
                      <span className="ml-2 font-semibold text-[22px] lg:text-[26px]">
                        ${prices.totalPrice.toFixed(2)}/night
                      </span>
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                      {hotel.nights || 1} nights • ${hotel.pricePerNight || 0}
                      /night
                      {(hotel.discountPercentage || 0) > 0 && (
                        <span className="text-green-600 ml-2">
                          • {hotel.discountPercentage}% discount applied
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="w-full max-w-[518px]">
                    <button
                      onClick={handleBookNow}
                      className="w-full h-[56px] bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelAboutPage;
