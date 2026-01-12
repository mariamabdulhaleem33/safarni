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

const sizeConfig = {
    sm: {
        container: 'w-8 h-8 sm:w-10 sm:h-10',
        icon: 20,
        iconSm: 16,
        camera: 10,
        cameraSm: 8,
    },
    md: {
        container: 'w-14 h-14 sm:w-16 sm:h-16',
        icon: 36,
        iconSm: 28,
        camera: 12,
        cameraSm: 10,
    },
    lg: {
        container: 'w-20 h-20 sm:w-24 sm:h-24',
        icon: 56,
        iconSm: 44,
        camera: 14,
        cameraSm: 12,
    },
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
    const config = sizeConfig[size];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            toast.error('Please select a valid image');
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
                className={`${config.container} rounded-full overflow-hidden border-2 border-white shadow-sm ${className} ${editable ? 'cursor-pointer' : ''}`}
                onClick={handleClick}
            >
                {uploading ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                ) : !src || imageError ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center border border-blue-200">
                        <UserCircle
                            className="text-blue-400"
                            style={{
                                width: config.iconSm,
                                height: config.iconSm
                            }}
                        />
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
                    className={`absolute bottom-0 right-0 p-1 sm:p-1.5 rounded-md sm:rounded-lg border-2 border-white transition-colors
                        ${uploading
                            ? 'bg-gray-100 cursor-not-allowed'
                            : 'bg-blue-100 hover:bg-blue-200 cursor-pointer'
                        }`}
                    aria-label="Change profile picture"
                >
                    {uploading ? (
                        <Loader2
                            className="animate-spin text-blue-500"
                            style={{ width: config.cameraSm, height: config.cameraSm }}
                        />
                    ) : (
                        <Camera
                            className="text-blue-600"
                            style={{ width: config.cameraSm, height: config.cameraSm }}
                        />
                    )}
                </button>
            )}
        </div>
    );
};