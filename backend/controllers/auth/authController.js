const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Sign up
const signUpUser = async (req, res) => {
	const { userName, email, password } = req.body;

	try {
		// check user email already exists
		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res.json({ success: false, message: 'Email already exists !' });
		}
		// create hash password instead of password
		const hashPassword = await bcrypt.hash(password, 12);
		// create new user and assign new hash password to new user
		const newUser = new User({ userName, email, password: password });
		// save new user to database
		await newUser.save();
		res
			.status(200)
			.json({ success: true, message: 'User created successfully !' });
	} catch (e) {
		console.log(e);
		res.status(500).json({
			success: false,
			message: 'Some error occurred',
		});
	}
};

// Sign in
const signInUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// find user data by email
		const checkUser = await User.findOne({ email });
		if (!checkUser) {
			return res.json({
				success: false,
				message: "User doesn't exists !. Please sign up first !",
			});
		}

		// convert and compare password
		const checkPasswordMatch = await bcrypt.compare(
			password,
			checkUser.password
		);

		// check if passwords matched
		if (password !== checkUser.password) {
			return res.json({
				message: 'Invalid Password ! Please try again !',
			});
		}

		// create jwt token to user
		const token = jwt.sign(
			{
				email: checkUser.email,
				id: checkUser._id,
				role: checkUser.role,
				userName: checkUser.userName,
			},
			'CLIENT_PRIVATE_KEY',
			{ expiresIn: '60m' }
		);

		// commented out due to deploying to vercel - vercel doesn't support public suffix - cookies
		// setup cookie and send response
		// res.cookie('token', token, { httpOnly: true, secure: true }).json({
		// 	success: true,
		// 	message: 'User logged in successfully !',
		// 	user: {
		// 		email: checkUser.email,
		// 		role: checkUser.role,
		// 		id: checkUser._id,
		// 		userName: checkUser.userName,
		// 	},
		// });
		res.status(200).json({
			success: true,
			message: 'User logged in successfully !',
			token,
			user: {
				email: checkUser.email,
				role: checkUser.role,
				id: checkUser._id,
				userName: checkUser.userName,
			},
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Some error occurred',
		});
	}
};

//  Sign out
const signOutUser = (req, res) => {
	res.clearCookie('token').json({
		success: true,
		message: 'Signed out successfully !',
	});
};

// auth middleware (commented out due to deploying to vercel - vercel doesn't support public suffix - cookies)
// const authMiddleware = async (req, res, next) => {
// 	const token = req.cookies.token;
// 	if (!token) {
// 		return res.status(401).json({
// 			success: false,
// 			message: 'Unauthorized user !',
// 		});
// 	}

// 	try {
// 		const decoded = jwt.verify(token, 'CLIENT_PRIVATE_KEY');
// 		req.user = decoded;
// 		next();
// 	} catch (err) {
// 		res.status(401).json({
// 			success: false,
// 			message: 'Unauthorized user !',
// 		});
// 	}
// };

// auth middleware - vercel supported
const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized user !',
		});
	}

	try {
		const decoded = jwt.verify(token, 'CLIENT_PRIVATE_KEY');
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({
			success: false,
			message: 'Unauthorized user !',
		});
	}
};

module.exports = { signUpUser, signInUser, signOutUser, authMiddleware };
