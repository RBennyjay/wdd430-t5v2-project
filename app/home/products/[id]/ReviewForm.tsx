// app/home/products/[id]/ReviewForm.tsx
'use client'; 

import { useState, useEffect } from 'react';
import StarRating from '@/app/ui/products/star-rating';
// FIX: Import Review type directly from ReviewList, not the wrapper
import { Review } from './ReviewList'; 


// Interactive Star Picker (Unchanged)
const StarPicker = ({ currentRating, setRating, disabled }: { currentRating: number, setRating: (r: number) => void, disabled: boolean }) => {
    const maxStars = 5;
    const mustard = '#E7BB41';

    return (
        <div className={`flex items-center space-x-1 ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
            {Array.from({ length: maxStars }).map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span 
                        key={index}
                        className="text-2xl transition-colors"
                        style={{ color: ratingValue <= currentRating ? mustard : '#ccc' }}
                        onClick={() => !disabled && setRating(ratingValue)} // Disable click
                        onMouseEnter={(e) => {
                            if (disabled) return;
                            // Visually indicate hover selection
                            Array.from(e.currentTarget.parentElement?.children || []).forEach((child, i) => {
                                if (i <= index) {
                                    (child as HTMLElement).style.color = mustard;
                                } else {
                                    (child as HTMLElement).style.color = '#ccc';
                                }
                            });
                        }}
                        onMouseLeave={(e) => {
                            if (disabled) return;
                            // Reset to current state
                            Array.from(e.currentTarget.parentElement?.children || []).forEach((child, i) => {
                                (child as HTMLElement).style.color = (i + 1) <= currentRating ? mustard : '#ccc';
                            });
                        }}
                        aria-label={`Rate ${ratingValue} stars`}
                    >
                        ★
                    </span>
                );
            })}
            <span className="text-sm text-gray-600 ml-2">{currentRating > 0 ? `${currentRating} stars` : 'Select your rating'}</span>
        </div>
    );
};


interface ReviewFormProps {
    onSubmit: (reviewData: Omit<Review, 'reviewId' | 'userId' | 'userName' | 'date' | 'id'>) => void;
    editingReview: Review | null;
    currentUserReview: Review | undefined;
    isEditing: boolean;
    onCancelEdit: () => void;
    // NEW PROP: To disable the form while waiting for API response
    isSubmitting: boolean; 
}

export default function ReviewForm({ 
    onSubmit, 
    editingReview, 
    currentUserReview, 
    isEditing, 
    onCancelEdit,
    isSubmitting // Destructure new prop
}: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const isUserBlockedFromNewReview = !isEditing && !!currentUserReview;

    // Effect to populate form fields when starting an edit (Unchanged)
    useEffect(() => {
        if (editingReview) {
            setRating(editingReview.rating);
            setTitle(editingReview.title);
            setContent(editingReview.content);
        } else if (isUserBlockedFromNewReview) {
            // If user has a review but isn't editing, show their review's data
            setRating(currentUserReview!.rating); // Using non-null assertion since isUserBlockedFromNewReview checks it
            setTitle(currentUserReview!.title);
            setContent(currentUserReview!.content);
        } else {
            // Reset for new review
            setRating(0);
            setTitle('');
            setContent('');
        }
    }, [editingReview, currentUserReview, isUserBlockedFromNewReview]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prevent submission if API call is already running
        if (isSubmitting) return; 

        if (rating === 0) {
            alert("Please select a star rating.");
            return;
        }

        const reviewData = {
            // NOTE: We rely on the parent wrapper to inject the correct product ID and user data
            rating,
            title,
            content,
        };

        onSubmit(reviewData);
        // Do NOT call onCancelEdit() here. Let the parent component (ReviewsClientWrapper) 
        // handle state reset ONLY after a successful submission from the API.
        // onCancelEdit(); 
    };
    
    // Combine disable conditions
    const isFormDisabled = isSubmitting || !title || !content || rating === 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-serif text-[#2C3E50] mb-4">
                {isEditing ? `Edit Your Review (ID: ${editingReview?.reviewId})` : (isUserBlockedFromNewReview ? 'Your Existing Review' : 'Write a Review')}
            </h3>

            {isUserBlockedFromNewReview && !isEditing ? (
                <div className="text-gray-600 p-3 bg-white rounded border border-[#E7BB41]">
                    You have already submitted a review. To change it, click the <span className="font-bold">Edit</span> icon on your review below.
                </div>
            ) : (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating <span className="text-red-500">*</span></label>
                        <StarPicker currentRating={rating} setRating={setRating} disabled={isSubmitting} /> {/* Pass disabled state */}
                    </div>

                    <div>
                        <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                        <input
                            id="reviewTitle"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            required
                            disabled={isSubmitting} // Disable input while submitting
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E] disabled:bg-gray-100 disabled:text-gray-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="reviewContent" className="block text-sm font-medium text-gray-700 mb-1">Your Thoughts</label>
                        <textarea
                            id="reviewContent"
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            disabled={isSubmitting} // Disable textarea while submitting
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E] disabled:bg-gray-100 disabled:text-gray-500"
                        ></textarea>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            // Use the combined disabled state
                            className={`flex-grow bg-[#E7BB41] text-[#2C3E50] text-lg font-body py-2 rounded-md font-bold hover:bg-opacity-90 transition-colors focus:ring-4 focus:ring-[#E7BB41] cursor-pointer focus:ring-offset-2 
                                ${isFormDisabled ? 'opacity-60 cursor-not-allowed' : ''}
                                ${isSubmitting ? 'flex items-center justify-center' : ''}`}
                            disabled={isFormDisabled}
                        >
                            {/* Display loading text/spinner */}
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'Updating...' : 'Submitting...'}
                                </>
                            ) : (
                                isEditing ? 'Update Review' : 'Submit Review'
                            )}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                disabled={isSubmitting} // Disable cancel button while submitting
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </>
            )}
        </form>
    );
}