<<<<<<< HEAD
# 🍽️ Canteen Management System

A modern, full-stack web application for managing canteen operations with user authentication, menu management, order processing, and admin controls.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin/User)
- Protected routes

### 🍴 Menu Management
- Browse menu items by categories
- Real-time stock tracking
- Admin-only item addition
- Beautiful, responsive menu display

### 🛒 Cart & Ordering
- Interactive shopping cart
- Add/remove items with stock validation
- Quantity controls with max stock limits
- Order placement and tracking

### 👨‍💼 Admin Features
- Order management dashboard
- Order status updates (pending → confirmed → completed → cancelled)
- Inventory management
- User order oversight

### 📱 Modern UI/UX
- Responsive design for all devices
- Clean, professional interface
- Smooth animations and transitions
- Mobile-optimized layouts

## 🚀 Tech Stack

### Frontend
- **React.js** - Modern UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Modern styling with flexbox/grid

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
inf_locus/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── menuItemController.js
│   │   └── orderController.js
│   ├── jobs/
│   │   └── orderCancellation.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── menuItemRoutes.js
│   │   └── orderRoutes.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js
│   │   ├── components/
│   │   │   ├── CountdownTimer.jsx
│   │   │   └── MenuItemCard.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── AddItemPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MenuPage.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── OrderStatusPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Usage

1. **Access the application** at `http://localhost:5173`
2. **Register** a new account or **login** with existing credentials
3. **Browse menu items** organized by categories
4. **Add items to cart** with quantity controls
5. **Place orders** and track their status
6. **Admin users** can:
   - Add new menu items
   - Manage all orders
   - Update order statuses

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Menu Items
- `GET /api/menu-items` - Fetch all menu items
- `POST /api/menu-items` - Add new menu item (Admin only)

### Orders
- `GET /api/orders` - Fetch user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin only)

## 🎯 Key Features Implemented

- ✅ User authentication with role-based access
- ✅ Responsive menu display with categories
- ✅ Shopping cart with stock validation
- ✅ Order management system
- ✅ Admin dashboard for order oversight
- ✅ Inventory tracking and restoration
- ✅ Modern, professional UI design
- ✅ Mobile-responsive layouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

- **GitHub**: [@nubu-046](https://github.com/nubu-046)

---

Made with ❤️ for efficient canteen management
