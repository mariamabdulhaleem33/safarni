import React, { useState } from 'react';
import type { Review } from '../../types/hotel.types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setHelpful } from '../../store/slices/hotelSlice';
import { useForm } from "@tanstack/react-form";
import { AiOutlineExport } from "react-icons/ai";
import ReviewForm from './ReviewForm';

interface HotelReviewsProps {
  reviews: Review[];
  onReviewFormToggle?: (isVisible: boolean) => void;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ reviews, onReviewFormToggle }) => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const searchForm = useForm({
    defaultValues: {
      searchQuery: "",
    },
    onSubmit: async ({ value }) => {
      setSearchQuery(value.searchQuery);
      return;
    },
  });

  const handleHelpful = (reviewId: number, currentHelpful: number) => {
    dispatch(setHelpful({ reviewId, helpful: currentHelpful + 1 }));
  };

  const filteredReviews = reviews.filter(review =>
    review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleReviewForm = (isVisible: boolean) => {
    setShowReviewForm(isVisible);
    if (onReviewFormToggle) {
      onReviewFormToggle(isVisible);
    }
  };

  const handleBackToReviews = () => {
    toggleReviewForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {!showReviewForm && (
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Review</h2>
          <button
            onClick={() => toggleReviewForm(true)}
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <AiOutlineExport />
            <span className="ml-2">add review</span>
          </button>
        </div>
      )}

      <div className="p-6">
        {!showReviewForm ? (
          <>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search reviews..."
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                          <button className="text-gray-400 hover:text-blue-500 transition-colors p-1">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleHelpful(review.id, review.helpful)}
                      className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Helpful ({review.helpful})
                    </button>
                    <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ReviewForm onBack={handleBackToReviews} />
        )}
      </div>
    </div>
  );
};

export default HotelReviews;