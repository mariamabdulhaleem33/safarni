import api from "@/api/axios";

export const getSeatDetails = (flightId: number, seatId: number) => {
  return api.post(`/book-flight/${flightId}`, {
    seat_ids: [seatId],
  });
};
