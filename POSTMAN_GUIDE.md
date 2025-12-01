# Werent API - Postman Collection

## 📦 Files Included

- `Werent_API.postman_collection.json` - Complete API collection
- `Werent_Development.postman_environment.json` - Development environment (localhost)
- `Werent_Production.postman_environment.json` - Production environment (Vercel)

## 🚀 How to Import

### Import Collection

1. Open Postman
2. Click **Import** button (top left)
3. Select `Werent_API.postman_collection.json`
4. Click **Import**

### Import Environments

1. Click **Import** button again
2. Select both environment files:
   - `Werent_Development.postman_environment.json`
   - `Werent_Production.postman_environment.json`
3. Click **Import**

### Select Environment

- Click the environment dropdown (top right)
- Choose **Werent Development** (for localhost) or **Werent Production** (for Vercel)

## 📝 API Endpoints Overview

### Authentication

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user profile (protected)

### Products

- **GET** `/api/products` - Get all products (with pagination & search)
- **GET** `/api/products/:id` - Get product by ID
- **POST** `/api/products` - Create new product (protected, with image upload)
- **GET** `/api/products/:id/reviews/summary` - Get reviews summary
- **GET** `/api/products/:id/reviews` - Get product reviews (with filters)

### Reviews

- **POST** `/api/reviews/products/:productId` - Create review (protected)
  - Basic: rating + content
  - With measurements: waist, bust, hips, fit
  - With media: images/videos (max 5 files)
- **POST** `/api/reviews/:id/helpful` - Mark review as helpful (protected)
- **DELETE** `/api/reviews/:id/helpful` - Remove helpful mark (protected)

## 🔑 Authentication Flow

1. **Register** or **Login** first
2. JWT token will be **automatically saved** to `jwt_token` variable
3. All protected endpoints will use this token automatically

## 💡 Usage Tips

### Auto-save JWT Token

The collection has scripts that automatically save JWT tokens after login/register:

```javascript
if (pm.response.code === 200 || pm.response.code === 201) {
  const response = pm.response.json();
  pm.environment.set('jwt_token', response.access_token);
  console.log('JWT Token saved:', response.access_token);
}
```

**Note:** Make sure you have selected an environment (Development or Production) before testing!

### Query Parameters

All GET endpoints support query parameters:

**Products:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search by name/description
- `sortBy` - Sort by: `createdAt`, `name`, `rating`
- `sortOrder` - Sort order: `asc`, `desc`

**Reviews:**

- `page` - Page number
- `limit` - Items per page
- `rating` - Filter by rating (1-5)
- `fit` - Filter by fit: `SMALL`, `TRUE`, `LARGE`
- `hasMedia` - Filter reviews with media: `true`, `false`
- `sortBy` - Sort by: `createdAt`, `rating`, `helpful`

### File Upload

For endpoints with file upload (form-data):

1. Select **Body** → **form-data**
2. Add fields as **text** type for regular data
3. Add fields as **file** type for images/videos

**File Limits:**

- Product image: max 5MB
- Review images: max 5MB per image
- Review videos: max 50MB per video
- Max 5 media files per review

### Example: Create Review with Everything

```
POST /api/reviews/products/1

Form-data:
- rating: 5
- content: "Amazing product! Highly recommended."
- waist: 70
- bust: 85
- hips: 90
- fit: TRUE
- media: [Select image file]
- media: [Select another image file]
```

## 🎯 Testing Workflow

### 1. Setup Account

```
1. Register → Auto-saves JWT token
2. (or) Login → Auto-saves JWT token
3. Get My Profile → Verify authentication
```

### 2. Create Product

```
1. Create Product → Upload product image
2. Get All Products → See your product
3. Get Product by ID → Check details
```

### 3. Add Reviews

```
1. Create Review (Basic) → Simple review
2. Create Review (With Measurements) → Add body measurements
3. Create Review (With Media) → Upload photos/videos
```

### 4. View Reviews

```
1. Get Reviews Summary → Check overall stats
2. Get Product Reviews → Browse all reviews
   - Filter by rating
   - Filter by fit type
   - Filter reviews with media only
```

### 5. Interact with Reviews

```
1. Mark Review as Helpful → Like a review
2. Remove Helpful Mark → Unlike a review
```

## 🔧 Environment Variables

### Development (localhost:3000)

```json
{
  "base_url": "http://localhost:3000",
  "jwt_token": ""
}
```

### Production (Vercel)

```json
{
  "base_url": "https://werent-be.vercel.app",
  "jwt_token": ""
}
```

## 📋 Request Body Examples

### Register

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create Product (form-data)

```
name: Premium Cotton Shirt
description: High-quality cotton shirt
price: 299000
image: [file]
```

### Create Review - Basic (form-data)

```
rating: 5
content: "Great product! Highly recommended."
```

### Create Review - Full (form-data)

```
rating: 5
content: "Perfect fit! Very satisfied."
waist: 70
bust: 85
hips: 90
fit: TRUE
media: [file1]
media: [file2]
```

## ✅ Response Examples

### Successful Login

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Product with Reviews

```json
{
  "id": 1,
  "name": "Premium Cotton Shirt",
  "description": "High-quality cotton shirt",
  "price": 299000,
  "imageUrl": "https://cloudinary.com/...",
  "averageRating": 4.5,
  "reviewCount": 10,
  "createdAt": "2025-12-01T00:00:00.000Z"
}
```

### Reviews Summary

```json
{
  "averageRating": 4.5,
  "totalReviews": 25,
  "ratingDistribution": {
    "1": 0,
    "2": 1,
    "3": 3,
    "4": 8,
    "5": 13
  },
  "fitDistribution": {
    "SMALL": 5,
    "TRUE": 15,
    "LARGE": 3
  }
}
```

## 🐛 Common Issues

### 401 Unauthorized

- Make sure you're logged in
- Check if JWT token is set in environment variables
- Token might be expired - login again

### 400 Bad Request

- Check required fields
- Verify data types (numbers, strings)
- Check file size limits

### 404 Not Found

- Verify the product/review ID exists
- Check the endpoint URL

## 📞 Support

If you encounter any issues:

1. Check the endpoint description
2. Verify authentication token
3. Check request body format
4. Review response error messages

---

**Happy Testing! 🚀**
