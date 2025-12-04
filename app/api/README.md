# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Sellers

#### GET /api/sellers
Get all sellers with optional filtering

**Query Parameters:**
- `category` (string): Filter by category
- `search` (string): Search in name and bio
- `sortBy` (string): Sort by rating | products | name

**Example:**
```bash
GET /api/sellers?category=Kitchen&sortBy=rating
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

#### GET /api/sellers/[id]
Get a single seller

**Example:**
```bash
GET /api/sellers/1
```

---

### Products

#### GET /api/products
Get products with advanced filtering

**Query Parameters:**
- `sellerId` (string): Filter by seller ID
- `category` (string): Filter by category
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `inStock` (boolean): Only in-stock products
- `search` (string): Full-text search
- `sortBy` (string): price_asc | price_desc | rating | newest | oldest
- `limit` (number): Items per page (default: 20, max: 100)
- `offset` (number): Pagination offset (default: 0)

**Examples:**
```bash
# Get all products from seller 1
GET /api/products?sellerId=1

# Get Kitchen products between $10-$50
GET /api/products?category=Kitchen&minPrice=10&maxPrice=50

# Search for "ceramic"
GET /api/products?search=ceramic

# Get top-rated products
GET /api/products?sortBy=rating&limit=10

# Pagination
GET /api/products?limit=20&offset=20
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "total": 100,
    "count": 20,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

#### GET /api/products/[id]
Get a single product

**Example:**
```bash
GET /api/products/1
```

#### POST /api/products
Create a new product

**Body:**
```json
{
  "sellerId": "1",
  "name": "Ceramic Mug",
  "description": "Beautiful handmade mug",
  "price": 22.00,
  "category": "Kitchen",
  "inStock": true
}
```

#### PATCH /api/products/[id]
Update a product

**Body:**
```json
{
  "name": "Updated name",
  "price": 25.00
}
```

#### DELETE /api/products/[id]
Delete a product (soft delete)
```