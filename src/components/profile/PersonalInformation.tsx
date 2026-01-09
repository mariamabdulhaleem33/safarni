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
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    return (
        <div className="relative rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
            <div className="bg-white rounded-2xl p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                    Personal Information
                </h1>

                <div className="flex flex-col items-center mb-8">
                    <Avatar
                        src={getUserAvatar(profile)}
                        size="lg"
                        editable
                        uploading={uploadingImage}
                        onImageSelect={onImageUpload}
                    />
                    <p className="text-sm text-gray-500 mt-3">
                        Click the camera icon to change your photo
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Max size: 5MB - Formats: JPEG, PNG, GIF, WebP
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <InputField
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={(value) => setFormData({ ...formData, full_name: value })}
                        icon={<User size={20} />}
                    />

                    <InputField
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(value) => setFormData({ ...formData, email: value })}
                        icon={<Mail size={20} />}
                    />

                    {profile?.role && (
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-700 font-medium text-sm sm:text-base">
                                Role
                            </label>
                            <div className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 capitalize">
                                {profile.role}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-3 bg-gradient-to-r from-[#4A90E2] to-[#DE3163] text-white font-semibold rounded-xl
                            hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
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