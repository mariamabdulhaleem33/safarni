import React from "react"

interface StarRatingProps {
  rating: number
  variant: "reviewCard" | "reviewTour"
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 3, variant }) => {
  const totalStars = 5

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex" }}>
        {[...Array(totalStars)].map((_, index) => {
          const starIndex = index + 1

          return (
            <svg
              key={index}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={`grad-${index}`}>
                  <stop offset="50%" stopColor="#ffb400" />
                  <stop offset="50%" stopColor="#e0e0e0" />
                </linearGradient>
              </defs>

              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                fill={
                  starIndex <= Math.floor(rating)
                    ? "#ffb400"
                    : starIndex === Math.ceil(rating) && rating % 1 !== 0
                    ? `url(#grad-${index})`
                    : "#e0e0e0"
                }
              />
            </svg>
          )
        })}
      </div>
      {variant !== "reviewCard" && (
        <span
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#4B4F63",
            marginLeft: "8px",
          }}
        >
          {rating}{" "}
          <span style={{ color: "#a0aec0", fontWeight: "normal" }}>(675)</span>
        </span>
      )}
    </div>
  )
}

export default StarRating
