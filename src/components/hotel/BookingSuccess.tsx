// src/components/hotel/BookingSuccess.tsx
import React, { useState } from "react";
import { FiUser, FiUserCheck, FiUserPlus, FiInfo } from "react-icons/fi";

interface BookingSuccessProps {
  hotelName: string;
  onBack: () => void;
  onSubmit: (data: { adults: number; children: number; infants: number }) => Promise<any>;
  isLoading?: boolean;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const handleSubmit = async () => {
    if (adults === 0) {
      alert("At least one adult is required for booking.");
      return;
    }
    
    try {
      const guestData = { adults, children, infants };
      await onSubmit(guestData);
      // سيتم التعامل مع التوجيه في المكون الأب
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  const Counter = ({ 
    label, 
    value, 
    setValue, 
    icon: Icon,
    description,
    min = 0
  }: { 
    label: string; 
    value: number; 
    setValue: (val: number) => void;
    icon: React.ElementType;
    description?: string;
    min?: number;
  }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
      <div className="flex items-center">
        <Icon className="w-6 h-6 text-blue-600 mr-3" />
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setValue(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={value === min || isLoading}
        >
          -
        </button>
        <span className="mx-4 w-8 text-center font-semibold">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="bg-white rounded-xl shadow-lg mx-auto"
      style={{
        width: "604px",
        height: "auto",
        opacity: 1,
        borderRadius: "8px",
        padding: "40px",
        gap: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <div className="w-full mb-8">        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start">
          <FiInfo className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800 text-left">
            Please specify the number of guests. At least one adult (18+) is required for booking.
          </p>
        </div>
        
        <Counter
          label="Adults"
          value={adults}
          setValue={setAdults}
          icon={FiUserCheck}
          description="Age 18+"
          min={1}
        />
        
        <Counter
          label="Children"
          value={children}
          setValue={setChildren}
          icon={FiUser}
          description="Ages 2-17"
        />
        
        <Counter
          label="Infants"
          value={infants}
          setValue={setInfants}
          icon={FiUserPlus}
          description="Under 2 years"
        />
        
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Total Guests:</span> {adults + children + infants} person(s)
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Including {adults} adult(s), {children} child(ren), and {infants} infant(s)
          </p>
        </div>
      </div>

      <div className="flex gap-4 w-full">
       
        
        <button
          onClick={handleSubmit}
          disabled={isLoading || adults === 0}
          className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center ${
            isLoading || adults === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Booking...
            </>
          ) : (
            ' Book Now'
          )}
        </button>
      </div>
      
      {adults === 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            ❌ At least one adult is required for booking.
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;