require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth/authRoutes');
const adminProductRouter = require('./routes/admin/productRoutes');
const adminOrderRouter = require('./routes/admin/orderRoutes');

const shoppingProductRouter = require('./routes/shop/productRoutes');
const shoppingCartRouter = require('./routes/shop/cartRoutes');
const ShoppingAddressRouter = require('./routes/shop/addressRoutes');
const ShoppingOrderRouter = require('./routes/shop/orderRoutes');
const ShoppingSearchRouter = require('./routes/shop/searchRoutes');
const ShoppingReviewRouter = require('./routes/shop/reviewRoutes');

const CommonFeatureRouter = require('./routes/common/featureRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.error('MongoDB connection error: ', err));

// Body parsing middleware
app.use(
	cors({
		origin: process.env.CLIENT_BASE_URL,
		methods: ['GET', 'POST', 'DELETE', 'PUT'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'Expires',
			'Pragma',
		],
		credentials: true,
	})
);

app.options('*', cors()); // Preflight handler

app.use(express.json());
app.use(cookieParser());

//  api routes
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/admin/orders', adminOrderRouter);

app.use('/api/shop/products', shoppingProductRouter);
app.use('/api/shop/cart', shoppingCartRouter);
app.use('/api/shop/address', ShoppingAddressRouter);
app.use('/api/shop/order', ShoppingOrderRouter);
app.use('/api/shop/search', ShoppingSearchRouter);
app.use('/api/shop/review', ShoppingReviewRouter);

app.use('/api/common/feature', CommonFeatureRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
