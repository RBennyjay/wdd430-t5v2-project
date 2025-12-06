export interface Seller {
    id: string;
    name: string;
    bio: string;
    profileImage: string;
    bannerImage: string;
    categories: string[];
    rating: number;
    productsCount: number;
}

export interface Product {
    id: string;
    sellerId: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    rating: number;
    inStock: boolean;
    createdAt: Date;
}

export interface CartItem extends Product {
    quantity: number;
    sellerName: string;
}