
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
});

const Movie = mongoose.model('movies', movieSchema);

export default Movie;