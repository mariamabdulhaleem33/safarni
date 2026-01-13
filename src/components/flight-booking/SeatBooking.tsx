import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeatDetails } from "@/api/flight-booking/getSeatDetails";

/* ================== Types ================== */

type SeatStatus = "available" | "selected" | "booked";

type Seat = {
  id: number;
  number: number;
  row: number;
  status: SeatStatus;
};

type Row = {
  rowNumber: number;
  seats: Seat[];
};

type LocationState = {
  results: {
    flight_seats: {
      id: number;
      seat_number: string;
      status: "available" | "booked" | "locked";
    }[];
  };
  flightId: number;
};

/* ================== Seat Component ================== */

interface SeatProps {
  seat: Seat;
  onSelect: (seat: Seat) => void;
}

const Seat = ({ seat, onSelect }: SeatProps) => {
  const isBooked = seat.status === "booked";
  const isSelected = seat.status === "selected";

  return (
    <button
      disabled={isBooked}
      onClick={() => onSelect(seat)}
      className={`
        h-10 w-10 rounded-md border
        flex items-center justify-center
        text-sm font-medium transition
        ${
          isBooked
            ? "bg-gray-200 text-black cursor-not-allowed"
            : isSelected
            ? "bg-green-500 text-black border-green-500"
            : "bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
        }
      `}
    >
      {seat.number}
    </button>
  );
};

/* ================== Main Component ================== */

export default function SeatBooking() {
  const { state } = useLocation();
  const { results, flightId } = state as LocationState;

  const [rows, setRows] = useState<Row[]>([]);
  const [seatPrice, setSeatPrice] = useState<number | null>(null);

  /* ====== تجهيز الداتا من API مرة واحدة ====== */
  useEffect(() => {
    if (!results?.flight_seats) return;

    const seats = results.flight_seats.slice(0, 29).map((seat, index) => ({
      id: seat.id,
      number: index + 1,
      row: Math.floor(index / 5) + 1,
      status: seat.status === "available" ? "available" : "booked",
    }));

    const groupedRows: Row[] = [];

    seats.forEach(seat => {
      const rowIndex = groupedRows.findIndex(r => r.rowNumber === seat.row);

      if (rowIndex === -1) {
        groupedRows.push({
          rowNumber: seat.row,
          seats: [seat],
        });
      } else {
        groupedRows[rowIndex].seats.push(seat);
      }
    });

    setRows(groupedRows);
  }, [results]);

  const selectedSeat = rows
    .flatMap(row => row.seats)
    .find(seat => seat.status === "selected");

  /* ====== اختيار الكرسي + API ====== */
  const handleSelectSeat = async (selectedSeat: Seat) => {
    setRows(prev =>
      prev.map(row => ({
        ...row,
        seats: row.seats.map(seat => {
          if (seat.status === "booked") return seat;

          if (seat.id === selectedSeat.id) {
            return {
              ...seat,
              status: seat.status === "selected" ? "available" : "selected",
            };
          }

          return {
            ...seat,
            status: seat.status === "selected" ? "available" : seat.status,
          };
        }),
      })),
    );

    try {
      const res = await getSeatDetails(flightId, selectedSeat.id);
      if (res.data.status === "success") {
        setSeatPrice(Number(res.data.data.booking.total_amount));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="grid grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600 block" />
          <span className="text-sm">Available</span>
        </div>

        <div className="flex items-center gap-2 justify-self-center">
          <span className="h-3 w-3 rounded-full bg-green-500 block" />
          <span className="text-sm">Selected</span>
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <span className="h-3 w-3 rounded-full bg-gray-400 block" />
          <span className="text-sm">Unavailable</span>
        </div>
      </div>

      {rows.map(row => (
        <div key={row.rowNumber}>
          <div className="mb-2 text-xs text-muted-foreground">
            Row {row.rowNumber}
          </div>

          <div className="grid grid-cols-7 gap-5">
            {row.seats.slice(0, 2).map(seat => (
              <Seat
                key={seat.id}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}

            <div className="col-span-2" />

            {row.seats.slice(2).map(seat => (
              <Seat
                key={seat.id}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div>Ticket Price</div>
        <div className="text-blue-800 text-xl">{seatPrice ?? ""} $</div>
      </div>

      <div className="flex justify-between">
        <div>Your Seat</div>
        <div className="text-blue-800 text-xl">
          {selectedSeat?.number ?? ""}
        </div>
      </div>

      <button
        className="w-full bg-blue-700 text-white py-3 rounded-md cursor-pointer hover:bg-blue-600 transition"
        disabled={!selectedSeat}
      >
        Book Seat
      </button>
    </div>
  );
}
