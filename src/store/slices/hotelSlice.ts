// src/store/slices/hotelSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { HotelState, Review, ReviewInput, BookingRequest } from '@/types/hotel.types';
import type { Hotel } from '@/services/hotelApi';

const initialState: HotelState = {
  currentHotel: null,
  reviews: [],
  loading: false,
  error: null,
  bookings: [],
  bookingLoading: false,
  bookingError: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setCurrentHotel: (state, action: PayloadAction<Hotel | null>) => {
      state.currentHotel = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<ReviewInput>) => {
      const newReview: Review = {
        userId: action.payload.userId || 'user_' + Date.now(),
        userName: action.payload.userName,
        rating: action.payload.rating,
        comment: action.payload.comment,
        title: action.payload.title || "",
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
      };
      
      state.reviews.unshift(newReview);
    },
    updateHotel: (state, action: PayloadAction<Partial<Hotel>>) => {
      if (state.currentHotel) {
        state.currentHotel = { ...state.currentHotel, ...action.payload };
      } else {
        state.currentHotel = action.payload as Hotel;
      }
    },
    addHotelPhoto: (state, action: PayloadAction<string>) => {
      if (state.currentHotel) {
        const updatedGallery = [...(state.currentHotel.gallery || []), action.payload];
        state.currentHotel = { 
          ...state.currentHotel, 
          gallery: updatedGallery 
        };
      }
    },
    setHelpful: (state, action: PayloadAction<{ reviewId: number; helpful: number }>) => {
      const review = state.reviews.find(r => r.id === action.payload.reviewId);
      if (review) {
        review.helpful = action.payload.helpful;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    addBooking: (state, action: PayloadAction<BookingRequest>) => {
      state.bookings.push({
        ...action.payload,
        id: action.payload.id || Math.floor(Math.random() * 1000),
        status: action.payload.status || "pending",
        createdAt: action.payload.createdAt || new Date().toISOString()
      });
      state.bookingLoading = false;
      state.bookingError = null;
    },
    setBookingLoading: (state, action: PayloadAction<boolean>) => {
      state.bookingLoading = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.bookingError = action.payload;
    },
    
    clearHotelData: (state) => {
      state.currentHotel = null;
      state.reviews = [];
      state.error = null;
      state.bookings = [];
      state.bookingError = null;
    }
  },
});

export const { 
  setCurrentHotel, 
  setReviews, 
  addReview, 
  updateHotel, 
  addHotelPhoto,
  setHelpful, 
  setLoading, 
  setError,
  setBookingLoading,
  setBookingError,
  addBooking,
  clearHotelData 
} = hotelSlice.actions;

export default hotelSlice.reducer;