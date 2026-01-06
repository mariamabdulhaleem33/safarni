// components/ReviewForm/ReviewForm.tsx
import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addReview } from '../../store/slices/hotelSlice';
import { CiCamera, CiTrash } from "react-icons/ci";

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  userName: string;
  userId?: string; 
  photos: File[];
}

interface ReviewFormProps {
  onBack?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 0,
    title: '',
    comment: '',
    userName: 'Current User',
    userId: 'current_user_' + Date.now(), 
    photos: []
  });

  const [hoverRating, setHoverRating] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }

    if (!formData.comment.trim()) {
      alert('Please fill in your review');
      return;
    }

    dispatch(addReview({
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      userName: formData.userName,
      userId: formData.userId,
      photos: formData.photos 
    }));
    
    // Reset form
    setFormData({
      rating: 0,
      title: '',
      comment: '',
      userName: 'Current User',
      userId: 'current_user_' + Date.now(),
      photos: []
    });
    
    alert('Review submitted successfully!');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl text-center font-bold text-gray-900 mb-6">
        Your Own Rating Of This Product
      </h3>

      <div className="mb-6">
        <div className="flex justify-center space-x-2 mb-2">
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
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add detailed review
          </label>
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

        {/* عرض الصور المضافة */}
        {formData.photos.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Added Photos:</p>
            <div className="flex flex-wrap gap-3">
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="w-20 h-20 border rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(photo)} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CiTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden user ID input */}
        <input type="hidden" name="userId" value={formData.userId} />
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />

        {/* Buttons Row */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <button
            type="button"
            onClick={handleAddPhoto}
            className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <CiCamera className="h-5 w-5 mr-2" />
            <span>Add Photo</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;