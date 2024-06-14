const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userModel");
const Token = require("./tokenModel");

async function register(username, password) {
	const user = new User({ username, password });
	await user.save();
}

// userService.js
async function login(username, password) {
	const user = await User.findOne({ username });

	if (!user) {
		throw new Error("Invalid username or password");
	}
	if (!(await bcrypt.compare(password, user.password))) {
		throw new Error("Invalid username or password");
	}

	const token = jwt.sign({ _id: user._id }, "secret_key");

	// Сохраняем токен в базу данных
	const newToken = new Token({ token, user: user._id });
	await newToken.save();

	return token;
}

module.exports = {
	register,
	login,
};
