// app/home/products/[id]/ReviewsClientWrapper.tsx
'use client'; 

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Product } from '@/app/lib/definitions';
import StarRating from '@/app/ui/products/star-rating'; 
import ReviewForm from './ReviewForm';
// Assuming the 'Review' type is correctly imported from ReviewList (The canonical source)
import ReviewList, { Review } from './ReviewList'; 

// --- CONSTANTS ---
const CURRENT_USER_ID = 1; // Mock current user ID

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
    
    // State definitions
    const [reviews, setReviews] = useState<Review[]>([]);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 

    // --- 1. Fetch Reviews on Mount (Simulated API Call) ---
    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Simulate network delay and fetch reviews for the product
                await new Promise(resolve => setTimeout(resolve, 500)); 

                // *** REPLACE THIS WITH YOUR ACTUAL FETCH CALL ***
                // Example: const response = await fetch(`/api/products/${productId}/reviews`);
                
                // MOCK DATA (to demonstrate initial functionality):
                const MOCK_REVIEWS_DB: Review[] = [
                    { id: productId, reviewId: 101, userId: 1, userName: 'Current User (You)', rating: 5, title: 'Stunning!', content: 'Great craftsmanship.', date: new Date('2024-01-15T10:30:00Z') },
                    { id: productId, reviewId: 102, userId: 2, userName: 'Emma R.', rating: 4, title: 'Great value', content: 'Very sturdy.', date: new Date('2024-01-10T14:45:00Z') },
                ];
                const fetchedReviews: Review[] = MOCK_REVIEWS_DB.filter(r => r.id === productId); 
                // **********************************************

                setReviews(fetchedReviews);
            } catch (err) {
                console.error("Fetch reviews error:", err);
                setError('Could not load reviews. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [productId]); 

    // Find current user's review
    const currentUserReview = useMemo(() => 
        reviews.find(r => r.userId === CURRENT_USER_ID), 
        [reviews]
    );

    // --- 2. Submit/Update Review (ASYNCHRONOUS) ---
    const handleSubmitReview = useCallback(async (reviewData: Omit<Review, 'reviewId' | 'userId' | 'userName' | 'date' | 'id'>) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const now = new Date();
            let submittedReview: Review;

            if (editingReview) {
                // UPDATE logic
                const updatedReview: Review = {
                    ...editingReview,
                    ...reviewData,
                    date: now,
                };
                
                // *** REPLACE WITH API CALL: await fetch(`/api/reviews/${editingReview.reviewId}`, { method: 'PUT', body: JSON.stringify(updatedReview) });
                await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
                submittedReview = updatedReview; 
                
                setReviews(prev => prev.map(r => 
                    r.reviewId === editingReview.reviewId ? submittedReview : r
                ));
                setEditingReview(null); // Exit edit mode only upon success
            } else {
                // CREATE logic
                if (currentUserReview) {
                    throw new Error("User already has a review. Update the existing one instead.");
                }

                const newReviewData: Review = {
                    ...reviewData,
                    reviewId: Date.now(), // Mock ID
                    userId: CURRENT_USER_ID,
                    userName: 'Current User (You)', 
                    date: now,
                    id: productId,
                } as Review;

                // *** REPLACE WITH API CALL: const response = await fetch(`/api/reviews`, { method: 'POST', body: JSON.stringify(newReviewData) });
                await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
                submittedReview = newReviewData; // Mock return
                
                setReviews(prev => [submittedReview, ...prev]);
            }
        } catch (err: any) {
            console.error("Submission error:", err);
            setError(`Review submission failed: ${err.message || 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    }, [editingReview, currentUserReview, productId]);
    
    // 🔥 FIX: Edit Review Handler (MOVED INSIDE COMPONENT)
    const handleEditClick = useCallback((review: Review) => {
        setEditingReview(review);
    }, []);

    // --- 3. Delete Review (ASYNCHRONOUS) ---
    const handleDeleteReview = useCallback(async (reviewId: number) => {
        if (!window.confirm('Are you sure you want to delete your review? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            // *** REPLACE WITH API CALL: await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
            await new Promise(resolve => setTimeout(resolve, 300)); 

            setReviews(prev => prev.filter(r => r.reviewId !== reviewId));
            if (editingReview?.reviewId === reviewId) {
                setEditingReview(null);
            }
        } catch (err) {
            console.error("Deletion error:", err);
            setError('Review deletion failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [editingReview]);


    // Calculate dynamic review count and average
    const actualReviewCount = reviews.length;
    const actualAverageRating = actualReviewCount > 0 
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / actualReviewCount
        : productRating; 

    return (
        <section className="mt-16 pt-10 border-t border-gray-100">
            <h2 className="text-3xl font-serif text-[#2C3E50] mb-8">Customer Reviews</h2>

            {/* Display Loading/Error State */}
            {isLoading && !reviews.length && (
                <p className="p-4 text-center text-blue-600">Loading reviews...</p>
            )}
            {error && (
                <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                    {error}
                </div>
            )}
            
            <div className="flex items-center mb-6">
                <StarRating rating={actualAverageRating} />
                <span className="text-xl text-[#2C3E50] ml-3 font-bold">{actualAverageRating.toFixed(1)} out of 5</span>
                <span className="text-gray-500 ml-4">({actualReviewCount} total ratings)</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review Form Component */}
                <div className="lg:col-span-1 lg:sticky lg:top-8 self-start p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                    <ReviewForm 
                        onSubmit={handleSubmitReview}
                        editingReview={editingReview}
                        currentUserReview={currentUserReview}
                        isEditing={!!editingReview}
                        onCancelEdit={() => setEditingReview(null)}
                        isSubmitting={isLoading} // Pass loading state
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