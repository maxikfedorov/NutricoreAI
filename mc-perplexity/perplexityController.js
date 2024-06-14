const express = require("express");
const cors = require("cors");
const connectDB = require("../database/dbConnect");
const getPerplexityResponse = require("./perplexityService");
const { promtJSON } = require("./perplexityPromt");

const PORT = 4000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hi ! It is Perplexity here");
});

app.post("/custom-ai", async (req, res) => {
	try {
		const userInput = req.body.userInput || null;
		const selectedFocus = req.body.selectedFocus || "";
		console.log('ИНПУТ ' + req.body.userInput);
		console.log('КОНТЕКСТ ' + req.body.selectedFocus);
		const response = await getPerplexityResponse(userInput, selectedFocus);
		res.send(response);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while making the request.");
	}
});

app.listen(PORT, () => {
	console.log(`Perplexity running at http://localhost:${PORT}`);
});
