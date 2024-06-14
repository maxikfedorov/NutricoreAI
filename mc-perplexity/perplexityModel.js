const mongoose = require('mongoose');

const AIDietResponseSchema = new mongoose.Schema({
    response: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const AIDietResponse = mongoose.model('AIDietResponse', AIDietResponseSchema);

module.exports = AIDietResponse;
