// src/types/hotel.types.ts

import type { Hotel } from "@/services/hotelApi";


export interface Room {
  id: number;
  name: string;
}

export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface ReviewInput {
  userId?: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  photos?: File[];
}

export interface HotelState {
  currentHotel: Hotel | null;
  reviews: Review[];
  loading: boolean;
  error: string | null;
  bookings: BookingRequest[];
  bookingLoading: boolean;
  bookingError: string | null;
}

export interface Booking {
  id: number;
  booking_type: string;
  booking_status: string;
  payment_status: string;
  total_amount: string;
  rooms: BookingRoom[];
  created_at: string;
}

export interface BookingRoom {
  room_id: number;
  hotel_id: number;
  adults: number;
  teens: number;
  children: number;
  check_in: string;
  check_out: string;
  nights: number;
  price_paid: string;
}

export interface BookingRequest {
  id?: number;
  room_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  infants: number;
  comment?: string;
  status?: string;
  createdAt?: string;
}