import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ToggleRowProps {
    label: string;
    isEnabled: boolean;
    onToggle: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, isEnabled, onToggle }) => {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-gray-900 font-medium text-base sm:text-lg">{label}</span>

            {/* Custom Toggle Switch Implementation */}
            <button
                onClick={onToggle}
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${isEnabled ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                aria-pressed={isEnabled}
            >
                <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
};

// 2. Action Card Component
interface ActionCardProps {
    title: string;
    description: string;
    isDestructive?: boolean;
    onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, isDestructive = false, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="group w-full p-4 rounded-lg border border-gray-100 bg-white hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
        >
            <div className="flex flex-col gap-1">
                <h3 className={`font-semibold text-base sm:text-lg ${isDestructive ? 'text-red-500' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                    {description}
                </p>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors" size={20} />
        </div>
    );
};

// Main Component 

const AccountSecurity: React.FC = () => {
    const navigate = useNavigate();

    // State management for toggles
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [faceIdEnabled, setFaceIdEnabled] = useState(false);

    return (
        <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center">

            {/* Layout Container */}
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

                {/* Main Card with Gradient Border Trick */}
                <div className="relative rounded-xl p-px bg-linear-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="bg-white rounded-xl p-6 md:p-10 w-full min-h-150">

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
                            Account & Security
                        </h1>

                        {/* Content Container */}
                        <div className="flex flex-col gap-6">

                            {/* Toggles Section */}
                            <div className="flex flex-col gap-2 mb-4">
                                <ToggleRow
                                    label="Biometric ID"
                                    isEnabled={biometricEnabled}
                                    onToggle={() => setBiometricEnabled(!biometricEnabled)}
                                />
                                <ToggleRow
                                    label="Face ID"
                                    isEnabled={faceIdEnabled}
                                    onToggle={() => setFaceIdEnabled(!faceIdEnabled)}
                                />
                            </div>

                            {/* Action Cards Section */}
                            <div className="flex flex-col gap-4">
                                <ActionCard
                                    title="Device Management"
                                    description="Manage your account on the various devices you own."
                                />

                                <ActionCard
                                    title="Deactivate Account"
                                    description="Temporarily deactivate your account. Easily reactivate when you're ready."
                                />

                                <ActionCard
                                    title="Delete Account"
                                    description="Permanently remove your account and data from Tripmate. Proceed with caution."
                                    isDestructive={true} 
                                />
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountSecurity;