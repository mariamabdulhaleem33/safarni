import React, { useState, useEffect } from 'react';
import { User, Mail, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Avatar, InputField } from './ui';
import type { UserProfile, UpdateProfilePayload } from '../../types/profile.types';
import { getUserDisplayName, getUserAvatar } from '../../utils/profile.utils';

interface PersonalInfoProps {
    profile: UserProfile | null;
    loading: boolean;
    uploadingImage: boolean;
    onUpdate: (data: UpdateProfilePayload) => Promise<void>;
    onImageUpload: (file: File) => Promise<void>;
}

export const PersonalInformation: React.FC<PersonalInfoProps> = ({
    profile,
    loading,
    uploadingImage,
    onUpdate,
    onImageUpload
}) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: getUserDisplayName(profile),
                email: profile.email || '',
            });
        }
    }, [profile]);

    const handleSave = async () => {
        if (!formData.full_name.trim()) {
            toast.error('Please enter your name');
            return;
        }

        if (!formData.email.trim()) {
            toast.error('Please enter your email');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email');
            return;
        }

        setSaving(true);
        try {
            await onUpdate({
                full_name: formData.full_name.trim(),
                email: formData.email.trim(),
            });
            toast.success('Profile updated successfully!');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to update profile';
            toast.error(message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    return (
        <div className="relative rounded-xl sm:rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                    <Avatar
                        src={getUserAvatar(profile)}
                        size="lg"
                        editable
                        uploading={uploadingImage}
                        onImageSelect={onImageUpload}
                    />
                    <h2 className="mt-3 text-lg sm:text-xl font-semibold text-gray-800">
                        {getUserDisplayName(profile)}
                    </h2>
                    <p className="text-sm text-gray-500">{profile?.email}</p>
                    {profile?.role && (
                        <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full capitalize">
                            {profile.role}
                        </span>
                    )}
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4 sm:gap-5">
                    <InputField
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={(value) => setFormData({ ...formData, full_name: value })}
                        icon={<User size={18} />}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(value) => setFormData({ ...formData, email: value })}
                        icon={<Mail size={18} />}
                    />

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-gradient-to-r from-[#4A90E2] to-[#DE3163] text-white font-semibold rounded-xl
                            hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};