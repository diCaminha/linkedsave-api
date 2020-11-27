const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const dayreadSchema = mongoose.Schema({
    total: Number,
    dayWeek: String,
    user: String,
    date: String,
    links: [{ type : ObjectId, ref: 'Link' }],
});

module.exports = mongoose.model("Dayread", dayreadSchema);