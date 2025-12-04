'use client';

import { mockSellers, mockProducts } from '@/app/lib/mockData';
import StarRating from '@/app/ui/common/star-rating';
import Modal from '@/app/ui/common/modal';
import Button from '@/app/ui/common/button';
import ProductForm from '@/app/ui/forms/product-form';
import ProductCard from '@/app/ui/cards/product-card';
import { notFound, useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Product } from '@/app/lib/types';

export default function SellerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  
  
  // State management
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Find seller
  const seller = mockSellers.find(s => s.id === id);
  
  if (!seller) {
    notFound();
  }
  
  // Filter products
  const sellerProducts = products.filter(p => p.sellerId === id);
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return sellerProducts;
    return sellerProducts.filter(p => p.category === activeFilter);
  }, [activeFilter, sellerProducts]);
  
  // CRUD Handlers
  const handleCreateProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      ...productData as Product,
      id: `product_${Date.now()}`,
      sellerId: id,
      images: [''],
      rating: 0,
      createdAt: new Date(),
    };
    setProducts([...products, newProduct]);
    setIsCreateModalOpen(false);
  };
  
  const handleUpdateProduct = (productData: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === selectedProduct?.id ? { ...p, ...productData } : p
    ));
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };
  
  const handleDeleteProduct = () => {
    setProducts(products.filter(p => p.id !== selectedProduct?.id));
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };
  
  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <section>
        {/* Banner */}
        <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-[#7E9F8E] to-[#2C3E50] rounded-lg overflow-hidden mb-6 shadow-lg">
          {seller.bannerImage ? (
            <img 
              src={seller.bannerImage} 
              alt={`${seller.name} banner`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-lg font-medium">
              Banner Image
            </div>
          )}
          
          {/* Profile Image */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-xl">
              {seller.profileImage ? (
                <img 
                  src={seller.profileImage} 
                  alt={seller.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                  Logo
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Seller Info */}
        <div className="pt-20 md:pt-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 
                className="text-3xl md:text-4xl font-serif text-[#2C3E50] mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {seller.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={seller.rating} />
                <span 
                  className="text-sm text-[#2C3E50] font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {seller.rating} rating
                </span>
                <span className="text-gray-400">•</span>
                <span 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {sellerProducts.length} products
                </span>
              </div>
              
              <p 
                className="text-[#2C3E50] max-w-3xl mb-6 leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {seller.bio}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {seller.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-[#FAF9F6] text-[#2C3E50] text-sm font-medium rounded-full border border-[#7E9F8E]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsCreateModalOpen(true)}
            >
              + Add Product
            </Button>
          </div>
        </div>
      </section>
      
      {/* Sticky Filters */}
      <div className="sticky top-0 z-10 bg-[#FAF9F6] border-b border-gray-200 py-4 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              activeFilter === 'all' 
                ? 'bg-[#7E9F8E] text-white shadow-md' 
                : 'bg-white text-[#2C3E50] border border-gray-300 hover:border-[#7E9F8E] hover:text-[#7E9F8E]'
            }`}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            All Products ({sellerProducts.length})
          </button>
          
          {seller.categories.map((category, index) => {
            const categoryCount = sellerProducts.filter(p => p.category === category).length;
            return (
              <button 
                key={index}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  activeFilter === category 
                    ? 'bg-[#7E9F8E] text-white shadow-md' 
                    : 'bg-white text-[#2C3E50] border border-gray-300 hover:border-[#7E9F8E] hover:text-[#7E9F8E]'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {category} ({categoryCount})
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Products Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-2xl md:text-3xl font-serif text-[#2C3E50]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {activeFilter === 'all' ? 'All Products' : activeFilter}
          </h2>
          <span 
            className="text-sm text-gray-600 font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                showActions={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <svg 
              className="mx-auto h-16 w-16 text-gray-400 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
              />
            </svg>
            <p 
              className="text-gray-500 text-lg mb-4"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              No products found in this category.
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => setActiveFilter('all')}
            >
              View all products
            </Button>
          </div>
        )}
      </section>
      
      {/* Create Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Product"
        size="lg"
      >
        <ProductForm
          sellerId={id}
          onSave={handleCreateProduct}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
      
      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Edit Product"
        size="lg"
      >
        {selectedProduct && (
          <ProductForm
            product={selectedProduct}
            sellerId={id}
            onSave={handleUpdateProduct}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Delete Product"
        size="sm"
      >
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg 
                className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <div>
                <h3 
                  className="text-sm font-semibold text-red-900 mb-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Warning: This action cannot be undone
                </h3>
                <p 
                  className="text-sm text-red-700"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Are you sure you want to delete <strong>"{selectedProduct?.name}"</strong>? 
                  All product data will be permanently removed.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={handleDeleteProduct}
            >
              Yes, Delete Product
            </Button>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedProduct(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}