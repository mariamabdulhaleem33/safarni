// src/pages/HotelPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotelCard from '@/components/hotel/HotelCard';
import { hotelApi } from '@/services/hotelApi';
import type { Hotel, PaginationLinks } from '@/services/hotelApi';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCurrentHotel } from '@/store/slices/hotelSlice';

const normalizeRating = (rating: number) => {
  if (rating < 0) return 0;
  if (rating > 5) return 5;
  return Math.round(rating * 2) / 2;
};

const HotelPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<PaginationLinks | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadInitialHotels();
  }, []);

  const formatHotels = (data: Hotel[]) =>
    data.map(hotel => ({
      ...hotel,
      rating: normalizeRating(hotel.rating),
      image: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      pricePerNight: hotel.pricePerNight || Math.floor(Math.random() * 200) + 100,
    }));

  const loadInitialHotels = async () => {
    setLoading(true);
    try {
      const response = await hotelApi.getAllHotels(1);
      if (response.status !== 'success') throw new Error(response.message);

      const formattedHotels = formatHotels(response.data);
      setHotels(formattedHotels);
      setLinks(response.links || null);
      setError(null);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const loadByUrl = async (url: string) => {
    setLoading(true);
    try {
      const response = await hotelApi.getByUrl(url);
      if (response.status !== 'success') throw new Error(response.message);

      setHotels(formatHotels(response.data as Hotel[]));
      setLinks(response.links || null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setIsSearching(false);
      loadInitialHotels();
      return;
    }

    setLoading(true);
    setIsSearching(true);

    try {
      const response = await hotelApi.searchHotels(searchQuery.trim());
      if (response.status !== 'success') throw new Error(response.message);

      setHotels(formatHotels(response.data));
      setLinks(null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Search failed');
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelClick = (hotel: Hotel) => {
    dispatch(
      setCurrentHotel({
        ...hotel,
        amenities: hotel.content_info ? [hotel.content_info] : ['Luxury'],
        gallery: hotel.image ? [hotel.image] : undefined,
      })
    );

    navigate(`/hotel/${hotel.id}/about`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex gap-4 items-center">
          <button onClick={() => navigate('/')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">←</button>

          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search hotels by name or location..."
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Search</button>
            {isSearching && (
              <button type="button" onClick={loadInitialHotels} className="px-4 py-2 bg-gray-200 rounded-lg">Clear</button>
            )}
          </form>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : hotels.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map(hotel => (
                <HotelCard
                  key={hotel.id}
                  name={hotel.name}
                  location={hotel.location}
                  rating={hotel.rating}
                  pricePerNight={hotel.pricePerNight || 150}
                  image={hotel.image || ''}
                  amenities={[hotel.content_info || 'Luxury']}
                  onClick={() => handleHotelClick(hotel)}
                />
              ))}
            </div>

            {!isSearching && links && (
              <div className="flex justify-center gap-4 mt-8">
                <button
                  disabled={!links.prev}
                  onClick={() => links.prev && loadByUrl(links.prev)}
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={!links.next}
                  onClick={() => links.next && loadByUrl(links.next)}
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">No hotels found</div>
        )}
      </div>
    </div>
  );
};

export default HotelPage;