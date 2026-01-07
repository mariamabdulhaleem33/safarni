import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
    User,
    CreditCard,
    Globe,
    Lock,
    LogOut,
    ChevronRight,
    Camera
} from 'lucide-react';
import { profile } from '@/assets';

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, onClick, isDestructive = false }) => {
    return (
        <div
            onClick={onClick}
            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <Icon
                    size={22}
                    className={`${isDestructive ? 'text-red-500' : 'text-gray-600'} stroke-[1.5]`}
                />
                <span className={`font-medium text-base ${isDestructive ? 'text-red-500' : 'text-gray-800'}`}>
                    {label}
                </span>
            </div>

            {!isDestructive && (
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            )}
        </div>
    );
};

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10 px-4">
            <div className="w-full max-w-3xl space-y-6">

                <div className="relative rounded-[24px] p-px bg-linear-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="w-full rounded-[23px] p-6 flex items-center gap-6 bg-white">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    src={profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-blue-100 p-2 rounded-xl border-2 border-white hover:bg-blue-200 transition-colors">
                                <Camera size={18} className="text-blue-600" />
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-slate-700 mb-1">Knee Due</h2>
                            <p className="text-slate-500 text-lg">kneedue@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="relative rounded-[24px] p-px bg-linear-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="w-full rounded-[23px] p-6 space-y-4 bg-white">
                        <MenuItem
                            icon={User}
                            label="Personal Info"
                            onClick={() => navigate("/personal-info")}
                        />

                        <MenuItem
                            icon={CreditCard}
                            label="My Booking"
                        />

                        <MenuItem
                            icon={Globe}
                            label="App Language"
                        />

                        <MenuItem
                            icon={Lock}
                            label="Account & Security"
                            onClick={() => navigate("/security")}
                        />

                        <div className="pt-2">
                            <MenuItem
                                icon={LogOut}
                                label="Logout"
                                isDestructive={true}
                                onClick={() => console.log('Logging out...')}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileSettings;