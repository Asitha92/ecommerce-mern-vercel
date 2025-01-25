const express = require('express');
const {
	signUpUser,
	signInUser,
	signOutUser,
	authMiddleware,
} = require('../../controllers/auth/authController');

const router = express.Router();

router.post('/signUp', signUpUser);
router.post('/signIn', signInUser);
router.post('/signOut', signOutUser);
router.get('/checkAuth', authMiddleware, (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		message: 'Authenticated user !',
		user,
	});
});

module.exports = router;
