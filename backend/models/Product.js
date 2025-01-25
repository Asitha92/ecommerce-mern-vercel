const mongoose = require('mongoose');

const AdminProductSchema = new mongoose.Schema(
	{
		image: String,
		title: String,
		description: String,
		price: Number,
		category: String,
		brand: String,
		salePrice: Number,
		totalStock: Number,
		averageReview: Number,
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', AdminProductSchema);
