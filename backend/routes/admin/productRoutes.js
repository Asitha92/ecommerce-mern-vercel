const express = require('express');
const {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllProduct,
	handleImageUpload,
} = require('../../controllers/admin/productController');
const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload);
router.post('/add-product', addProduct);
router.put('/edit-product/:id', editProduct);
router.delete('/delete-product/:id', deleteProduct);
router.get('/product-list', fetchAllProduct);

module.exports = router;
