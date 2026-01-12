import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ActionCardProps {
    title: string;
    description: string;
    isDestructive?: boolean;
    onClick?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
    title,
    description,
    isDestructive = false,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className="group w-full p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-2"
        >
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                <h3 className={`font-semibold text-sm sm:text-base lg:text-lg ${isDestructive ? 'text-red-500' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-light line-clamp-2">
                    {description}
                </p>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" size={18} />
        </div>
    );
};