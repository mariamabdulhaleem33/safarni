import type {
  UserProfile,
  Booking,
  RawAdditionalInfo,
} from "../types/profile.types";

// Token
export const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Language Cookie
export const setTranslateCookie = (langCode: string): void => {
  const value = langCode === "en" ? "" : `/en/${langCode}`;
  document.cookie =
    "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
  if (value) {
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=.${window.location.hostname}`;
  }
};

export const getCurrentLanguage = (): string => {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
  return match ? match[1] : "en";
};

// Profile Helpers
export const getUserDisplayName = (profile: UserProfile | null): string => {
  if (!profile) return "Guest User";
  if (profile.full_name) return profile.full_name;
  if (profile.name) return profile.name;
  if (profile.first_name || profile.last_name) {
    return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
  }
  return "User";
};

export const getUserAvatar = (profile: UserProfile | null): string | null => {
  if (!profile) return null;
  return (
    profile.avatar ||
    profile.image ||
    profile.photo ||
    profile.profile_picture ||
    null
  );
};

export const getUserPhone = (profile: UserProfile | null): string => {
  if (!profile) return "";
  return profile.phone || profile.phone_number || "";
};

export const getUserLocation = (profile: UserProfile | null): string => {
  if (!profile) return "";
  return profile.location || profile.address || "";
};

// Booking Helpers
export const getNormalizedAdditionalInfo = (
  booking: Booking
): RawAdditionalInfo | null => {
  const info = booking.additional_info;
  if (!info) return null;

  if (Array.isArray(info)) {
    if (info.length === 0) return null;
    if (typeof info[0] === "object" && info[0] !== null) {
      return info[0] as RawAdditionalInfo;
    }
    return null;
  }

  if (typeof info === "object") {
    return info as RawAdditionalInfo;
  }

  return null;
};

export const formatMoney = (value?: number | string | null): string | null => {
  if (value === undefined || value === null) return null;
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return String(value);
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const getBookingName = (booking: Booking): string => {
  const info = getNormalizedAdditionalInfo(booking);

  if (booking.bookable?.name) return booking.bookable.name;
  if (booking.bookable?.title) return booking.bookable.title;
  if (info?.name) return info.name;
  if (info?.title) return info.title;
  if (info?.car_model) return info.car_model;

  const rawType = booking.bookable_type?.split("\\").pop();
  const type = rawType || "Booking";

  if (rawType?.toLowerCase() === "car") {
    return `Car Booking #${booking.id}`;
  }

  if (booking.bookable_type) {
    return `${type} Booking #${booking.id}`;
  }

  return `Booking #${booking.id}`;
};

export const getBookingDate = (booking: Booking): string => {
  const info = getNormalizedAdditionalInfo(booking);

  if (info) {
    if (info.check_in && info.check_out)
      return `${info.check_in} → ${info.check_out}`;
    if (info.start_date && info.end_date)
      return `${info.start_date} → ${info.end_date}`;
    if (info.pickup_date && info.dropoff_date)
      return `${info.pickup_date} → ${info.dropoff_date}`;
    if (info.date) return info.date;
    if (info.check_in) return info.check_in;
    if (info.start_date) return info.start_date;
    if (info.flight_date) return info.flight_date;
  }

  if (booking.created_at) return booking.created_at.split("T")[0];
  return "N/A";
};

export const getBookingPrice = (booking: Booking): string => {
  const info = getNormalizedAdditionalInfo(booking);
  const rawPrice = booking.total_amount ?? booking.price_paid ?? info?.price;
  const formatted = formatMoney(rawPrice as number | string | null);
  return formatted ? `$${formatted}` : "N/A";
};

export const getBookingDetails = (booking: Booking): string | null => {
  const info = getNormalizedAdditionalInfo(booking);
  const details: string[] = [];
  const rawType = booking.bookable_type?.split("\\").pop()?.toLowerCase();

  if (rawType === "car") {
    if (booking.quantity) {
      details.push(
        `${booking.quantity} ${booking.quantity > 1 ? "Cars" : "Car"}`
      );
    }
    if (booking.price_paid) {
      const unitPrice = formatMoney(booking.price_paid);
      if (unitPrice) details.push(`${unitPrice} per car`);
    }
    return details.length > 0 ? details.join(" • ") : null;
  }

  if (info?.nights) details.push(`${info.nights} Nights`);
  if (info?.days) details.push(`${info.days} Days`);
  if (info?.adults) details.push(`${info.adults} Adults`);
  if (info?.children && Number(info.children) > 0) {
    details.push(`${info.children} Children`);
  }
  if (booking.quantity) details.push(`${booking.quantity} Items`);

  return details.length > 0 ? details.join(" • ") : null;
};

export const getBookingImage = (booking: Booking): string | null => {
  const info = getNormalizedAdditionalInfo(booking);

  if (booking.bookable?.image) return booking.bookable.image;
  if (booking.bookable?.photo) return booking.bookable.photo;
  if (booking.bookable?.thumbnail) return booking.bookable.thumbnail;
  if (info?.image) return info.image;
  if (info?.photo) return info.photo;

  return null;
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "confirmed":
    case "completed":
    case "active":
    case "paid":
      return "bg-green-100 text-green-700";
    case "pending":
    case "processing":
    case "unpaid":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
    case "failed":
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
