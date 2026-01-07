
import {BoardingPass} from "@/components/flight-booking/BoardingPass";
export default function BoardingPassPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#F5F5F7" }}
    >
      <h1
        className="text-2xl font-semibold mb-6"
        style={{ color: "#1E3A5F" }}
      >
        Boarding pass
      </h1>

      <BoardingPass
        airline={{
          name: "Air Canada",
        }}
        date="December 16h, 2022"
        departure={{
          time: "07h05",
          code: "YUL",
        }}
        arrival={{
          time: "20h05",
          code: "NRT",
        }}
        duration="13h00"
        gate={8}
        seat={6}
        terminal={3}
        flightNumber="AC006"
        passenger={{
          name: "Catherine Dion",
          age: 24,
          gender: "Female",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
        }}
        seatClass="29A"
        onCheckout={() => console.log("Checkout clicked")}
      />
    </div>
  );
}
