import { NextRequest, NextResponse } from 'next/server';
import { mockSellers } from '@/app/lib/mockData';

/**
 * GET /api/sellers
 * Get all sellers or filter by query params
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');

    let filteredSellers = [...mockSellers];

    // Filter by category
    if (category && category !== 'all') {
      filteredSellers = filteredSellers.filter(seller =>
        seller.categories.includes(category)
      );
    }

    // Search by name or bio
    if (search) {
      const searchLower = search.toLowerCase();
      filteredSellers = filteredSellers.filter(seller =>
        seller.name.toLowerCase().includes(searchLower) ||
        seller.bio.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filteredSellers.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'products') {
      filteredSellers.sort((a, b) => b.productsCount - a.productsCount);
    } else if (sortBy === 'name') {
      filteredSellers.sort((a, b) => a.name.localeCompare(b.name));
    }

    return NextResponse.json({
      success: true,
      data: filteredSellers,
      count: filteredSellers.length,
    });
  } catch (error) {
    console.error('Error fetching sellers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sellers' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sellers
 * Create a new seller
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || !body.email || !body.bio) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Save to database
    const newSeller = {
      id: `seller_${Date.now()}`,
      ...body,
      rating: 0,
      productsCount: 0,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: newSeller,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating seller:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create seller' },
      { status: 500 }
    );
  }
}