import { useLocation, useNavigate } from "react-router-dom";
import FlightTicketCard from "@/components/flight-booking/FlightTicketCard";
import { DateSwitchHeader } from "@/components/flight-booking/DataSwitchHeader";
import type {
  FlightsSearchData,
  Flight,
} from "@/types/flight-booking/flights-response";
import { getFlightSeats } from "@/api/flight-booking/flight-seats";

export default function FlightBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const results = location.state?.results as FlightsSearchData | undefined;

  if (!results) {
    return (
      <div className="p-6">
        <p>No results found</p>
        <button
          onClick={() => navigate("/")}
          className="underline text-blue-600"
        >
          Back to search
        </button>
      </div>
    );
  }

  const mapFlightToCard = (flight: Flight) => ({
    departureTime: flight.departure_time,
    departureAirport: flight.departure_airport_code,
    arrivalTime: flight.arrival_time,
    arrivalAirport: flight.arrival_airport_code,
    duration: `${Math.floor(flight.duration_minutes / 60)}:${
      flight.duration_minutes % 60
    }`,
    airline: flight.aircraft_type,
    price: Number(flight.current_price),
  });

  const handleFlightClick = async (flightId: number) => {
    try {
      const res = await getFlightSeats(flightId);
      console.log("Seats data:", res.data);
       if (res.data.status === "success") {  console.log("Seats data data:", res.data.data);
          navigate("/seat-booking", {
            state: {
              results: res.data.data, // 👈 هنا الداتا
              flightId: flightId,
            },
          });
        }
      
    } catch (error) {
      console.error(error);
     
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-background p-6 gap-10 flex-wrap">
      {/* Departure Flights */}
      <div className="flex w-full max-w-xl flex-col gap-4">
        <DateSwitchHeader date={results.departure_flights[0]?.departure_date} />
        {results.departure_flights.map(flight => (
          <FlightTicketCard
            key={flight.id}
            {...mapFlightToCard(flight)}
            onClick={() => handleFlightClick(flight.id)}
          />
        ))}
      </div>

      {/* Return Flights */}
      {results.type === "round-trip" && (
        <div className="flex w-full max-w-xl flex-col gap-4">
          <DateSwitchHeader date={results.return_flights[0]?.departure_date} />
          {results.return_flights.map(flight => (
            <FlightTicketCard
              key={flight.id}
              {...mapFlightToCard(flight)}
              onClick={() => handleFlightClick(flight.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
