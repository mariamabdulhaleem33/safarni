import { Landmark, Building2, Mountain, Building, Waves, Church, Flower, Home, Castle } from 'lucide-react';

const cities = [
  { name: 'Paris', tagline: 'City of arts', icon: Landmark },
  { name: 'Rome', tagline: 'History lives here', icon: Building2 },
  { name: 'Rio De Janeiro', tagline: 'Joy shines here', icon: Mountain },
  { name: 'Dubai', tagline: 'Dream rise here', icon: Building },
  { name: 'London', tagline: 'City of culture', icon: Building2 },
  { name: 'Sydney', tagline: 'Vibes soar here', icon: Waves },
  { name: 'Beijing', tagline: 'Lives in tradition', icon: Church },
  { name: 'Amsterdam', tagline: 'City of Flowers', icon: Flower },
  { name: 'Berlin', tagline: 'City of arts', icon: Home },
  { name: 'Ankara', tagline: 'City of arts', icon: Building2 },
  { name: 'Pizza', tagline: 'City of arts', icon: Landmark },
  { name: 'Washington', tagline: 'City of arts', icon: Castle },
  { name: 'Malaysia', tagline: 'Family frindly', icon: Building2 },
  { name: 'Barselona', tagline: 'City of arts', icon: Church },
  { name: 'Florence', tagline: 'City of arts', icon: Castle },
  { name: 'Delhi', tagline: 'City of color', icon: Landmark },
  { name: 'Dhaka', tagline: 'City of arts', icon: Mountain },
  { name: 'Istanbul', tagline: 'City of arts', icon: Church },
  { name: 'Egypt', tagline: 'City of arts', icon: Mountain }
];
export default function SearchItemCard() {
    return (
        <>
            {cities.map((city, index) => {
          const Icon = city.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
                <Icon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-medium text-base">
                  {city.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {city.tagline}
                </p>
              </div>
            </div>
          );
        })}
        </>
  )
}
