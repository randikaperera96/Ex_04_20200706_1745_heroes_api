const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    neame: String,
    birthName: String,
    movies: String,
    likeCount: Number,
    imgURL: String,
    deceased: Boolean
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;