const express = require('express');

const route = express.Router();
const {
	addAddress,
	fetchAllAddresses,
	editAddress,
	deleteAddress,
} = require('../../controllers/shop/addressController');

route.post('/add', addAddress);
route.get('/get/:userId', fetchAllAddresses);
route.delete('/delete/:userId/:addressId', deleteAddress);
route.put('/edit/:userId/:addressId', editAddress);

module.exports = route;
