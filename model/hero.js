const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlengthA: 20,
        required: true
    },
    birthName: String,
    movies: {
        type: [String],
        enum: ["infinity War", "Endgame", "Iron Man 2", "The First Avenger"]
    },
    likeCount: Number,
    imgURL: {
        type:String,
        default:"Placeholder Image to be updated here..."
    },
    deceased: Boolean
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;