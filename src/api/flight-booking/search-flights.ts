import api from "@/api/axios";
import type{ FlightSearchRequest } from "@/types/flight-booking/flights-response";
import type{ FlightsApiResponse } from "@/types/flight-booking/flights-response";

export const searchFlights = (
  payload: FlightSearchRequest
) => {
  return api.post<FlightsApiResponse>(
    "search-flights",
    payload
  );
};