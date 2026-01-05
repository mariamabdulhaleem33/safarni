// pages/HotelPage/HotelPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import HotelGallery from '@/components/hotel/HotelGallery';
import HotelReviews from '@/components/hotel/HotelReviews';
import ReviewForm from '@/components/hotel/ReviewForm';
import HotelAbout from '@/components/hotel/HotelAbout';
import HotelCard from "@/components/hotel/HotelCard";

type TabType = 'about' | 'gallery' | 'review';

const HotelPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentHotel, reviews } = useAppSelector((state) => state.hotel);
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات Available Rooms
  const availableRooms = [
    {
      id: 101,
      name: 'Room_1',
      price: '2008',
      perNight: true,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304'
    },
    {
      id: 102,
      name: 'Hidden Haven',
      price: '1808',
      perNight: true,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32'
    },
    {
      id: 103,
      name: 'Silent Nest',
      price: '2008',
      perNight: true,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
    },
    {
      id: 104,
      name: 'Secret Escape',
      price: '2008',
      perNight: true,
      image: 'https://images.unsplash.com/photo-1576675784201-0e142b423952'
    }
  ];

  // بيانات التوصيات
  const recommendations = [
    {
      id: 1,
      name: 'Beachfront Paradise',
      location: 'Miami, Florida',
      rating: 4.8,
      price: '$299',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
      description: 'Luxury beachfront resort with private pool'
    },
    {
      id: 2,
      name: 'Mountain Retreat',
      location: 'Aspen, Colorado',
      rating: 4.6,
      price: '$349',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      description: 'Cozy mountain lodge with fireplace'
    },
    {
      id: 3,
      name: 'City Skyline Hotel',
      location: 'Chicago, Illinois',
      rating: 4.4,
      price: '$249',
      image: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8',
      description: 'Modern hotel in downtown'
    },
    {
      id: 4,
      name: 'Desert Oasis',
      location: 'Phoenix, Arizona',
      rating: 4.7,
      price: '$279',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
      description: 'Spa resort in the desert'
    },
    {
      id: 5,
      name: 'Historic Inn',
      location: 'Charleston, South Carolina',
      rating: 4.5,
      price: '$229',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90',
      description: 'Charming historic bed & breakfast'
    },
    {
      id: 6,
      name: 'Tropical Villa',
      location: 'Maui, Hawaii',
      rating: 4.9,
      price: '$499',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      description: 'Private villa with ocean view'
    }
  ];

  // بيانات الفنادق القريبة
  const nearbyHotels = [
    {
      id: 7,
      name: 'Downtown Suites',
      location: '0.5 miles away',
      rating: 4.3,
      price: '$189',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      description: 'Comfortable suites in city center',
      distance: '0.5 miles'
    },
    {
      id: 8,
      name: 'Riverside Inn',
      location: '0.8 miles away',
      rating: 4.2,
      price: '$159',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
      description: 'Quiet hotel by the river',
      distance: '0.8 miles'
    },
    {
      id: 9,
      name: 'Metro Hotel',
      location: '1.2 miles away',
      rating: 4.0,
      price: '$129',
      image: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7',
      description: 'Budget-friendly near metro station',
      distance: '1.2 miles'
    },
    {
      id: 10,
      name: 'Park View Hotel',
      location: '0.9 miles away',
      rating: 4.4,
      price: '$219',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      description: 'Luxury hotel with park view',
      distance: '0.9 miles'
    }
  ];

  const tabs: { id: TabType; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'review', label: 'Review' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <HotelAbout hotel={currentHotel} />;
      case 'gallery':
        return <HotelGallery images={currentHotel.gallery} galleryCount={200} />;
      case 'review':
        return (
          <div className="space-y-8">
            <ReviewForm />
            <HotelReviews reviews={reviews} />
          </div>
        );
      default:
        return null;
    }
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/room/${roomId}`);
  };

  const handleHotelClick = (hotelId: number) => {
    navigate(`/hotel/${hotelId}/about`);
  };

  const renderRoomCard = (room: any) => (
    <div
      key={room.id}
      onClick={() => handleRoomClick(room.id)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative h-48">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
          <div className="flex items-baseline">
            <span className="font-bold text-gray-900 text-lg">${room.price}</span>
            {room.perNight && <span className="text-gray-600 text-sm ml-1">Per Night</span>}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg mb-2">{room.name}</h3>
        {room.description && <p className="text-gray-600 text-sm line-clamp-2 mb-3">{room.description}</p>}
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar & Back Button */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center w-10 h-10 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
              title="Back to Home"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search hotels..."
              />
            </div>
          </div>
        </div>

        {/* Main Content - No Sidebar */}
        <div className="w-full">

          {/* Recommendations Section */}
          <div className="mt-12 mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  rating={hotel.rating}
                  pricePerNight={parseInt(hotel.price.replace('$', ''))}
                  image={hotel.image}
                  amenities={hotel.description ? [hotel.description] : []}
                  onClick={() => handleHotelClick(hotel.id)}
                />
              ))}
            </div>
          </div>

          {/* Nearby Hotels Section */}
          <div className="mt-12 mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nearby Hotels</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nearbyHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  onClick={() => handleHotelClick(hotel.id)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
                >
                  <div className="relative h-40">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow">
                      <span className="font-bold text-gray-900 text-sm">{hotel.price}</span>
                      <span className="text-gray-600 text-xs">/night</span>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-bold text-gray-900 text-base">{hotel.name}</h3>
                    <div className="flex items-center mt-1 text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {hotel.distance}
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex gap-2">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm">View</button>
                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">Book</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Rooms Section */}
          <div className="mt-12 mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Available Rooms</h2>
              <button className="text-blue-600 hover:text-blue-800 font-medium">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableRooms.map(renderRoomCard)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;