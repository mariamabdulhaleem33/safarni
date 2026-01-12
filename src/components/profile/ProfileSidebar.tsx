import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Lock, LogOut, ChevronLeft, Loader2 } from 'lucide-react';
import { Avatar, MenuItem, LanguageSelector } from './ui';
import type { UserProfile, ActiveSection } from '../../types/profile.types';
import { getUserDisplayName, getUserAvatar } from '../../utils/profile.utils';

interface ProfileSidebarProps {
    user: UserProfile | null;
    loading: boolean;
    uploadingImage: boolean;
    activeSection: ActiveSection;
    onSectionChange: (section: ActiveSection) => void;
    onImageUpload: (file: File) => void;
    onLogout: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
    user,
    loading,
    uploadingImage,
    activeSection,
    onSectionChange,
    onImageUpload,
    onLogout
}) => {
    const navigate = useNavigate();

    return (
        <aside className="w-full lg:w-80 xl:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 lg:min-h-screen">
            <div className="p-4 sm:p-6">
                {/* Back Button */}
                <div className="mb-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 flex items-center justify-center 
                            hover:bg-gray-200 transition-colors text-gray-600 focus:outline-none"
                        aria-label="Go back to home"
                    >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                    </button>
                </div>

                {/* User Profile Card */}
                <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163] mb-4 sm:mb-6">
                    <div className="rounded-2xl p-3 sm:p-4 bg-white flex items-center gap-3 sm:gap-4">
                        <Avatar
                            src={getUserAvatar(user)}
                            size="md"
                            editable
                            uploading={uploadingImage}
                            onImageSelect={onImageUpload}
                        />
                        <div className="flex-1 min-w-0">
                            <h2 className="text-base sm:text-lg font-bold text-slate-700 truncate">
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 size={14} className="animate-spin" />
                                        <span className="text-sm">Loading...</span>
                                    </span>
                                ) : (
                                    getUserDisplayName(user)
                                )}
                            </h2>
                            <p className="text-slate-500 text-xs sm:text-sm truncate">
                                {user?.email || 'guest@example.com'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Items - Horizontal scroll on mobile */}
                <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
                    <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0 lg:w-full">
                        <MenuItem
                            icon={User}
                            label="Personal Info"
                            isActive={activeSection === 'personal-info'}
                            onClick={() => onSectionChange('personal-info')}
                        />

                        <MenuItem
                            icon={CreditCard}
                            label="My Booking"
                            isActive={activeSection === 'bookings'}
                            onClick={() => onSectionChange('bookings')}
                        />

                        <div className="hidden lg:block">
                            <LanguageSelector />
                        </div>

                        <MenuItem
                            icon={Lock}
                            label="Security"
                            isActive={activeSection === 'security'}
                            onClick={() => onSectionChange('security')}
                        />
                    </div>
                </nav>

                {/* Language Selector - Mobile */}
                <div className="lg:hidden mt-4">
                    <LanguageSelector />
                </div>

                {/* Logout */}
                <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-gray-100">
                    <MenuItem
                        icon={LogOut}
                        label="Logout"
                        isDestructive
                        onClick={onLogout}
                    />
                </div>
            </div>
        </aside>
    );
};