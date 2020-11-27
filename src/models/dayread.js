const mongoose = require('mongoose');

const dayread = mongoose.Schema({
    total: Number,
    dayWeek: String,
    links: [{ type : ObjectId, ref: 'Link' }],
});