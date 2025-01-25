const { imageUploadUtils } = require('../../helpers/cloudinary');
const Product = require('../../models/Product');

// add image files
const handleImageUpload = async (req, res) => {
	try {
		// convert file data to base64
		const b64 = Buffer.from(req.file.buffer).toString('base64');
		const url = 'data:' + req.file.mimetype + ';base64,' + b64;
		const result = await imageUploadUtils(url);

		res.json({
			success: true,
			message: 'Image uploaded successfully',
			result,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: 'Error occurred !',
		});
	}
};

// add new product
const addProduct = async (req, res) => {
	try {
		const {
			brand,
			category,
			description,
			image,
			price,
			salePrice,
			title,
			totalStock,
		} = req.body;

		// assign values from frontend to newly created product
		const newlyCreatedProduct = new Product({
			brand,
			category,
			description,
			image,
			price,
			salePrice,
			title,
			totalStock,
		});
		res.status(201).json({
			success: true,
			message: 'Product added successfully !',
			data: newlyCreatedProduct,
		});

		// save product to database
		await newlyCreatedProduct.save();
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: 'Error occurred !',
		});
	}
};

// fetch all products
const fetchAllProduct = async (req, res) => {
	try {
		const listOfProducts = await Product.find({});
		res.status(200).json({
			success: true,
			message: 'Products fetched successfully !',
			data: listOfProducts,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: 'Error occurred !',
		});
	}
};

// edit a product
const editProduct = async (req, res) => {
	try {
		const productId = req.params.id;

		const {
			brand,
			category,
			description,
			image,
			price,
			salePrice,
			title,
			totalStock,
		} = req.body;

		const updateFields = req.body;

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Product not found !',
			});
		}

		// Update the product
		Object.keys(updateFields).forEach((key) => {
			if (updateFields[key] !== undefined) {
				product[key] = updateFields[key];
			}
		});

		// save the updated product
		await product.save();

		res.status(201).json({
			success: true,
			message: 'Product updated successfully !',
			data: product,
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: 'Error occurred !',
		});
	}
};

// delete a product
const deleteProduct = async (req, res) => {
	try {
		const productId = req.params.id;
		// find product by it's id and delete
		const product = await Product.findByIdAndDelete(productId);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Product not found !',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Product deleted successfully !',
		});
	} catch (err) {
		console.log(err);
		res.json({
			success: false,
			message: 'Error occurred !',
		});
	}
};

module.exports = {
	addProduct,
	deleteProduct,
	editProduct,
	fetchAllProduct,
	handleImageUpload,
};
