import React, { useState, useEffect, type JSX } from 'react';
import { Car, Home, Plane, Map, Calendar, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import type { Booking, BookingType } from '../../types/profile.types';
import { API_BASE_URL, BOOKING_TYPES } from '../../constants/profile.constants';
import {
    getToken,
    getBookingName,
    getBookingDate,
    getBookingPrice,
    getBookingDetails,
    getBookingImage,
    getStatusColor
} from '../../utils/profile.utils';

interface MyBookingsProps {
    activeType: BookingType;
    onTypeChange: (type: BookingType) => void;
}

const bookingIcons: Record<BookingType, JSX.Element> = {
    'Car': <Car size={24} className="text-gray-400" />,
    'Room': <Home size={24} className="text-gray-400" />,
    'Flight': <Plane size={24} className="text-gray-400" />,
    'Tour': <Map size={24} className="text-gray-400" />,
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
        <div className="relative rounded-2xl p-px bg-linear-to-b from-[#4A90E2] to-[#DE3163]">
            <div className="bg-white rounded-2xl p-6 md:p-10">
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                    My Bookings
                </h1>

                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {BOOKING_TYPES.map(({ type, icon: Icon, label }) => (
                        <button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${activeType === type
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Icon size={18} />
                            {label}
                        </button>
                    ))}
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center h-40">
                        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                        <p className="text-gray-500">Loading {activeType} bookings...</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <p className="text-red-500 font-medium">{error}</p>
                        <button
                            onClick={() => onTypeChange(activeType)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && bookings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            {bookingIcons[activeType]}
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No {activeType} Bookings</h3>
                        <p className="text-gray-500">You haven't made any {activeType.toLowerCase()} bookings yet.</p>
                    </div>
                )}

                {!loading && !error && bookings.length > 0 && (
                    <div className="grid gap-4">
                        {bookings.map((booking, index) => (
                            <div
                                key={booking.id || index}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all cursor-pointer border border-gray-100"
                            >
                                {getBookingImage(booking) ? (
                                    <img
                                        src={getBookingImage(booking)!}
                                        alt={getBookingName(booking)}
                                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        {bookingIcons[activeType]}
                                    </div>
                                )}

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 truncate">
                                        {getBookingName(booking)}
                                    </h4>

                                    {getBookingDetails(booking) && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            {getBookingDetails(booking)}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                                        <span className="flex items-center gap-1 text-xs sm:text-sm">
                                            <Calendar size={14} />
                                            {getBookingDate(booking)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-700">
                                            <DollarSign size={14} />
                                            {getBookingPrice(booking)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 shrink-0 items-end">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.booking_status || 'pending')}`}>
                                        {booking.booking_status || 'Pending'}
                                    </span>
                                    {booking.payment_status && (
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${booking.payment_status === 'paid'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-orange-100 text-orange-700'
                                            }`}>
                                            {booking.payment_status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};