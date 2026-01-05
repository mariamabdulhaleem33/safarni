
export interface HotelBase {
  id?: number | string;
  name?: string;
  location?: string;
  rating?: number;
  about?: string;
  amenities?: string[];
  gallery?: string[];
  phone?: string;
  pricePerNight?: number;
  discountPercentage?: number;
  nights?: number;
  taxesAndFees?: number;
}

export interface Hotel extends HotelBase {
  id: number | string;
  name: string;
  location: string;
  rating: number;
  about: string;
  amenities: string[];
  gallery: string[];
}
export interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface HotelState {
  currentHotel: Hotel;
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

export interface ReviewInput {
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userId?: string; 
}