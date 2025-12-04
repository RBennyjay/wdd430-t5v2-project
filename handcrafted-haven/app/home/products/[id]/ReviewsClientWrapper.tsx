// app/home/products/[id]/ReviewsClientWrapper.tsx
'use client'; // This must be a client component for state management

import { useState, useCallback, useMemo } from 'react';
import { Product } from '@/app/lib/definitions';
// Import the StarRating component from its own file for re-use
import StarRating from '@/app/ui/products/star-rating'; 
import ReviewForm from './ReviewForm';
import ReviewList, { Review } from './ReviewList';

// --- MOCK DATA AND TYPES ---
// Define a type for a single review
export interface Review extends Pick<Product, 'id'> {
    reviewId: number;
    userId: number; // Mock user ID (e.g., the current user)
    userName: string;
    rating: number; // 1-5
    title: string;
    content: string;
    date: Date;
}

// Mock reviews, filtered for a specific product ID (using product ID 1 for demonstration)
const MOCK_REVIEWS_DB: Review[] = [
    { 
        id: 1, reviewId: 101, userId: 1, userName: 'Current User (You)', 
        rating: 5, title: 'Absolutely stunning quality!', 
        content: 'This woven basket exceeded my expectations. The craftsmanship is superb and it adds a perfect rustic touch to my living room. Highly recommend!', 
        date: new Date('2024-01-15T10:30:00Z')
    },
    { 
        id: 1, reviewId: 102, userId: 2, userName: 'Emma R.', 
        rating: 4, title: 'Great value', 
        content: 'A little smaller than I pictured, but it’s very sturdy and the weave pattern is lovely. Fast shipping, too.', 
        date: new Date('2024-01-10T14:45:00Z')
    },
    { 
        id: 2, reviewId: 201, userId: 3, userName: 'John D.', 
        rating: 5, title: 'Perfect morning mug.', 
        content: 'Deeply satisfying to hold. The sage color is beautiful.', 
        date: new Date('2024-01-20T08:00:00Z')
    },
];

// Mock function to fetch reviews for the product
const getReviewsForProduct = (productId: number): Review[] => {
    return MOCK_REVIEWS_DB.filter(r => r.id === productId);
}
// --- END MOCK DATA ---

// Helper to find the current user's review (assuming userId 1 is the current user)
const CURRENT_USER_ID = 1;

interface ReviewsClientWrapperProps {
    productId: number;
    productRating: number;
    productReviewCount: number;
}

export default function ReviewsClientWrapper({ 
    productId, 
    productRating, 
    productReviewCount 
}: ReviewsClientWrapperProps) {
    // State to hold the list of reviews
    const [reviews, setReviews] = useState<Review[]>(() => getReviewsForProduct(productId));
    // State to hold the review currently being edited (null for new review)
    const [editingReview, setEditingReview] = useState<Review | null>(null);

    // Check if the current user has already written a review
    const currentUserReview = useMemo(() => 
        reviews.find(r => r.userId === CURRENT_USER_ID), 
        [reviews]
    );

    // --- CRUD Handlers ---

    // 1. Submit/Update Review
    const handleSubmitReview = useCallback((reviewData: Omit<Review, 'reviewId' | 'userId' | 'userName' | 'date'>) => {
        const now = new Date();
        
        if (editingReview) {
            // Update existing review
            const updatedReview: Review = {
                ...editingReview,
                ...reviewData,
                date: now, // Update date/time
            };
            setReviews(prev => prev.map(r => 
                r.reviewId === editingReview.reviewId ? updatedReview : r
            ));
            setEditingReview(null); // Exit edit mode
        } else {
            // Add new review
            const newReview: Review = {
                ...reviewData,
                reviewId: Date.now(), // Mock unique ID
                userId: CURRENT_USER_ID,
                userName: 'Current User (You)',
                date: now,
            };
            // Ensure the current user can only submit one review
            if (currentUserReview) {
                // In a real app, this would handle an error or update the existing review
                console.error("User already has a review. Update the existing one instead.");
                return;
            }
            setReviews(prev => [newReview, ...prev]); // Add new review to the top
        }
        // *In a real app, you'd send the data to your API here.*
    }, [editingReview, currentUserReview]);

    // 2. Edit Review Handler (sets the form state)
    const handleEditClick = useCallback((review: Review) => {
        setEditingReview(review);
    }, []);

    // 3. Delete Review
    const handleDeleteReview = useCallback((reviewId: number) => {
        // Confirmation dialog is recommended in a real app
        if (window.confirm('Are you sure you want to delete your review?')) {
            setReviews(prev => prev.filter(r => r.reviewId !== reviewId));
            // If the deleted review was the one being edited, reset the form
            if (editingReview?.reviewId === reviewId) {
                setEditingReview(null);
            }
            // *In a real app, you'd send the delete request to your API here.*
        }
    }, [editingReview]);

    // Calculate dynamic review count and average (mocking real data updates)
    const actualReviewCount = reviews.length;
    const actualAverageRating = actualReviewCount > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / actualReviewCount
        : productRating; // Fall back to mock product rating if no reviews exist

    return (
        <section className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-3xl font-serif text-[#2C3E50] mb-8">Customer Reviews</h2>

            <div className="flex items-center mb-6">
                <StarRating rating={actualAverageRating} />
                <span className="text-xl text-[#2C3E50] ml-3 font-bold">{actualAverageRating.toFixed(1)} out of 5</span>
                <span className="text-gray-500 ml-4">({actualReviewCount} total ratings)</span>
            </div>
            
            {/* === MAIN LAYOUT FOR REVIEWS AND FORM === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review Form Component (Permanent on the side) */}
                <div className="lg:col-span-1 lg:sticky lg:top-8 self-start p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                    <ReviewForm 
                        onSubmit={handleSubmitReview}
                        editingReview={editingReview}
                        currentUserReview={currentUserReview}
                        isEditing={!!editingReview}
                        onCancelEdit={() => setEditingReview(null)}
                    />
                </div>

                {/* Review List Component */}
                <div className="lg:col-span-2">
                    <ReviewList 
                        reviews={reviews} 
                        currentUserId={CURRENT_USER_ID}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteReview}
                    />
                </div>
            </div>
        </section>
    );
}