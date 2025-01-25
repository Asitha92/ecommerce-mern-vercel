const Product = require('../../models/Product');

const getFilteredProducts = async (req, res) => {
	try {
		const { category = [], brand = [], sortBy = 'price-lowToHigh' } = req.query;

		let filters = {};

		if (category.length) {
			filters.category = { $in: category.split(',') };
		}

		if (brand.length) {
			filters.brand = { $in: brand.split(',') };
		}

		let sort = {};

		switch (sortBy) {
			case 'price-lowToHigh':
				sort.price = 1;
				break;
			case 'price-highToLow':
				sort.price = -1;
				break;
			case 'title-AtoZ':
				sort.title = 1;
				break;
			case 'title-ZtoA':
				sort.title = -1;
				break;
			default:
				sort.price = 1;
				break;
		}

		const products = await Product.find(filters).sort(sort);

		res.status(200).json({
			success: true,
			message: 'Products retrieved successfully !',
			data: products,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error fetching products !',
		});
	}
};

const getProductDetails = async (req, res) => {
	try {
		const { _id } = req.params;
		const product = await Product.findById(_id);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Product not found !',
			});
		}
		return res.status(200).json({
			success: true,
			message: 'Product details retrieved successfully !',
			data: product,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Error fetching products !',
		});
	}
};

module.exports = { getFilteredProducts, getProductDetails };
