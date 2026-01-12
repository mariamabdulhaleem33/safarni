import React from 'react';

interface InputFieldProps {
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    icon,
    type = "text",
    value,
    onChange,
    disabled = false
}) => {
    return (
        <div className="flex flex-col gap-1.5 sm:gap-2">
            <label className="text-gray-700 font-medium text-xs sm:text-sm">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    {icon}
                </div>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 
                        text-sm sm:text-base text-gray-600 placeholder-gray-400 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        transition-all duration-200 ease-in-out
                        disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );
};