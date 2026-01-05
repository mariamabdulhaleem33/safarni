// components/ReviewForm/ReviewForm.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addReview } from '../../store/slices/hotelSlice';

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userId?: string; // أضف هذا الحقل
}

const ReviewForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    comment: '',
    userName: 'Current User',
    userId: 'current_user_' + Date.now(), // إضافة معرف افتراضي
  });

  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!formData.title.trim() || !formData.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(addReview({
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      userName: formData.userName,
      userId: formData.userId,
    }));
    
    // Reset form
    setFormData({
      rating: 0,
      title: '',
      comment: '',
      userName: 'Current User',
      userId: 'current_user_' + Date.now(),
    });
    
    alert('Review submitted successfully!');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Your Own Rating Of This Product
      </h3>

      {/* Star Rating */}
      <div className="mb-6">
        <div className="flex space-x-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl focus:outline-none transition-transform hover:scale-110"
            >
              <span
                className={
                  star <= (hoverRating || formData.rating)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }
              >
                ★
              </span>
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600">
          {formData.rating > 0 ? `You rated: ${formData.rating} stars` : 'Click to rate'}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add detailed review
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter review title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Comment Textarea */}
        <div className="mb-6">
          <textarea
            name="comment"
            placeholder="Enter your review here..."
            value={formData.comment}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Hidden user ID input */}
        <input type="hidden" name="userId" value={formData.userId} />

        {/* Buttons Row */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <button
            type="button"
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Get Photo
          </button>

          <div className="flex space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Submit
        </button>
      </form>

      {/* Go Back Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Going back
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Choose Info</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input type="checkbox" id="anonymous" className="mr-2 rounded" />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Post as anonymous
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2 rounded" />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;