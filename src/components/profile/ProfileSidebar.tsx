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
        <aside className="w-full lg:w-96 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 p-4 lg:p-6 flex flex-col lg:min-h-screen">
            <div className="mb-4">
                <button
                    onClick={() => navigate('/')}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                        hover:bg-gray-200 transition-colors text-gray-600 focus:outline-none"
                    aria-label="Go back to home"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163] mb-6">
                <div className="rounded-2xl p-4 bg-white flex items-center gap-4">
                    <Avatar
                        src={getUserAvatar(user)}
                        size="md"
                        editable
                        uploading={uploadingImage}
                        onImageSelect={onImageUpload}
                    />
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-slate-700 truncate">
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    Loading...
                                </span>
                            ) : (
                                getUserDisplayName(user)
                            )}
                        </h2>
                        <p className="text-slate-500 text-sm truncate">
                            {user?.email || 'guest@example.com'}
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex flex-col gap-2 flex-1">
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

                <LanguageSelector />

                <MenuItem
                    icon={Lock}
                    label="Account & Security"
                    isActive={activeSection === 'security'}
                    onClick={() => onSectionChange('security')}
                />

                <div className="mt-auto pt-4 lg:pt-6">
                    <MenuItem
                        icon={LogOut}
                        label="Logout"
                        isDestructive
                        onClick={onLogout}
                    />
                </div>
            </nav>
        </aside>
    );
};