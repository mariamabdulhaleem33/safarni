export type Flight = {
  id: number;
  flight_number: string;
  departure_airport_code: string;
  arrival_airport_code: string;
  departure_date: string;
  arrival_date: string;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  aircraft_type: string;
  booking_class: string;
  base_price: string;
  total_price: string;
  current_price: string;
  total_seats: number;
  booked_seats: number;
  available_seats: number;
  category_name: string;
};

export type FlightsSearchData = {
  type: "one-way" | "round-trip";
  departure_flights: Flight[];
  return_flights: Flight[];
  total_departure_results: number;
  total_return_results: number;
  combinations_count: number;
};

export type FlightsApiResponse = {
  status: "success" | "error";
  message: string;
  data: FlightsSearchData;
};
