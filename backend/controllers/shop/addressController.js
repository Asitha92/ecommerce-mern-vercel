const Address = require('../../models/Address');

const addAddress = async (req, res) => {
	try {
		const { userId, address, city, zipCode, phone, notes } = req.body;

		if (!userId || !address || !city || !zipCode || !phone) {
			return res.status(400).json({
				success: false,
				message: 'Please fill in all fields.',
			});
		}

		const newlyCreatedAddress = new Address({
			userId,
			address,
			city,
			zipCode,
			phone,
			notes,
		});

		await newlyCreatedAddress.save();

		res.status(201).json({
			success: true,
			message: 'Address added successfully.!',
			data: newlyCreatedAddress,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const fetchAllAddresses = async (req, res) => {
	try {
		const { userId } = req.params;

		if (!userId) {
			return res.status(400).json({
				success: false,
				message: 'User ID is required.',
			});
		}

		const addressList = await Address.find({ userId });

		res.status(200).json({
			success: true,
			data: addressList,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const editAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.params;
		const formData = req.body;

		if (!userId || !addressId) {
			return res.status(400).json({
				success: false,
				message: 'User ID and Address ID are required.',
			});
		}

		const updatedAddress = await Address.findOneAndUpdate(
			{ _id: addressId, userId },
			formData,
			{ new: true }
		);

		if (!updatedAddress) {
			return res.status(404).json({
				success: false,
				message: 'Address not found.!',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Address updated successfully.!',
			data: updatedAddress,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const deleteAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.params;

		if (!userId || !addressId) {
			return res.status(400).json({
				success: false,
				message: 'User ID and Address ID are required.',
			});
		}

		const deleteAddress = await Address.findOneAndDelete({
			_id: addressId,
			userId,
		});

		if (!deleteAddress) {
			return res.status(404).json({
				success: false,
				message: 'Address not found.!',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Address deleted successfully.!',
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { addAddress, fetchAllAddresses, editAddress, deleteAddress };
