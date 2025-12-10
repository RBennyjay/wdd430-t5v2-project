// app/ui/products/star-rating.tsx

"use client";

// Reusable Star Rating component (uses the Interactive/Success color: Mustard #E7BB41)
const StarRating = ({ rating }: { rating: number }) => {
    const maxStars = 5;
    const mustard = '#E7BB41';
    
    return (
        <div className="flex space-x-0.5">
            {Array.from({ length: maxStars }).map((_, index) => (
                <span 
                    key={index} 
                    className="text-lg"
                    style={{ color: index < Math.floor(rating) ? mustard : '#ccc' }}
                    aria-hidden="true"
                >
                    ★
                </span>
            ))}
            <span className="sr-only">Rated {rating} out of 5 stars</span>
        </div>
    );
};

export default StarRating;