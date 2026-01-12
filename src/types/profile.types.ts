export interface UserProfile {
  id: number;
  full_name?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  role?: string;
  phone?: string;
  phone_number?: string;
  location?: string;
  address?: string;
  avatar?: string;
  image?: string;
  photo?: string;
  profile_picture?: string;
}

export interface UpdateProfilePayload {
  full_name: string;
  email: string;
}

export interface RawAdditionalInfo {
  name?: string;
  title?: string;
  check_in?: string;
  check_out?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  flight_date?: string;
  nights?: number;
  days?: number;
  adults?: number | string;
  children?: number | string;
  image?: string;
  photo?: string;
  price?: number | string;
  location?: string;
  address?: string;
  car_model?: string;
  pickup_date?: string;
  dropoff_date?: string;
  pickup_location?: string;
  dropoff_location?: string;
  [key: string]: unknown;
}

export interface Booking {
  id: number;
  payment_status?: string;
  booking_status?: string;
  total_amount?: number | string;
  price_paid?: number | string;
  bookable_type?: string;
  quantity?: number;
  created_at?: string;
  user_name?: string;
  user_email?: string;
  bookable?: {
    name?: string;
    title?: string;
    image?: string;
    photo?: string;
    thumbnail?: string;
  };
  additional_info?: RawAdditionalInfo | RawAdditionalInfo[] | null;
  [key: string]: unknown;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export type BookingType = "Car" | "Room" | "Flight" | "Tour";
export type ActiveSection = "personal-info" | "bookings" | "security";
