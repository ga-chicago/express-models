var mongoose = require('mongoose');

var WineSchema = new mongoose.Schema({
    name: String,
    type: String,
    region: String,
    vintage: Number,
    organic: Boolean
})

var wineModel = mongoose.model('Wine', WineSchema);

module.exports = wineModel;
