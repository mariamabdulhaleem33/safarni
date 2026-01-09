import React, { useState, useRef } from 'react';
import { Camera, Loader2, UserCircle } from 'lucide-react';
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../../../constants/profile.constants';
import toast from 'react-hot-toast';

interface AvatarProps {
    src: string | null;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    editable?: boolean;
    uploading?: boolean;
    onImageSelect?: (file: File) => void;
}

const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
};

const iconSizes = {
    sm: 28,
    md: 36,
    lg: 56
};

export const Avatar: React.FC<AvatarProps> = ({
    src,
    size = 'md',
    className = '',
    editable = false,
    uploading = false,
    onImageSelect
}) => {
    const [imageError, setImageError] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            toast.error('Please select a valid image (JPEG, PNG, GIF, WebP)');
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        onImageSelect?.(file);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        if (editable && !uploading) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="relative">
            {editable && (
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ALLOWED_IMAGE_TYPES.join(',')}
                    onChange={handleFileChange}
                    className="hidden"
                />
            )}

            <div
                className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white shadow-sm ${className} ${editable ? 'cursor-pointer' : ''}`}
                onClick={handleClick}
            >
                {uploading ? (
                    <div className="w-full h-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Loader2 size={iconSizes[size] / 2} className="animate-spin text-blue-500" />
                    </div>
                ) : !src || imageError ? (
                    <div className="w-full h-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                        <UserCircle size={iconSizes[size]} className="text-blue-400" />
                    </div>
                ) : (
                    <img
                        src={src}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            {editable && (
                <button
                    onClick={handleClick}
                    disabled={uploading}
                    className={`absolute bottom-0 right-0 p-1.5 rounded-lg border-2 border-white transition-colors
                        ${uploading
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-blue-100 hover:bg-blue-200 cursor-pointer'
                        }`}
                    aria-label="Change profile picture"
                >
                    {uploading ? (
                        <Loader2 size={14} className="animate-spin text-blue-500" />
                    ) : (
                        <Camera size={14} className="text-blue-600" />
                    )}
                </button>
            )}
        </div>
    );
};