const mongoose = require('mongoose')
require('dotenv').config();

const DB_URL = process.env.DB_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Успешное подключение к MongoDB')
    } catch (error) {
        console.log('Ошибка подключения к MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectDB