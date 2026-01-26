// src/components/hotel/HotelReviews.tsx
import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from "@tanstack/react-form";
import { AiOutlineExport } from "react-icons/ai";
import ReviewForm from './ReviewForm';

interface HotelReviewsProps {
  onReviewFormToggle?: (isVisible: boolean) => void;
  onAddReview?: (reviewData: any) => Promise<void>;
  onHelpful?: (reviewId: number) => Promise<void>;
}

const HotelReviews: React.FC<HotelReviewsProps> = ({ 
  onReviewFormToggle,
  onAddReview,
  onHelpful 
}) => {
  const { reviews } = useAppSelector((state) => state.hotel);
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);

  const searchForm = useForm({
    defaultValues: {
      searchQuery: "",
    },
    onSubmit: async ({ value }) => {
      setSearchQuery(value.searchQuery);
      return;
    },
  });

  const handleHelpful = async (reviewId: number) => {
    if (onHelpful) {
      await onHelpful(reviewId);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (review.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    review.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Reviews ({reviews.length})</h2>
          <button
            onClick={() => {
              setShowReviewForm(!showReviewForm);
              onReviewFormToggle?.(!showReviewForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <div className="mb-8 p-4 border border-blue-100 rounded-xl bg-blue-50">
            <ReviewForm 
              onBack={() => {
                setShowReviewForm(false);
                onReviewFormToggle?.(false);
              }}
              onSubmit={async (data) => {
                setIsAddingReview(true);
                try {
                  if (onAddReview) {
                    await onAddReview(data);
                  }
                  setShowReviewForm(false);
                  onReviewFormToggle?.(false);
                } finally {
                  setIsAddingReview(false);
                }
              }}
              isSubmitting={isAddingReview}
            />
          </div>
        )}

        <div className="mb-6">
          <searchForm.Field
            name="searchQuery"
            children={(field) => (
              <div className="relative">
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Search reviews..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}
          />
        </div>

        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 fill-current ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                    </div>
                  </div>
                </div>
                
                {review.title && (
                  <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                )}
                
                <p className="text-gray-700 mb-4">{review.comment}</p>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({review.helpful})
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <AiOutlineExport className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No reviews found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelReviews;