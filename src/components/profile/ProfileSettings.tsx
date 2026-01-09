import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useUserProfile } from '../../hooks/useUserProfile';
import { ProfileSidebar } from './ProfileSidebar';
import { PersonalInformation } from './PersonalInformation';
import { MyBookings } from './MyBookings';
import { AccountSecurity } from './AccountSecurity';
import type { ActiveSection, BookingType } from '../../types/profile.types';

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<ActiveSection>('personal-info');
    const [bookingType, setBookingType] = useState<BookingType>('Car');

    const {
        user,
        loading,
        uploadingImage,
        updateProfile,
        uploadImage,
        logout
    } = useUserProfile(navigate);

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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <Toaster position="top-center" reverseOrder={false} />

            <ProfileSidebar
                user={user}
                loading={loading}
                uploadingImage={uploadingImage}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                onImageUpload={uploadImage}
                onLogout={logout}
            />

            <main className="flex-1 p-4 lg:p-8 overflow-auto">
                <div className="max-w-4xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default ProfileSettings;