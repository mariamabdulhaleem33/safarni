import { useState } from "react";

/* ================== Types ================== */

type SeatStatus = "available" | "selected" | "booked";

type Seat = {
  number: number;
  row: number;
  status: SeatStatus;
};

type Row = {
  rowNumber: number;
  seats: Seat[];
};

/* ================== Mock Data ================== */

const initialRows: Row[] = [
  {
    rowNumber: 1,
    seats: [
      { number: 1, row: 1, status: "available" },
      { number: 2, row: 1, status: "booked" },
      { number: 3, row: 1, status: "available" },
      { number: 4, row: 1, status: "available" },
      { number: 5, row: 1, status: "available" },
    ],
  },
  {
    rowNumber: 2,
    seats: [
      { number: 6, row: 2, status: "available" },
      { number: 7, row: 2, status: "available" },
      { number: 8, row: 2, status: "booked" },
      { number: 9, row: 2, status: "available" },
      { number: 10, row: 2, status: "available" },
    ],
  },
  {
    rowNumber: 3,
    seats: [
      { number: 11, row: 3, status: "available" },
      { number: 12, row: 3, status: "available" },
      { number: 13, row: 3, status: "booked" },
      { number: 14, row: 3, status: "available" },
      { number: 15, row: 3, status: "available" },
    ],
  },
  {
    rowNumber: 4,
    seats: [
      { number: 16, row: 4, status: "available" },
      { number: 17, row: 4, status: "available" },
      { number: 18, row: 4, status: "booked" },
      { number: 19, row: 4, status: "available" },
      { number: 20, row: 4, status: "available" },
    ],
  },
  {
    rowNumber: 5,
    seats: [
      { number: 21, row: 5, status: "available" },
      { number: 22, row: 5, status: "available" },
      { number: 23, row: 5, status: "booked" },
      { number: 24, row: 5, status: "available" },
      { number: 25, row: 5, status: "available" },
    ],
  },
  {
    rowNumber: 6,
    seats: [
      { number: 25, row: 6, status: "available" },
      { number: 26, row: 6, status: "available" },
      { number: 27, row: 6, status: "booked" },
      { number: 28, row: 6, status: "available" },
      { number: 29, row: 6, status: "available" },
    ],
  },
];

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
  const [rows, setRows] = useState<Row[]>(initialRows);
  const selectedSeat = rows
    .flatMap(row => row.seats)
    .find(seat => seat.status === "selected");

  const handleSelectSeat = (selectedSeat: Seat) => {
    setRows(prev =>
      prev.map(row => ({
        ...row,
        seats: row.seats.map(seat => {
          if (seat.status === "booked") return seat;

          if (
            seat.number === selectedSeat.number &&
            seat.row === selectedSeat.row
          ) {
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
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 items-center">
        {/* Available */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600 block" />
          <span className="text-sm">Available</span>
        </div>

        {/* Selected */}
        <div className="flex items-center gap-2 justify-self-center">
          <span className="h-3 w-3 rounded-full bg-green-500 block" />
          <span className="text-sm">Selected</span>
        </div>

        {/* Unavailable */}
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
            {/* Left seats */}
            {row.seats.slice(0, 2).map(seat => (
              <Seat
                key={seat.number}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}

            {/* Aisle */}
            <div className="col-span-2" />

            {/* Right seats */}
            {row.seats.slice(2).map(seat => (
              <Seat
                key={seat.number}
                seat={seat}
                onSelect={handleSelectSeat}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <div>Ticket Price</div>
        <div className="text-blue-800 text-xl ">1500 $</div>
      </div>
      <div className="flex justify-between">
        <div>Total Price</div>
        <div className="text-blue-800 text-xl ">1500 $</div>
      </div>
      <div className="flex justify-between">
        <div>Your Seat</div>
        <div className="text-blue-800 text-xl ">
          {selectedSeat ? selectedSeat.number : ""}
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
