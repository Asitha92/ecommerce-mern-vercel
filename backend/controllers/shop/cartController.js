const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

const addToCart = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		if (!userId || !productId || quantity <= 0) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid data provided !' });
		}

		const productObjectId = new mongoose.Types.ObjectId(productId);

		// check if product is available
		const product = await Product.findById(productObjectId);
		if (!product) {
			return res
				.status(400)
				.json({ success: false, message: 'Product not found !' });
		}

		// check if user already has the product in cart
		let cart = await Cart.findOne({ userId });

		// if cart is not found, create a new one
		if (!cart) {
			cart = new Cart({ userId, items: [] });
		}

		// check whether current item is already in the cart
		const findCurrentProductIndex = cart.items.findIndex(
			(item) => item._id.toString() === productId
		);

		// if current item not in the cart add item or update quantity
		if (findCurrentProductIndex === -1) {
			cart.items.push({
				_id: productObjectId,
				quantity,
			});
		} else {
			cart.items[findCurrentProductIndex].quantity += quantity;
		}

		await cart.save();

		res.status(200).json({
			success: true,
			message: 'Product added to cart successfully !',
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error adding item to cart',
		});
	}
};

const fetchCartItems = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(400).json({
				success: false,
				message: 'User ID is required',
			});
		}

		const cart = await Cart.findOne({ userId }).populate({
			path: 'items._id',
			select: 'title price salePrice image',
		});

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: 'Cart not found !',
			});
		}

		// when user add item to cart, but admin already deleted the product
		// need to revalidate item product id present or not before proceeding
		const validItems = cart.items.filter((productItem) => productItem._id);

		if (validItems.length < cart.items.length) {
			cart.items = validItems;
			await cart.save();
		}

		// Populated product details
		const populateCartItems = validItems.map((item) => ({
			_id: item._id._id,
			image: item._id.image,
			title: item._id.title,
			price: item._id.price,
			salePrice: item._id.salePrice,
			quantity: item.quantity,
		}));

		res.status(200).json({
			success: true,
			message: 'Cart items fetched successfully',
			data: {
				...cart._doc,
				items: populateCartItems,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error adding item to cart',
		});
	}
};

const updateCartItemsQuantity = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		if (!userId || !productId || quantity <= 0) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid data provided !' });
		}

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return res.status(404).json({
				success: false,
				message: 'Cart not found !',
			});
		}

		const findCurrentProductIndex = cart.items.findIndex(
			(item) => item._id.toString() === productId
		);

		if (findCurrentProductIndex === -1) {
			return res.status(404).json({
				success: false,
				message: 'Product not found in cart !',
			});
		}

		cart.items[findCurrentProductIndex].quantity = quantity;

		await cart.save();

		await cart.populate({
			path: 'items._id',
			select: 'title price salePrice image',
		});

		const populateCartItems = cart.items.map((item) => ({
			_id: item._id ? item._id._id : null,
			image: item._id ? item._id.image : null,
			title: item._id ? item._id.title : null,
			price: item._id ? item._id.price : null,
			salePrice: item._id ? item._id.salePrice : null,
			quantity: item.quantity,
		}));

		return res.status(200).json({
			success: true,
			message: 'Cart items fetched successfully',
			data: {
				...cart._doc,
				items: populateCartItems,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error adding item to cart',
		});
	}
};

const deleteCartItems = async (req, res) => {
	try {
		const { userId, productId } = req.params;

		if (!userId || !productId) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid data provided !' });
		}

		const cart = await Cart.findOne({ userId });

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: 'Cart not found !',
			});
		}

		cart.items = cart.items.filter((item) => item._id.toString() !== productId);

		await cart.save();

		await cart.populate({
			path: 'items._id',
			select: 'title price salePrice image',
		});

		const populateCartItems = cart.items.map((item) => ({
			_id: item._id ? item._id._id : null,
			image: item._id ? item._id.image : null,
			title: item._id ? item._id.title : null,
			price: item._id ? item._id.price : null,
			salePrice: item._id ? item._id.salePrice : null,
			quantity: item.quantity,
		}));

		return res.status(200).json({
			success: true,
			message: 'Cart items fetched successfully',
			data: {
				...cart._doc,
				items: populateCartItems,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error adding item to cart !',
		});
	}
};

module.exports = {
	addToCart,
	fetchCartItems,
	updateCartItemsQuantity,
	deleteCartItems,
};
