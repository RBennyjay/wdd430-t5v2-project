import { mockSellers } from "@/app/lib/mockData";
import StarRating from "@/app/ui/common/star-rating";
import Link from "next/link";
import { createServer } from "@/app/lib/supabase";

export default function SellersPage() {
  return (
    <div>
      {/* Page Header */}
      <header className="mb-12">
        <h1
          className="text-4xl md:text-5xl font-serif text-[#2C3E50] mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Meet Our Makers
        </h1>
        <p
          className="text-lg text-[#2C3E50] max-w-3xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Discover the talented artisans behind every handcrafted piece. Each
          maker brings their unique story, passion, and expertise to create
          exceptional products.
        </p>
      </header>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSellers.map((seller) => (
          <div
            key={seller.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            {/* Banner Image */}
            <div className="relative w-full h-40 bg-gradient-to-r from-[#7E9F8E] to-[#2C3E50]">
              {seller.bannerImage ? (
                <img
                  src={seller.bannerImage}
                  alt={`${seller.name} banner`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-sm">
                  Banner Image
                </div>
              )}

              {/* Profile Image - Positioned over banner */}
              <div className="absolute -bottom-12 left-6">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-md">
                  {seller.profileImage ? (
                    <img
                      src={seller.profileImage}
                      alt={seller.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                      Logo
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="pt-16 p-6">
              {/* Seller Name */}
              <h2
                className="text-2xl font-serif text-[#2C3E50] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {seller.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={seller.rating} />
                <span
                  className="text-sm text-[#2C3E50]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  ({seller.rating})
                </span>
              </div>

              {/* Bio */}
              <p
                className="text-[#2C3E50] mb-4 line-clamp-3"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {seller.bio}
              </p>

              {/* Product Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {seller.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#FAF9F6] text-[#2C3E50] text-sm rounded-full border border-[#7E9F8E]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Products Count */}
              <p
                className="text-sm text-gray-600 mb-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {seller.productsCount} products available
              </p>

              {/* Visit Page Button */}
              <Link
                href={`/home/seller/${seller.id}`}
                className="block w-full text-center bg-[#7E9F8E] text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-medium focus:ring-4 focus:ring-[#7E9F8E] focus:ring-offset-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Visit Page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
