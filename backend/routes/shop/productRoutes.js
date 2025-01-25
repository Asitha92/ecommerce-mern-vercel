const express = require('express');
const {
	getFilteredProducts,
	getProductDetails,
} = require('../../controllers/shop/productController');

const router = express.Router();

router.get('/product-list', getFilteredProducts);
router.get('/product-list/:_id', getProductDetails);

module.exports = router;
