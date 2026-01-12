import React, { useState, useEffect, type JSX } from 'react';
import { Car, Home, Plane, Map, Calendar, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import type { Booking, BookingType } from '../../types/profile.types';
import { API_BASE_URL, BOOKING_TYPES } from '../../constants/profile.constants';
import {
    getToken,
    getBookingName,
    getBookingDate,
    getBookingPrice,
    getBookingImage,
    getStatusColor
} from '../../utils/profile.utils';

interface MyBookingsProps {
    activeType: BookingType;
    onTypeChange: (type: BookingType) => void;
}

const bookingIcons: Record<BookingType, JSX.Element> = {
    'Car': <Car size={20} className="text-gray-400" />,
    'Room': <Home size={20} className="text-gray-400" />,
    'Flight': <Plane size={20} className="text-gray-400" />,
    'Tour': <Map size={20} className="text-gray-400" />,
};

export const MyBookings: React.FC<MyBookingsProps> = ({ activeType, onTypeChange }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = getToken();

            if (!token) {
                setError('Please login to view your bookings');
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${API_BASE_URL}/get-user-bookings?type=${activeType}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('Session expired. Please login again.');
                        return;
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                let bookingsArray: Booking[] = [];
                if (Array.isArray(data)) {
                    bookingsArray = data;
                } else if (data.data && Array.isArray(data.data)) {
                    bookingsArray = data.data;
                } else if (data.bookings && Array.isArray(data.bookings)) {
                    bookingsArray = data.bookings;
                }

                setBookings(bookingsArray);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Failed to load bookings';
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [activeType]);

    return (
        <div className="space-y-4">
            {/* Booking Type Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-start sm:flex-wrap">
                {BOOKING_TYPES.map(({ type, icon: Icon, label }) => (
                    <button
                        key={type}
                        onClick={() => onTypeChange(type)}
                        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap text-xs sm:text-sm ${activeType === type
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="relative rounded-xl sm:rounded-2xl p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center h-40">
                            <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
                            <p className="text-gray-500 text-sm">Loading...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                                <AlertCircle size={24} className="text-red-500" />
                            </div>
                            <p className="text-red-500 font-medium text-sm">{error}</p>
                            <button
                                onClick={() => onTypeChange(activeType)}
                                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && bookings.length === 0 && (
                        <div className="text-center py-10">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                {bookingIcons[activeType]}
                            </div>
                            <h3 className="font-medium text-gray-800 mb-1">No {activeType} Bookings</h3>
                            <p className="text-gray-500 text-sm">You haven't made any bookings yet.</p>
                        </div>
                    )}

                    {/* Bookings List */}
                    {!loading && !error && bookings.length > 0 && (
                        <div className="space-y-3">
                            {bookings.map((booking, index) => (
                                <div
                                    key={booking.id || index}
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:shadow-sm transition-all cursor-pointer border border-gray-100"
                                >
                                    {/* Image */}
                                    {getBookingImage(booking) ? (
                                        <img
                                            src={getBookingImage(booking)!}
                                            alt={getBookingName(booking)}
                                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                            {bookingIcons[activeType]}
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                                            {getBookingName(booking)}
                                        </h4>

                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {getBookingDate(booking)}
                                            </span>
                                            <span className="flex items-center gap-1 font-medium text-gray-700">
                                                <DollarSign size={12} />
                                                {getBookingPrice(booking)}
                                            </span>
                                        </div>

                                        {/* Status - Mobile */}
                                        <div className="flex gap-1.5 mt-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getStatusColor(booking.booking_status || 'pending')}`}>
                                                {booking.booking_status || 'Pending'}
                                            </span>
                                            {booking.payment_status && (
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${booking.payment_status === 'paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {booking.payment_status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};