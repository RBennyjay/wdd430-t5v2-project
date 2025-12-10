// app/home/products/[id]/ReviewList.tsx

import StarRating from '@/app/ui/products/star-rating';
import { Product } from '@/app/lib/definitions'; // <-- ADDED: Import Product for type extension

// -------------------------------------------------------------------
// 🔥 FIX: Define and Export the Review type here as the canonical source
// This resolves the Type error: Module '"./ReviewsClientWrapper"' has no exported member 'Review'
// -------------------------------------------------------------------
export interface Review extends Pick<Product, 'id'> {
    reviewId: number;
    userId: number; // Mock user ID (e.g., the current user)
    userName: string;
    rating: number; // 1-5
    title: string;
    content: string;
    date: Date;
}

// NOTE: The line 'export type { Review };' is now redundant and can be removed.
// -------------------------------------------------------------------

interface ReviewListProps {
    reviews: Review[];
    currentUserId: number;
    onEditClick: (review: Review) => void;
    onDeleteClick: (reviewId: number) => void;
}

// Function to format the date (Unchanged)
const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function ReviewList({ reviews, currentUserId, onEditClick, onDeleteClick }: ReviewListProps) {
    if (reviews.length === 0) {
        return (
            <div className="p-8 text-center bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">Be the first to leave a review for this product!</p>
            </div>
        );
    }

    // Sort reviews to put the current user's review first, then by newest date (Unchanged)
    const sortedReviews = [...reviews].sort((a, b) => {
        if (a.userId === currentUserId) return -1; // Current user's review first
        if (b.userId === currentUserId) return 1;
        return b.date.getTime() - a.date.getTime(); // Then by newest date
    });

    return (
        <div className="space-y-8">
            {sortedReviews.map(review => {
                const isCurrentUserReview = review.userId === currentUserId;
                const reviewClasses = isCurrentUserReview 
                    ? "border-2 border-[#7E9F8E] p-6 rounded-lg shadow-lg" // Highlight user's review
                    : "border-b border-gray-100 pb-6";

                return (
                    <div key={review.reviewId} className={reviewClasses}>
                        <div className="flex justify-between items-start">
                            <StarRating rating={review.rating} />
                            {/* Edit and Delete Icons for the Current User's Review */}
                            {isCurrentUserReview && (
                                <div className="flex space-x-3 text-gray-500">
                                    <button 
                                        onClick={() => onEditClick(review)}
                                        className="hover:text-[#E7BB41] transition-colors cursor-pointer"
                                        aria-label="Edit Review"
                                    >
                                        {/* Edit Icon (Pencil) */}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </button>
                                    <button
                                        onClick={() => onDeleteClick(review.reviewId)}
                                        className="hover:text-red-500 transition-colors cursor-pointer"
                                        aria-label="Delete Review"
                                    >
                                        {/* Delete Icon (Trash) */}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-lg font-bold mt-2">{review.title}</p>
                        <p className="text-base text-gray-800 mt-1 leading-relaxed">{review.content}</p>

                        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                            <span className="font-semibold">{review.userName}</span>
                            <span>{formatDate(review.date)} {isCurrentUserReview && '(Your Review)'}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}