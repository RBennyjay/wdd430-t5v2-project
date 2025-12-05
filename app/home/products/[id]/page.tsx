// app/home/products/[id]/page.tsx

import allProducts from '../../../lib/products';
import ProductDetailPageClient from "./ProductDetailPageClient";

interface Props {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: Props) {
  // unwrap params in case it's a Promise
  const { id } = await params;
  const productId = Number(id);

  // Find the matching product
  const product = allProducts.find((p) => p.id === productId) || null;

  return <ProductDetailPageClient product={product} />;
}
