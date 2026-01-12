import { Car, Home, Plane, Map } from "lucide-react";
import type { Language, BookingType } from "../types/profile.types";

export const API_BASE_URL =
  "https://round8-safarni-team-three.huma-volve.com/api";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
  "image/webp",
];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
];

export const BOOKING_TYPES: {
  type: BookingType;
  icon: typeof Car;
  label: string;
}[] = [
  { type: "Car", icon: Car, label: "Cars" },
  { type: "Room", icon: Home, label: "Rooms" },
  { type: "Flight", icon: Plane, label: "Flights" },
  { type: "Tour", icon: Map, label: "Tours" },
];
