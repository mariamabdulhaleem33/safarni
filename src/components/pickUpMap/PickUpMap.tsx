import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import PickUpCarCard from "./PickUpCarCard";
import type { Car } from "@/types/car";

// marker fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// click handler
const ClickHandler = ({ onPick }: { onPick: (p: [number, number]) => void }) => {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

interface Props {
  car: Car;
}

const PickUpMap = ({ car }: Props) => {
  const carPosition: [number, number] = [37.7765, -122.4172];

  const [pickupPosition, setPickupPosition] = useState<[number, number]>([
    37.7749,
    -122.4194,
  ]);

  const [route, setRoute] = useState<[number, number][]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [midPoint, setMidPoint] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${carPosition[1]},${carPosition[0]};${pickupPosition[1]},${pickupPosition[0]}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      const coords = data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      );

      setRoute(coords);

      const seconds = data.routes[0].duration;
      setDuration(Math.ceil(seconds / 60));

      setMidPoint(coords[Math.floor(coords.length / 2)]);
    };

    fetchRoute();
  }, [pickupPosition]);

  return (
    <div className="relative h-[520px] w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={pickupPosition}
        zoom={14}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onPick={setPickupPosition} />

        <Marker position={carPosition} />
        <Marker position={pickupPosition} />

        {route.length > 0 && (
          <Polyline positions={route} pathOptions={{ color: "#2563eb", weight: 5 }} />
        )}

        {midPoint && duration > 0 && (
          <Marker
            position={midPoint}
            icon={L.divIcon({
              className: "",
              html: `
                <div style="
                  background-color:#fff;
                  padding:4px 26px;
                  border-radius:20px;
                  font-size:12px;
                  font-weight:600;
                  box-shadow:0 4px 12px rgba(0,0,0,.25);
                  text-change:uppercase;
                  cursor:pointer;
                  user-select:none;
                  flex-row-center;
                ">
                  ${duration} min
                </div>
              `,
            })}
          />
        )}
      </MapContainer>

      {/* FLOATING CARD */}
      <PickUpCarCard car={car} />
    </div>
  );
};

export default PickUpMap;