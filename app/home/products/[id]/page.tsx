// app/home/products/[id]/page.tsx

import allProducts from '../../../lib/products';
import ProductDetailPageClient from "./ProductDetailPageClient";
import Link from 'next/link'; 
// Remove the unused import for the client wrapper in the server component. 
// It is now only imported in ProductDetailPageClient.
// import ReviewsClientWrapper from './ReviewsClientWrapper'; 

interface Props {
  params: { id: string };
}

// Ensure allProducts data structure (or a corresponding fetch function) 
// includes: rating, reviewCount, sellerName, and sellerId
export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  // Find the matching product (assuming allProducts now has the rich data)
  const product = allProducts.find((p) => p.id === productId) || null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 text-center">
        <h1 className="text-3xl font-serif text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-4">The requested handcrafted treasure could not be located.</p>
        <Link href="/home/products" className="text-[#7E9F8E] font-bold mt-6 inline-block hover:underline">
          &larr; Back to All Products
        </Link>

        {/* === REVIEWS: REMOVED the incorrect placeholder call from the Not Found page === */}
      </div>
    );
  }

  // If product is found, render the client component with the product data.
  // The client component now handles rendering the ReviewsClientWrapper internally.
  return <ProductDetailPageClient product={product} />;
}