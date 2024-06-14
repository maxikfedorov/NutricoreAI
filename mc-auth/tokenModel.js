const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 3, // это поле автоматически удаляет токен через 1 час
	},
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
