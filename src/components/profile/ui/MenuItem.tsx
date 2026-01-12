import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    isDestructive?: boolean;
    isActive?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    label,
    onClick,
    isDestructive = false,
    isActive = false,
}) => {
    return (
        <div
            onClick={onClick}
            className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer
                min-w-[140px] lg:min-w-0
                ${isActive
                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                    : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
                }
                ${isDestructive ? 'hover:bg-red-50 hover:border-red-100' : ''}
            `}
        >
            <div className="flex items-center gap-2 sm:gap-4">
                <Icon
                    size={18}
                    className={`sm:w-[22px] sm:h-[22px] stroke-[1.5] ${isDestructive
                        ? 'text-red-500'
                        : isActive
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}
                />
                <span className={`font-medium text-sm sm:text-base whitespace-nowrap ${isDestructive
                    ? 'text-red-500'
                    : isActive
                        ? 'text-blue-700'
                        : 'text-gray-800'
                    }`}>
                    {label}
                </span>
            </div>

            {!isDestructive && (
                <ChevronRight
                    size={18}
                    className={`hidden sm:block transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'}`}
                />
            )}
        </div>
    );
};