const express = require('express');
const {
	addToCart,
	fetchCartItems,
	deleteCartItems,
	updateCartItemsQuantity,
} = require('../../controllers/shop/cartController');

const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems);
router.delete('/:userId/:productId', deleteCartItems);
router.put('/updateCart', updateCartItemsQuantity);

module.exports = router;
