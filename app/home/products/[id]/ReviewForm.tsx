// app/home/products/[id]/ReviewForm.tsx
'use client'; // This is also a client component

import { useState, useEffect } from 'react';
import StarRating from '@/app/ui/products/star-rating';
import { Review } from './ReviewsClientWrapper';

// Interactive Star Picker
const StarPicker = ({ currentRating, setRating }: { currentRating: number, setRating: (r: number) => void }) => {
    const maxStars = 5;
    const mustard = '#E7BB41';

    return (
        <div className="flex items-center space-x-1 cursor-pointer">
            {Array.from({ length: maxStars }).map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <span 
                        key={index}
                        className="text-2xl transition-colors"
                        style={{ color: ratingValue <= currentRating ? mustard : '#ccc' }}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={(e) => {
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
    onSubmit: (reviewData: Omit<Review, 'reviewId' | 'userId' | 'userName' | 'date'>) => void;
    editingReview: Review | null;
    currentUserReview: Review | undefined;
    isEditing: boolean;
    onCancelEdit: () => void;
}

export default function ReviewForm({ 
    onSubmit, 
    editingReview, 
    currentUserReview, 
    isEditing, 
    onCancelEdit 
}: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const isUserBlockedFromNewReview = !isEditing && !!currentUserReview;

    // Effect to populate form fields when starting an edit
    useEffect(() => {
        if (editingReview) {
            setRating(editingReview.rating);
            setTitle(editingReview.title);
            setContent(editingReview.content);
        } else if (isUserBlockedFromNewReview) {
            // If user has a review but isn't editing, show their review's data
            setRating(currentUserReview.rating);
            setTitle(currentUserReview.title);
            setContent(currentUserReview.content);
        } else {
            // Reset for new review
            setRating(0);
            setTitle('');
            setContent('');
        }
    }, [editingReview, currentUserReview, isUserBlockedFromNewReview]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a star rating.");
            return;
        }

        const reviewData = {
            id: editingReview?.id || 1, // product id (mocked to 1 for simplicity)
            rating,
            title,
            content,
        };

        onSubmit(reviewData);
        onCancelEdit(); // Reset form after submission
    };

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
                        <StarPicker currentRating={rating} setRating={setRating} />
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7E9F8E]"
                        ></textarea>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className={`flex-grow bg-[#E7BB41] text-[#2C3E50] text-lg font-body py-2 rounded-md font-bold hover:bg-opacity-90 transition-colors focus:ring-4 focus:ring-[#E7BB41] cursor-pointer focus:ring-offset-2 ${!title || !content || rating === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
                            disabled={!title || !content || rating === 0}
                        >
                            {isEditing ? 'Update Review' : 'Submit Review'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={onCancelEdit}
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
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
