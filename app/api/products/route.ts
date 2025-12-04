import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/app/lib/mockData';
import { ProductFilters, buildProductQuery, buildSortOptions } from '@/app/lib/database/filters';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Build filters from query params
    const filters: ProductFilters = {
      sellerId: searchParams.get('sellerId') || undefined,
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      inStock: searchParams.get('inStock') ? searchParams.get('inStock') === 'true' : undefined,
      search: searchParams.get('search') || undefined,
      sortBy: (searchParams.get('sortBy') as ProductFilters['sortBy']) || 'newest',
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    };

    // Apply filters (simulating database query)
    let filteredProducts = [...mockProducts];

    // Filter by seller
    if (filters.sellerId) {
      filteredProducts = filteredProducts.filter(p => p.sellerId === filters.sellerId);
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
    }

    // Filter by stock
    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'oldest':
        filteredProducts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'newest':
      default:
        filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Pagination
    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(
      filters.offset,
      filters.offset! + filters.limit!
    );

    return NextResponse.json({
      success: true,
      data: paginatedProducts,
      meta: {
        total,
        count: paginatedProducts.length,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: (filters.offset! + filters.limit!) < total,
      },
      filters: filters, // Return applied filters for debugging
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.sellerId || !body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    const newProduct = {
      id: `product_${Date.now()}`,
      ...body,
      rating: 0,
      images: body.images || [''],
      inStock: body.inStock ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}