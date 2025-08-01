# E-Commerce MERN Application

A full-stack e-commerce web application with user and admin panels, built using the MERN stack (MongoDB, Express, React, Node.js) and deployed on Vercel.

Please have look at live application
[https://ecommerce-mern-vercel-self.vercel.app](https://ecommerce-mern-vercel-self.vercel.app/auth/signIn)
*Please sign up using dummy data to explore the application.*

![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/0.png?raw=true)
![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/1.png?raw=true)
![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/2.png?raw=true)
![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/3.png?raw=true)
![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/4.png?raw=true)
![image alt](https://github.com/Asitha92/ecommerce-mern-vercel/blob/main/5.png?raw=true)

## Features ✨
- 🛒 **Product Listing & Details**
- 👤 **User Authentication (JWT-based)**
- 🛍️ **Shopping Cart & Checkout**
- 📦 **Order Management**
- 🧑‍💼 **Admin Panel for Managing Products & Orders**
- 🧮 **Quantity & Stock Handling**
- ☁️ **Deployed on Vercel (Frontend & Backend)**

## Tech Stack
### 🖥️ Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- Axios

### 🗄️ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- CORS

## 📦 Prerequisites
- Node.js (v16+)
- npm
- MongoDB Atlas or local MongoDB instance
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/Asitha92/ecommerce-mern-vercel.git
cd ecommerce-mern-vercel
cd frontend - for frontend
cd backend - for backend

### 2. Install dependencies and run in local device
frontend > npm install
frontend > npm run dev

backend > npm install
backend > npm run dev

## Set up environment variables
### for backend
-CLOUDINARY_API_KEY=cloudinary api key
-CLOUDINARY_API_SECRET=cloudinary api secret
-CLOUDINARY_CLOUD_NAME=cloudinary cloud name

-PAYPAL_CLIENT_ID=paypal id
-PAYPAL_CLIENT_SECRET=paypal secret

-MONGODB_URI=your_mongodb_connection_string
-CLIENT_BASE_URL=http://localhost:3000
-PORT=5001

### frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001

## Vercel deployment
### Frontend
1. Push your code to GitHub
2. Go to https://vercel.com (Create an account and choose continue with github option)
3. Add your project to vercel (Add New button -> Project)
4. Select name, framework(Vite) and press Edit and choose frontend
5. Add environment variables(important: in frontend you must add backend vercel domain url)
6. Deploy

### Backend
1. Add your project to vercel (Add New button -> Project)
2. Select name, framework(Node) and press Edit and choose backend
3. Add environment variables(important: in backend you must add frontend vercel domain url)
4. Deploy

## Contributing

-Contributions are welcome! Please follow these steps:
-Fork the repository
-Create your feature branch (git checkout -b feature/AmazingFeature)
-Commit your changes (git commit -m 'Add some AmazingFeature')
-Push to the branch (git push origin feature/AmazingFeature)
-Open a Pull Request
