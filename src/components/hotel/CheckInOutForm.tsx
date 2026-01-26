// src/components/hotel/CheckInOutForm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { createHotelBooking } from "@/store/slices/hotelActions";
import BookingSuccess from "./BookingSuccess";
import { type Hotel } from "../../services/hotelApi";

interface CheckInOutContentProps {
  hotel: Hotel
  onBack: () => void;
}

const CheckInOutForm: React.FC<CheckInOutContentProps> = ({ hotel, onBack }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookingLoading, bookingError } = useAppSelector((state) => state.hotel);
  
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [comment, setComment] = useState("");
  const [availableCheckInDates, setAvailableCheckInDates] = useState<string[]>([]);
  const [availableCheckOutDates, setAvailableCheckOutDates] = useState<string[]>([]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [apiStatus, setApiStatus] = useState<string>("");
  // const [showApiDebug, setShowApiDebug] = useState(false);

  useEffect(() => {
    const today = new Date();
    const checkInDates = [];
    
    for (let i = 1; i <= 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      checkInDates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableCheckInDates(checkInDates);
    
    const checkOutDates = [];
    for (let i = 2; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      checkOutDates.push(date.toISOString().split('T')[0]);
    }
    
    setAvailableCheckOutDates(checkOutDates);
    
    if (checkInDates.length > 0) {
      setCheckIn(checkInDates[0]);
    }
    if (checkOutDates.length > 0) {
      setCheckOut(checkOutDates[0]);
    }
  }, []);

  // const checkAvailableAPIs = async () => {
  //   setApiStatus("Checking available APIs...");
  //   try {
  //     const results = await hotelApi.checkBookingAPIs();
  //     setApiStatus(`Available APIs: ${results.filter(r => r.exists).map(r => r.endpoint).join(', ') || 'None found'}`);
  //     setShowApiDebug(true);
  //   } catch (error) {
  //     setApiStatus(`Error checking APIs`);
  //   }
  // };

  const calculateTotalPrice = () => {
    const basePrice = hotel.pricePerNight * hotel.nights;
    const discountAmount = (basePrice * hotel.discountPercentage) / 100;
    const discountedPrice = basePrice - discountAmount;
    const totalPrice = discountedPrice + hotel.taxesAndFees;

    return totalPrice;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const totalPrice = calculateTotalPrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  const handleBookingSubmit = async (data: { adults: number; children: number; infants: number }) => {
    setApiStatus("Processing booking...");
    
    try {
      const roomId = typeof hotel.rooms?.[0]?.id === 'string' 
        ? parseInt(hotel.rooms?.[0]?.id) 
        : hotel.rooms?.[0]?.id || 1;
        
      const bookingData = {
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut,
        adults: data.adults,
        children: data.children,
        infants: data.infants,
        comment: comment.trim() || undefined
      };
      
      const response = await dispatch(createHotelBooking(bookingData));
      
      // استخراج booking ID من الرد
      const bookingId = response?.data?.id || response?.data?.booking_id || Date.now();
      
      // عرض رسالة النجاح
      alert(`✅ Booking ${response?.status === "success" ? "Successful" : "Simulated"}!\nBooking ID: ${bookingId}\nTotal amount: $${totalPrice.toFixed(2)}\nStatus: ${response?.data?.booking_status || "pending"}`);
      
      // التوجيه إلى صفحة الدفع
      navigate(`/payment/${bookingId}`);
      
    } catch (error: any) {
      console.error('Booking failed:', error);
      setApiStatus(`❌ Fatal Error: ${error.message}`);
      alert(`❌ Booking failed: ${error.message || 'Please try again.'}`);
    }
  };

  if (isBookingConfirmed) {
    return (
      <div className="flex justify-center items-center">
        <BookingSuccess
          hotelName={hotel.name}
          onBack={() => {
            setIsBookingConfirmed(false);
            onBack();
          }}
          onSubmit={handleBookingSubmit}
          isLoading={bookingLoading}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div 
        className="mb-6 p-4 rounded-lg"
        style={{
          background: "white",
          fontFamily: "Poppins",
          fontWeight: 500,
          fontStyle: "normal",
          fontSize: "25px",
          lineHeight: "136%",
          letterSpacing: "0%",
          textAlign: "center",
          color: "var(--700, #1E429F)"
        }}
      >
        Book Hotel
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Check-in Date *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableCheckInDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setCheckIn(date)}
                className={`p-3 rounded-full border transition-all duration-200 ${
                  checkIn === date 
                    ? 'bg-blue-600 text-white font-medium ring-2 ring-blue-100' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <div className="text-sm font-semibold">{formatDate(date)}</div>
                <div className={`text-xs mt-1 ${
                  checkIn === date ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
              </button>
            ))}
          </div>
          <input
            type="hidden"
            value={checkIn}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Check-out Date *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableCheckOutDates.map((date) => (
              <button
                key={date}
                type="button"
                onClick={() => setCheckOut(date)}
                className={`p-3 rounded-full border transition-all duration-200 ${
                  checkOut === date 
                    ? 'bg-blue-600 text-white font-medium ring-2 ring-blue-100' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <div className="text-sm font-semibold">{formatDate(date)}</div>
                <div className={`text-xs mt-1 ${
                  checkOut === date ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </div>
              </button>
            ))}
          </div>
          <input
            type="hidden"
            value={checkOut}
            required
          />
        </div>    
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add detailed review
          </label>
        </div>

        <div className="mb-6">
          <textarea
            name="comment"
            placeholder="Enter your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">{checkIn ? new Date(checkIn).toLocaleDateString() : 'Select date'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">{checkOut ? new Date(checkOut).toLocaleDateString() : 'Select date'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nights:</span>
              <span className="font-medium">{hotel.nights}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-900 font-semibold">Estimated Total:</span>
              <span className="text-blue-600 font-bold">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {apiStatus && (
          <div className={`p-3 rounded-lg ${
            apiStatus.includes('✅') ? 'bg-green-50 border border-green-200' :
            apiStatus.includes('❌') ? 'bg-red-50 border border-red-200' :
            'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`text-sm ${
              apiStatus.includes('✅') ? 'text-green-800' :
              apiStatus.includes('❌') ? 'text-red-800' :
              'text-yellow-800'
            }`}>
              {apiStatus}
            </p>
          </div>
        )}

        {bookingError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{bookingError}</p>
          </div>
        )}

      

        <div className="flex gap-4 pt-4">
        
          <button
            type="submit"
            disabled={bookingLoading}
            className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ${
              bookingLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {bookingLoading ? 'Processing...' : 'Continue to Guests Selection'}
          </button>
        </div>

     
      </form>
    </div>
  );
};

export default CheckInOutForm;