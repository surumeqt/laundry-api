# Laundry POS Appointment System API

A comprehensive backend API for a Laundry Management System built with Node.js, Express, and MongoDB. This system provides automated billing, order tracking, and user management for laundry services.

## 🚀 Features

- **User Authentication**: Secure registration, login, and logout with JWT tokens
- **Role-based Access**: Customer and admin roles with different permissions
- **Order Management**: Create, track, and update laundry orders
- **Automated Billing**: Calculate costs based on weight and services
- **Order History**: Archive completed orders for record-keeping
- **Profile Management**: Update user profiles and addresses
- **CORS Support**: Configured for frontend integration

## 🛠 Tech Stack

- **Runtime**: Node.js (>=22.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **CORS**: Enabled for cross-origin requests
- **Development**: Nodemon for hot reloading

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laundry-pos-appointment-system/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/laundry-db
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

## 📖 API Documentation

The API is organized into three main modules: Authentication, User Management, and Order Management.

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Access**: Public
- **Description**: Register a new user account

**Request Body**:
```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "message": "Registration successful. Redirecting to dashboard.",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer"
  }
}
```

#### Login User
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Access**: Public
- **Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful. Redirecting...",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "customer"
  }
}
```

#### Logout User
- **Method**: `POST`
- **Endpoint**: `/auth/logout`
- **Access**: Public
- **Description**: Clear authentication cookie and logout user

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out successfully.",
  "redirectTo": "/"
}
```

### User Management Endpoints

#### Get User Profile
- **Method**: `GET`
- **Endpoint**: `/me`
- **Access**: Private (requires authentication)
- **Description**: Retrieve current user's profile information

**Response** (200 OK):
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "role": "customer",
    "phone": "123-456-7890",
    "address": {
      "streetAddress": "123 Main St",
      "city": "Anytown",
      "postalCode": "12345",
      "addressNotes": "Apartment 4B"
    },
    "profilePictureBase64": "base64_encoded_image"
  }
}
```

#### Update User Profile
- **Method**: `PUT`
- **Endpoint**: `/profile`
- **Access**: Private (requires authentication)
- **Description**: Update user profile information

**Request Body** (all fields optional):
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "123-456-7890",
  "streetAddress": "123 Main St",
  "city": "Anytown",
  "postalCode": "12345",
  "addressNotes": "Apartment 4B",
  "profilePictureBase64": "base64_encoded_image"
}
```

**Response** (200 OK):
```json
{
  "_id": "user_id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "address": {
    "streetAddress": "123 Main St",
    "city": "Anytown",
    "postalCode": "12345",
    "addressNotes": "Apartment 4B"
  },
  "profilePictureBase64": "base64_encoded_image",
  "message": "Profile updated successfully"
}
```

### Order Management Endpoints

#### Create Order
- **Method**: `POST`
- **Endpoint**: `/orders/create-order`
- **Access**: Private (requires authentication)
- **Description**: Create a new laundry order

**Request Body**:
```json
{
  "method": "wash_dry",
  "pickupDate": "2024-01-20",
  "pickupTime": "10:00",
  "deliveryDate": "2024-01-22",
  "deliveryTime": "14:00"
}
```

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "userId": "user_id",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "method": "wash_dry",
    "pickupDate": "2024-01-20",
    "pickupTime": "10:00",
    "deliveryDate": "2024-01-22",
    "deliveryTime": "14:00",
    "address": {
      "streetAddress": "123 Main St",
      "city": "Anytown",
      "postalCode": "12345",
      "addressNotes": "Apartment 4B"
    },
    "status": "Pending",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### Get Orders
- **Method**: `GET`
- **Endpoint**: `/orders/get-orders`
- **Access**: Private (requires authentication)
- **Description**: Retrieve orders (all for admin, user's own for customers)

**Response** (200 OK):
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "order_id_1",
      "userId": "user_id",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "method": "wash_dry",
      "pickupDate": "2024-01-20",
      "pickupTime": "10:00",
      "deliveryDate": "2024-01-22",
      "deliveryTime": "14:00",
      "address": {
        "streetAddress": "123 Main St",
        "city": "Anytown",
        "postalCode": "12345",
        "addressNotes": "Apartment 4B"
      },
      "bill": {
        "weight": 5,
        "pricePerKg": 10,
        "additionalFees": 2,
        "totalAmount": 52,
        "billedAt": "2024-01-20T09:00:00.000Z"
      },
      "status": "Completed",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Update Order
- **Method**: `PUT`
- **Endpoint**: `/orders/update-order/:id`
- **Access**: Private (admin only)
- **Description**: Update order status and/or billing information

**Request Body** (fields optional):
```json
{
  "status": "In Progress",
  "bill": {
    "weight": 5,
    "pricePerKg": 10,
    "additionalFees": 2,
    "totalAmount": 52
  }
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "order_id",
    "userId": "user_id",
    "fullName": "John Doe",
    "status": "In Progress",
    "bill": {
      "weight": 5,
      "pricePerKg": 10,
      "additionalFees": 2,
      "totalAmount": 52,
      "billedAt": "2024-01-20T09:00:00.000Z"
    }
  }
}
```

#### Move Order to History
- **Method**: `POST`
- **Endpoint**: `/orders/move-to-history/:id`
- **Access**: Private (requires authentication)
- **Description**: Archive a completed order to history collection

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Order successfully moved to history"
}
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the JWT token in cookies for protected routes.

- **Token Storage**: HTTP-only cookies
- **Expiration**: 30 days
- **Security**: SameSite=None, Secure flags enabled

## 📊 Data Models

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['customer', 'admin'], default: 'customer'),
  phone: String,
  address: {
    streetAddress: String,
    city: String,
    postalCode: String,
    addressNotes: String
  },
  profilePictureBase64: String
}
```

### Order Model
```javascript
{
  userId: ObjectId (ref: User),
  fullName: String,
  email: String,
  phone: String,
  method: String,
  pickupDate: String,
  pickupTime: String,
  deliveryDate: String,
  deliveryTime: String,
  address: {
    streetAddress: String,
    city: String,
    postalCode: String,
    addressNotes: String
  },
  bill: {
    weight: Number,
    pricePerKg: Number,
    additionalFees: Number,
    totalAmount: Number,
    billedAt: Date
  },
  status: String (enum: ['Pending', 'Approved', 'Pick Up', 'In Progress', 'Out for Delivery', 'Completed', 'Cancelled']),
  createdAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Kenneth Esmena**

---

For more information or support, please contact the development team.