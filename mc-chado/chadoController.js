const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { processChadoData } = require('./chadoService');
const connectDB = require('../database/dbConnect');
const Chado = require('./chadoModel');
const getPerplexityResponse = require('../mc-perplexity/perplexityService');

const app = express();
const port = 3002;

connectDB();

app.use(cors());
app.use(express.json());

app.post('/chado', async (req, res) => {
    try {
        const userInput = req.body.userInput || null;
        const response = await getPerplexityResponse(userInput);

        const processedData = processChadoData(response);

        res.send(processedData);

        // Сохраняем ответ AI в MongoDB
        try {
            const aiDietProcessed = new Chado({ response: processedData });
            await aiDietProcessed.save();
        } catch (error) {
            console.error('Ошибка при сохранении ответа AI в MongoDB:', error);
            res.status(500).send('An error occurred while saving the AI response to MongoDB.');
            return;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка при обработке запроса');
    }
});


app.listen(port, () => {
    console.log(`CHADO is running ${port}`);
});
