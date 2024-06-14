const mongoose = require('mongoose');

const ChadoSchema  = new mongoose.Schema({
    response: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Chado = mongoose.model('Chado', ChadoSchema);

module.exports = Chado;
