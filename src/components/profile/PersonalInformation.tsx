import React from 'react';
import { ChevronLeft, User, Mail, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Input Component Interface
interface InputFieldProps {
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
    defaultValue?: string;
}

//  Input Component
const InputField: React.FC<InputFieldProps> = ({ label, placeholder, icon, type = "text", defaultValue }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium text-sm sm:text-base">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </div>
                <input
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 
                     text-gray-600 placeholder-gray-400 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition-all duration-200 ease-in-out"
                />
            </div>
        </div>
    );
};

const PersonalInformation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center">

            {/* Container for alignment matching the width of the form */}
            <div className="w-full max-w-4xl">

                {/* Back Button */}
                <div className="mb-6 flex justify-start">
                    <button
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                       hover:bg-gray-200 transition-colors text-gray-600 focus:outline-none"
                        aria-label="Go back"
                        onClick={() => navigate("/profile")}
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                {/* Main Card with Gradient Border */}

                <div className="relative rounded-xl p-px bg-linear-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="bg-white rounded-xl p-6 md:p-10 w-full h-full">

                        {/* Form Title */}
                        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
                            personal information
                        </h1>

                        {/* Form Fields Container */}
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

                            <InputField
                                label="Name"
                                placeholder="Enter your name"
                                defaultValue="kneeDue"
                                icon={<User size={20} />}
                            />

                            <InputField
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                defaultValue="kneeDue@untitledui.com"
                                icon={<Mail size={20} />}
                            />

                            <InputField
                                label="Location"
                                placeholder="Enter your location"
                                defaultValue="200-298 Clipper St San Francisco"
                                icon={<MapPin size={20} />}
                            />

                            <InputField
                                label="Phone Number"
                                type="tel"
                                placeholder="Enter your phone number"
                                defaultValue="kneeDue@untitledui.com"
                                icon={<Phone size={20} />}
                            />

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PersonalInformation;