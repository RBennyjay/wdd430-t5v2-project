// app/home/products/[id]/page.tsx

import allProducts from '../../../lib/products';
import ProductDetailPageClient from "./ProductDetailPageClient";
import Link from 'next/link'; // Import Link for the not found page

interface Props {
  params: { id: string };
}

// NOTE: Ensure your allProducts data structure (or a corresponding fetch function) 
// includes: rating, reviewCount, sellerName, and sellerId
export default async function ProductDetailPage({ params }: Props) {
  // unwrap params in case it's a Promise (already handled by Next.js, but good practice)
  const { id } = await params;
  const productId = Number(id);

  // Find the matching product (assuming allProducts now has the rich data)
  // For a real app, you'd call a dedicated function like getProductDetails here
  const product = allProducts.find((p) => p.id === productId) || null;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-serif text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-4">The requested handcrafted treasure could not be located.</p>
        <Link href="/home/products" className="text-[#7E9F8E] font-bold mt-6 inline-block hover:underline">
          &larr; Back to All Products
        </Link>
      </div>
    );
  }


  return <ProductDetailPageClient product={product} />;
}