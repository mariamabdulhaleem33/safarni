// store/slices/hotelSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { HotelState, Hotel, Review, ReviewInput } from '@/types/hotel.types';

const initialState: HotelState = {
  currentHotel: {
    id: 1,
    name: 'Harbarthaven Hideaway',
    location: 'New York / USA',
    rating: 4.5,
    about: 'A luxurious hideaway in the heart of New York, offering premium amenities and exceptional service. Experience comfort and elegance in our well-appointed rooms.',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
    ],
  },
  reviews: [
    {
      id: 1,
      userId: 'user1',
      userName: 'John Doe',
      rating: 5,
      title: 'Amazing Experience!',
      comment: 'The hotel exceeded all my expectations. The service was exceptional.',
      date: '2024-01-15',
      helpful: 24,
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Jane Smith',
      rating: 4,
      title: 'Great Location',
      comment: 'Perfect location, clean rooms, friendly staff.',
      date: '2024-01-10',
      helpful: 18,
    },
  ],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<ReviewInput>) => {
      const newReview: Review = {
        ...action.payload,
        id: Date.now(),
        userId: action.payload.userId || 'user' + Date.now(), // إضافة userId تلقائيًا
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
      };
      state.reviews.unshift(newReview);
    },
    updateHotel: (state, action: PayloadAction<Partial<Hotel>>) => {
      state.currentHotel = { ...state.currentHotel, ...action.payload };
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
  },
});

export const { addReview, updateHotel, setHelpful, setLoading, setError } = hotelSlice.actions;
export default hotelSlice.reducer;