// src/components/hotel/CheckInOutContent.tsx
import React, { useState, useEffect } from "react";
import BookingSuccess from "./BookingSuccess";

interface CheckInOutContentProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    pricePerNight: number;
    discountPercentage: number;
    nights: number;
    taxesAndFees: number;
  };
  onBack: () => void;
}

const CheckInOutForm: React.FC<CheckInOutContentProps> = ({ hotel, onBack }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [comment, setComment] = useState("");
  const [availableCheckInDates, setAvailableCheckInDates] = useState<string[]>([]);
  const [availableCheckOutDates, setAvailableCheckOutDates] = useState<string[]>([]);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // توليد أقرب المواعيد المتاحة
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

  // دالة handleSubmit للـ BookingSuccess
  const handleBookingSubmit = (data: { adults: number; children: number; infants: number }) => {
    console.log('Booking submitted:', {
      hotel: hotel.name,
      checkIn,
      checkOut,
      totalPrice,
      comment,
      guests: data
    });
    
    // هنا يمكنك إضافة منطق إرسال البيانات للخادم
    // أو الانتقال إلى صفحة تأكيد نهائية
    
    // مؤقتاً، سنعود للخلف بعد الحجز
    onBack();
  };

  // إذا تم تأكيد الحجز، اعرض مكون BookingSuccess
  if (isBookingConfirmed) {
    return (
      <div className="flex justify-center items-center">
        <BookingSuccess
          hotelName={hotel.name}
          onBack={onBack}
          onSubmit={handleBookingSubmit}
        />
      </div>
    );
  }

  // إذا لم يتم تأكيد الحجز بعد، اعرض النموذج العادي
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
        {/* Check-in Dates Section */}
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

        {/* Check-out Dates Section */}
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

        {/* Comment Textarea */}
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

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckInOutForm;