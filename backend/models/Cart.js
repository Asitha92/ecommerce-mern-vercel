const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
		},
	},
	{ _id: false } // Prevent creation of additional `_id` for sub document
);

const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		items: [ItemSchema],
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model('Cart', CartSchema);
