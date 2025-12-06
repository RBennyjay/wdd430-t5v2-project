// Define the shape of the product data
export type Product = {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    link: string;
    // Add detail page specific properties here to centralize the definition
    description: string;
    sellerName: string;
    sellerId: number;
    reviewCount: number;
};