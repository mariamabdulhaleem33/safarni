import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";

interface HotelGalleryProps {
  images: string[];
  galleryCount?: number;
}

const HotelGallery: React.FC<HotelGalleryProps> = ({
  images,
  galleryCount = 200,
}) => {
  const [galleryImages, setGalleryImages] = useState<string[]>(images);
  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0] || ""
  );

  const handleAddPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const imageUrl = URL.createObjectURL(file);
      setGalleryImages((prev) => [...prev, imageUrl]);
      setSelectedImage(imageUrl);
    };

    input.click();
  };

  if (!galleryImages.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          Gallery ({galleryImages.length})
        </h2>

        <button
          onClick={handleAddPhoto}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
        >
          <CiCamera className="h-5 w-5" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="p-6">
        {/* Main Image */}
        <div className="mb-6">
          <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt="Hotel"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative h-20 rounded-lg overflow-hidden ${
                selectedImage === image
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
