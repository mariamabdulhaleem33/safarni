import * as React from "react";
import { cn } from "@/lib/utils";
import { Plane } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface BoardingPassProps
  extends React.HTMLAttributes<HTMLDivElement> {
  airline: {
    name: string;
    logo?: string;
  };
  date: string;
  departure: {
    time: string;
    code: string;
  };
  arrival: {
    time: string;
    code: string;
  };
  duration: string;
  gate: string | number;
  seat: string | number;
  terminal: string | number;
  flightNumber: string;
  passenger: {
    name: string;
    age?: number;
    gender?: string;
    avatar?: string;
  };
  seatClass?: string;
  qrCode?: string;
  onCheckout?: () => void;
  checkoutLabel?: string;
}

const BoardingPass = React.forwardRef<HTMLDivElement, BoardingPassProps>(
  (
    {
      className,
      airline,
      date,
      departure,
      arrival,
      duration,
      gate,
      seat,
      terminal,
      flightNumber,
      passenger,
      seatClass = "29A",
      qrCode,
      onCheckout,
      checkoutLabel = "Check Out",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn("w-full max-w-md", className)}
        {...props}
        ref={ref}
      >
        {/* 3D Fold Effect - Top ATM Receipt Slot */}
        <div className="relative">
          {/* Fold shadow backdrop */}
          <div
            className="absolute -top-3 left-4 right-4 h-6 rounded-t-lg"
            style={{
              background:
                "linear-gradient(180deg, #9CA3AF 0%, #D1D5DB 40%, #E5E7EB 100%)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.15)",
            }}
          />
          {/* Fold crease line */}
          <div
            className="absolute -top-1 left-6 right-6 h-2"
            style={{
              background:
                "linear-gradient(180deg, #6B7280 0%, #9CA3AF 50%, transparent 100%)",
              borderRadius: "2px 2px 0 0",
            }}
          />
        </div>

        {/* Main Card */}
        <div className="relative">
          {/* Card Content */}
          <div
            className="relative rounded-2xl bg-white overflow-hidden"
            style={{
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {/* Top Section */}
            <div className="p-5 pb-4">
              {/* Airline & Date Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {airline.logo ? (
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#E31837" }}
                    >
                      <span className="text-white text-xs font-bold">✦</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {airline.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {date}
                </span>
              </div>

              {/* Flight Times Row */}
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {departure.time}
                  </div>
                  <div className="text-sm text-gray-500">{departure.code}</div>
                </div>

                <div className="flex flex-col items-center px-4">
                  <Plane className="w-4 h-4 text-gray-600 rotate-90 mb-1" />
                  <span className="text-xs text-gray-500">{duration}</span>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {arrival.time}
                  </div>
                  <div className="text-sm text-gray-500">{arrival.code}</div>
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-100 my-4" />

              {/* Flight Details Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {gate}
                  </div>
                  <div className="text-xs text-gray-500">Gate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {seat}
                  </div>
                  <div className="text-xs text-gray-500">Seat</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {terminal}
                  </div>
                  <div className="text-xs text-gray-500">Terminal</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {flightNumber}
                  </div>
                  <div className="text-xs text-gray-500">Flight</div>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={passenger.avatar}
                      alt={passenger.name}
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
                      {passenger.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {passenger.name}
                    </div>
                    {(passenger.age || passenger.gender) && (
                      <div className="text-xs text-gray-500">
                        {[
                          passenger.age && `${passenger.age} years`,
                          passenger.gender,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{ color: "#1E3A5F" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="opacity-80"
                  >
                    <path d="M4 8h16v2H4V8zm0 4h16v6H4v-6zm2 2v2h2v-2H6zm4 0v2h2v-2h-2z" />
                  </svg>
                  <span className="text-sm font-medium">{seatClass}</span>
                </div>
              </div>
            </div>

            {/* Notches and Dashed Line */}
            <div className="relative">
              {/* Left Notch */}
              <div
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{ backgroundColor: "#F5F5F7" }}
              />
              {/* Right Notch */}
              <div
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{ backgroundColor: "#F5F5F7" }}
              />
              {/* Dashed Line */}
              <div
                className="mx-6 border-t-2 border-dashed"
                style={{ borderColor: "#E0E0E0" }}
              />
            </div>

            {/* QR Code Section */}
            <div className="p-5 pt-6 flex justify-center">
              {qrCode ? (
                <img
                  src={qrCode}
                  alt="Boarding Pass QR Code"
                  className="w-40 h-40"
                />
              ) : (
                <div className="w-40 h-40">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                  >
                    {/* QR Code Pattern Simulation */}
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="white"
                    />
                    {/* Corner Squares */}
                    <rect
                      x="5"
                      y="5"
                      width="25"
                      height="25"
                      fill="black"
                    />
                    <rect
                      x="8"
                      y="8"
                      width="19"
                      height="19"
                      fill="white"
                    />
                    <rect
                      x="11"
                      y="11"
                      width="13"
                      height="13"
                      fill="black"
                    />

                    <rect
                      x="70"
                      y="5"
                      width="25"
                      height="25"
                      fill="black"
                    />
                    <rect
                      x="73"
                      y="8"
                      width="19"
                      height="19"
                      fill="white"
                    />
                    <rect
                      x="76"
                      y="11"
                      width="13"
                      height="13"
                      fill="black"
                    />

                    <rect
                      x="5"
                      y="70"
                      width="25"
                      height="25"
                      fill="black"
                    />
                    <rect
                      x="8"
                      y="73"
                      width="19"
                      height="19"
                      fill="white"
                    />
                    <rect
                      x="11"
                      y="76"
                      width="13"
                      height="13"
                      fill="black"
                    />

                    {/* Random Pattern */}
                    {Array.from({ length: 50 }).map((_, i) => {
                      const x = 35 + (i % 7) * 5;
                      const y = 35 + Math.floor(i / 7) * 5;
                      return Math.random() > 0.5 ? (
                        <rect
                          key={i}
                          x={x}
                          y={y}
                          width="4"
                          height="4"
                          fill="black"
                        />
                      ) : null;
                    })}
                    {Array.from({ length: 20 }).map((_, i) => {
                      const x = 35 + (i % 7) * 5;
                      const y = 5 + Math.floor(i / 7) * 5;
                      return Math.random() > 0.4 ? (
                        <rect
                          key={`t${i}`}
                          x={x}
                          y={y}
                          width="4"
                          height="4"
                          fill="black"
                        />
                      ) : null;
                    })}
                    {Array.from({ length: 20 }).map((_, i) => {
                      const x = 5 + (i % 5) * 5;
                      const y = 35 + Math.floor(i / 5) * 5;
                      return Math.random() > 0.4 ? (
                        <rect
                          key={`l${i}`}
                          x={x}
                          y={y}
                          width="4"
                          height="4"
                          fill="black"
                        />
                      ) : null;
                    })}
                    {Array.from({ length: 25 }).map((_, i) => {
                      const x = 70 + (i % 5) * 5;
                      const y = 35 + Math.floor(i / 5) * 5;
                      return Math.random() > 0.4 ? (
                        <rect
                          key={`r${i}`}
                          x={x}
                          y={y}
                          width="4"
                          height="4"
                          fill="black"
                        />
                      ) : null;
                    })}
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        {onCheckout && (
          <Button
            onClick={onCheckout}
            className="w-full mt-4 h-12 rounded-xl text-base font-medium"
            style={{
              backgroundColor: "#1E3A5F",
              color: "white",
            }}
          >
            {checkoutLabel}
          </Button>
        )}
      </div>
    );
  },
);

BoardingPass.displayName = "BoardingPass";

export { BoardingPass };
