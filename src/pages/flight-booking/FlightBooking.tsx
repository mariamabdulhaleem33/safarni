
import FlightTicketCard from "@/components/flight-booking/FlightTicketCard";
import { DateSwitchHeader } from "@/components/flight-booking/DataSwitchHeader";

export default function FlightBooking() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 gap-10 flex-wrap">
      <div className="flex w-full max-w-xl flex-col gap-4 flex-wrap">
        <DateSwitchHeader date="August 24, 2024" />

        <FlightTicketCard
          departureTime="7:05 AM"
          departureAirport="YUL"
          arrivalTime="8:55 PM"
          arrivalAirport="YUL"
          duration="18:55"
          airline="Scoot"
          price={1300}
          layover={{ airport: "1 layover: YYZ", duration: "3:55" }}
        />

        <FlightTicketCard
          departureTime="10:30 AM"
          departureAirport="JFK"
          arrivalTime="2:15 PM"
          arrivalAirport="LAX"
          duration="5:45"
          airline="Delta"
          price={459}
        />

        <FlightTicketCard
          departureTime="6:00 PM"
          departureAirport="SFO"
          arrivalTime="9:30 AM"
          arrivalAirport="LHR"
          duration="10:30"
          airline="British Airways"
          price={2150}
          currency="£"
          layover={{ airport: "1 layover: ORD", duration: "1:20" }}
        />
      </div>
      <div className="flex w-full max-w-xl flex-col gap-4">
        <DateSwitchHeader date="August 24, 2024" />

        <FlightTicketCard
          departureTime="7:05 AM"
          departureAirport="YUL"
          arrivalTime="8:55 PM"
          arrivalAirport="YUL"
          duration="18:55"
          airline="Scoot"
          price={1300}
          layover={{ airport: "1 layover: YYZ", duration: "3:55" }}
        />

        <FlightTicketCard
          departureTime="10:30 AM"
          departureAirport="JFK"
          arrivalTime="2:15 PM"
          arrivalAirport="LAX"
          duration="5:45"
          airline="Delta"
          price={459}
        />

        <FlightTicketCard
          departureTime="6:00 PM"
          departureAirport="SFO"
          arrivalTime="9:30 AM"
          arrivalAirport="LHR"
          duration="10:30"
          airline="British Airways"
          price={2150}
          currency="£"
          layover={{ airport: "1 layover: ORD", duration: "1:20" }}
        />
      </div>
    </div>
  );
}
  


