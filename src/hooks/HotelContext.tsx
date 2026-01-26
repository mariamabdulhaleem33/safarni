// src/contexts/HotelContext.tsx
import React, { createContext, useContext, useCallback } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { addReview, setHelpful, updateHotel } from '../store/slices/hotelSlice';
import { hotelApi, type Hotel } from '../services/hotelApi';
import type { ReviewInput, Review } from '../types/hotel.types';

interface HotelContextType {
  hotel: Hotel | null;
  reviews: Review[];
  loading: boolean;
  error: string | null;
  addHotelReview: (reviewData: ReviewInput) => Promise<void>;
  markReviewHelpful: (reviewId: number, currentHelpful: number) => Promise<void>;
  addHotelPhoto: (photo: File) => Promise<string>;
  updateHotelData: (updates: Partial<Hotel>) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { currentHotel: hotel, reviews, loading, error } = useAppSelector((state) => state.hotel);

  const addHotelReview = useCallback(async (reviewData: ReviewInput) => {
    try {
      if (hotel?.id) {
        try {
          await hotelApi.addHotelReview(hotel.id, reviewData);
        } catch (apiError) {
          console.error('API error adding review:', apiError);
        }
        
        dispatch(addReview(reviewData));
      }
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  }, [hotel?.id, dispatch]);

  const markReviewHelpful = useCallback(async (reviewId: number, currentHelpful: number) => {
    try {
      if (hotel?.id) {
        try {
          await hotelApi.markHelpful(reviewId);
        } catch (apiError) {
          console.error('API error marking helpful:', apiError);
        }
        
        dispatch(setHelpful({ reviewId, helpful: currentHelpful + 1 }));
      }
    } catch (error) {
      console.error('Error marking helpful:', error);
      throw error;
    }
  }, [hotel?.id, dispatch]);

  const addHotelPhoto = useCallback(async (photo: File): Promise<string> => {
    // في الإنتاج، سيتم رفع الصورة للخادم
    const photoUrl = URL.createObjectURL(photo);
    
    // تحديث gallery في Redux
    if (hotel) {
      const updatedGallery = [...(hotel.gallery || []), photoUrl];
      dispatch(updateHotel({ gallery: updatedGallery }));
    }
    
    return photoUrl;
  }, [hotel, dispatch]);

  const updateHotelData = useCallback((updates: Partial<Hotel>) => {
    dispatch(updateHotel(updates));
  }, [dispatch]);

  const value: HotelContextType = {
    hotel,
    reviews,
    loading,
    error,
    addHotelReview,
    markReviewHelpful,
    addHotelPhoto,
    updateHotelData,
  };

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
};

export const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotelContext must be used within a HotelProvider');
  }
  return context;
};