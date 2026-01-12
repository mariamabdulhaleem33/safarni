import React from 'react';

interface ToggleRowProps {
    label: string;
    isEnabled: boolean;
    onToggle: () => void;
}

export const ToggleRow: React.FC<ToggleRowProps> = ({ label, isEnabled, onToggle }) => {
    return (
        <div className="flex items-center justify-between py-2 sm:py-3">
            <span className="text-gray-900 font-medium text-sm sm:text-base lg:text-lg">{label}</span>
            <button
                onClick={onToggle}
                className={`w-10 sm:w-12 h-6 sm:h-7 flex items-center rounded-full p-0.5 sm:p-1 transition-colors duration-300 focus:outline-none ${isEnabled ? 'bg-blue-500' : 'bg-gray-200'}`}
                aria-pressed={isEnabled}
            >
                <div
                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isEnabled ? 'translate-x-4 sm:translate-x-5' : 'translate-x-0'}`}
                />
            </button>
        </div>
    );
};