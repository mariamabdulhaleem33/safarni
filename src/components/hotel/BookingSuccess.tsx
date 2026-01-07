// src/components/hotel/BookingSuccess.tsx
import React, { useState } from "react";
import { FiUser, FiUserCheck, FiUserPlus } from "react-icons/fi";

interface BookingSuccessProps {
  hotelName: string;
  onBack: () => void;
  onSubmit: (data: { adults: number; children: number; infants: number }) => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  hotelName,
  onBack,
  onSubmit
}) => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);

  const handleSubmit = () => {
    onSubmit({ adults, children, infants });
  };

  const Counter = ({ 
    label, 
    value, 
    setValue, 
    icon: Icon,
    description 
  }: { 
    label: string; 
    value: number; 
    setValue: (val: number) => void;
    icon: React.ElementType;
    description?: string;
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
          onClick={() => setValue(Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
          disabled={value === 0}
        >
          -
        </button>
        <span className="mx-4 w-8 text-center font-semibold">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
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
        <Counter
          label="Adults"
          value={adults}
          setValue={setAdults}
          icon={FiUserCheck}
          description="Age 18+"
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
        
       
      </div>

      <div className="flex gap-4 w-full">
      
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
            Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;