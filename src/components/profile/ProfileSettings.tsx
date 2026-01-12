// components/profile/ProfileSettings.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
    ChevronLeft,
    MoreVertical,
    User,
    CreditCard,
    Lock,
    Globe,
    LogOut,
    X,
    Loader2
} from 'lucide-react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { Avatar, MenuItem, LanguageSelector } from './ui';
import { PersonalInformation } from './PersonalInformation';
import { MyBookings } from './MyBookings';
import { AccountSecurity } from './AccountSecurity';
import { getUserDisplayName, getUserAvatar } from '../../utils/profile.utils';
import type { ActiveSection, BookingType } from '../../types/profile.types';

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<ActiveSection>('personal-info');
    const [bookingType, setBookingType] = useState<BookingType>('Car');
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const {
        user,
        loading,
        uploadingImage,
        updateProfile,
        uploadImage,
        logout
    } = useUserProfile(navigate);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSectionChange = (section: ActiveSection) => {
        setActiveSection(section);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        setMenuOpen(false);
        logout();
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'personal-info':
                return (
                    <PersonalInformation
                        profile={user}
                        loading={loading}
                        uploadingImage={uploadingImage}
                        onUpdate={updateProfile}
                        onImageUpload={uploadImage}
                    />
                );
            case 'bookings':
                return (
                    <MyBookings
                        activeType={bookingType}
                        onTypeChange={setBookingType}
                    />
                );
            case 'security':
                return <AccountSecurity />;
            default:
                return null;
        }
    };

    const getSectionTitle = () => {
        switch (activeSection) {
            case 'personal-info': return 'Profile';
            case 'bookings': return 'My Bookings';
            case 'security': return 'Security';
            default: return 'Profile';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-center" reverseOrder={false} />

            {/* ================== MOBILE HEADER (< 640px) ================== */}
            <header className="sm:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate('/')}
                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center 
                                hover:bg-gray-200 transition-colors text-gray-600"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <h1 className="font-semibold text-gray-800">
                            {getSectionTitle()}
                        </h1>

                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center 
                                    hover:bg-gray-200 transition-colors text-gray-600"
                            >
                                {menuOpen ? <X size={20} /> : <MoreVertical size={20} />}
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                    <MobileMenuItem
                                        icon={User}
                                        label="Personal Info"
                                        isActive={activeSection === 'personal-info'}
                                        onClick={() => handleSectionChange('personal-info')}
                                    />
                                    <MobileMenuItem
                                        icon={CreditCard}
                                        label="My Bookings"
                                        isActive={activeSection === 'bookings'}
                                        onClick={() => handleSectionChange('bookings')}
                                    />
                                    <MobileMenuItem
                                        icon={Lock}
                                        label="Security"
                                        isActive={activeSection === 'security'}
                                        onClick={() => handleSectionChange('security')}
                                    />

                                    <div className="my-2 border-t border-gray-100" />

                                    <MobileLanguageSelector />

                                    <div className="my-2 border-t border-gray-100" />

                                    <MobileMenuItem
                                        icon={LogOut}
                                        label="Logout"
                                        isDestructive
                                        onClick={handleLogout}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* ================== MAIN LAYOUT ================== */}
            <div className="flex">
                {/* ================== SIDEBAR (≥ 640px) ================== */}
                <aside className="hidden sm:flex sm:flex-col sm:w-72 md:w-80 lg:w-96 bg-white border-r border-gray-200 min-h-screen p-4 md:p-6">
                    <button
                        onClick={() => navigate('/')}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                            hover:bg-gray-200 transition-colors text-gray-600 mb-4 md:mb-6"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163] mb-4 md:mb-6">
                        <div className="rounded-2xl p-3 md:p-4 bg-white flex items-center gap-3 md:gap-4">
                            <Avatar
                                src={getUserAvatar(user)}
                                size="md"
                                editable
                                uploading={uploadingImage}
                                onImageSelect={uploadImage}
                            />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base md:text-lg font-bold text-slate-700 truncate">
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 size={16} className="animate-spin" />
                                            Loading...
                                        </span>
                                    ) : (
                                        getUserDisplayName(user)
                                    )}
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm truncate">
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
                            onClick={() => setActiveSection('personal-info')}
                        />
                        <MenuItem
                            icon={CreditCard}
                            label="My Booking"
                            isActive={activeSection === 'bookings'}
                            onClick={() => setActiveSection('bookings')}
                        />
                        <LanguageSelector />
                        <MenuItem
                            icon={Lock}
                            label="Account & Security"
                            isActive={activeSection === 'security'}
                            onClick={() => setActiveSection('security')}
                        />

                        <div className="mt-auto pt-4 md:pt-6">
                            <MenuItem
                                icon={LogOut}
                                label="Logout"
                                isDestructive
                                onClick={logout}
                            />
                        </div>
                    </nav>
                </aside>

                {/* ================== CONTENT ================== */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-2xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

// ================== MOBILE COMPONENTS ==================

interface MobileMenuItemProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    isActive?: boolean;
    isDestructive?: boolean;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
    icon: Icon,
    label,
    onClick,
    isActive = false,
    isDestructive = false
}) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : isDestructive
                        ? 'text-red-500 hover:bg-red-50'
                        : 'text-gray-700 hover:bg-gray-50'
                }`}
        >
            <Icon size={18} />
            <span className="font-medium text-sm">{label}</span>
            {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-blue-500" />
            )}
        </button>
    );
};

const MobileLanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ];

    const currentLang = localStorage.getItem('selectedLanguage') || 'en';
    const selected = languages.find(l => l.code === currentLang) || languages[0];

    const handleSelect = (code: string) => {
        localStorage.setItem('selectedLanguage', code);
        setIsOpen(false);
        window.location.reload();
    };

    return (
        <div className="px-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-3 px-2 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
                <Globe size={18} />
                <span className="font-medium text-sm">Language</span>
                <span className="ml-auto text-sm text-gray-500">
                    {selected.flag} {selected.name}
                </span>
            </button>

            {isOpen && (
                <div className="mt-1 bg-gray-50 rounded-lg overflow-hidden">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors
                                ${lang.code === currentLang
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'hover:bg-gray-100 text-gray-600'
                                }`}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;