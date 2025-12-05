// // app/ui/star-rating.tsx
// import React from 'react';

// interface StarRatingProps {
//   rating: number;
// }

// const StarIcon = ({ filled }: { filled: boolean }) => (
//   <svg 
//     className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} 
//     fill="currentColor" 
//     viewBox="0 0 20 20" 
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path 
//       d="M9.049 2.927c.3-.921 1.636-.921 1.936 0l1.258 3.864 4.098.156c.96.036 1.348 1.254.61 1.834l-3.303 2.684 1.144 4.054c.277.98-.758 1.767-1.554 1.15L10 14.288l-3.568 2.214c-.796.617-1.831-.17-1.554-1.15l1.144-4.054-3.303-2.684c-.738-.58-.35-1.798.61-1.834l4.098-.156 1.258-3.864z"
//     />
//   </svg>
// );

// export default function StarRating({ rating }: StarRatingProps) {
//   const fullStars = Math.floor(rating);
//   const stars = [];

//   for (let i = 0; i < 5; i++) {
//     stars.push(
//       <StarIcon key={i} filled={i < fullStars} />
//     );
//   }

//   return (
//     <div className="flex items-center">
//       {stars}
//     </div>
//   );
// }