const express = require("express");
const connectDB = require("../database/dbConnect");
const path = require("path");
const Token = require("./tokenModel");
const cors = require("cors"); // Импортируем пакет cors

const userService = require("./userService"); // Импорт функций из userService

const PORT = 3001;

connectDB();

const app = express();

app.use(cors()); // Используем cors для всех маршрутов

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/login.html"));
});

// authController.js
app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		await userService.register(username, password);
		const token = await userService.login(username, password); // Логиним пользователя сразу после регистрации
		res.status(201).send({ token }); // Возвращаем токен
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

// authController.js
app.get("/validate-token", async (req, res) => {
	const token = req.headers["authorization"];
	const tokenData = await Token.findOne({ token });
	if (!tokenData) {
		return res.status(401).send("Invalid token");
	}
	res.status(200).send("Valid token");
});

app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const token = await userService.login(username, password);
		res.send({ token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

app.use(async (req, res, next) => {
	const token = req.headers["authorization"];
	const tokenData = await Token.findOne({ token });
	if (!tokenData) {
		return res.status(401).send("Invalid token");
	}
	next();
});

app.listen(PORT, () => {
	console.log(`Authentification is running at http://localhost:${PORT}`);
});
