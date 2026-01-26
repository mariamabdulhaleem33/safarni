// src/services/hotelApi.ts
const BASE_URL = "https://round8-safarni-team-three.huma-volve.com/api";

/* ========= Types ========= */

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string | null;
  content_info?: string;
  about?: string;
  description?: string;
  amenities?: string[];
  gallery?: string[];
  pricePerNight: number | 0;
  discountPercentage: number | 0;
  nights: number | 0;
  taxesAndFees: number | 0;
  rooms?: Array<{ id: number | string; name: string }>;
  phone?: string;
  distance?: string;
}

export interface ApiResponse<T> {
  data: T;
  links?: PaginationLinks;
  meta?: PaginationMeta;
  status: string;
  message: string;
}

const request = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

export const hotelApi = {
  getAllHotels: (page: number = 1) =>
    request<Hotel[]>(`${BASE_URL}/hotel?page=${page}`),

  // Search hotels
  searchHotels: (query: string) =>
    request<Hotel[]>(`${BASE_URL}/hotel?search=${encodeURIComponent(query)}`),

  // Get single hotel by ID
  getHotelById: (id: string | number) =>
    request<Hotel>(`${BASE_URL}/hotel/${id}`),

  // Pagination using backend links (next / prev)
  getByUrl: (url: string) => request(url),

  addHotelReview: async (hotelId: string | number, reviewData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/hotel/${hotelId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) throw new Error("Failed to add review");
      return await response.json();
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },

  markHelpful: async (reviewId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/${reviewId}/helpful`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to mark helpful");
      return await response.json();
    } catch (error) {
      console.error("Error marking review as helpful:", error);
      throw error;
    }
  },

  createBooking: async (bookingData: {
    room_id: number;
    check_in: string;
    check_out: string;
    adults: number;
    children?: number;
    infants?: number;
    comment?: string;
  }) => {
    const response = await fetch(`${BASE_URL}/hotel-bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  },

  checkBookingAPIs: async () => {
    const endpoints = [
      "/hotel-bookings",
      "/hotel/bookings",
      "/bookings",
      "/booking",
      "/reservations",
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
          method: "OPTIONS",
        });

        results.push({
          endpoint,
          exists: response.ok,
          status: response.status,
          statusText: response.statusText,
        });
      } catch (error) {
        results.push({
          endpoint,
          exists: false,
        });
      }
    }

    return results;
  },
};
