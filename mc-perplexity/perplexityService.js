const axios = require('axios');
const AIDietResponse = require('./perplexityModel');
require('dotenv').config();
const { contentPromtJSON: contentPromt, promtJSON: defaultPromt } = require('./perplexityPromt');

const PERPLEXITY_API_URL = process.env.PERPLEXITY_API_URL;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

const url = PERPLEXITY_API_URL;

const headers = {
    'accept': 'application/json',
    'authorization': PERPLEXITY_API_KEY,
    'content-type': 'application/json'
};

async function getPerplexityResponse(customPromt = defaultPromt, selectedFocus = '') {
    const data = {
        model: "mistral-7b-instruct",
        messages: [
            {
                role: "system",
                content: contentPromt + selectedFocus
            },
            {
                role: "user",
                content: customPromt
            }
        ],
        temperature: 1
    };

    const response = await axios.post(url, JSON.stringify(data), { headers });

    const perplexityAnswer = response.data.choices[0].message.content;

    const aiDietResponse = new AIDietResponse({ response: perplexityAnswer });

    // Сохраняем ответ AI в базу данных
    await aiDietResponse.save();

    return perplexityAnswer;
}

module.exports = getPerplexityResponse;
