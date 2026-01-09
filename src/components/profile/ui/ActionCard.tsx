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
            className="group w-full p-4 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between"
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