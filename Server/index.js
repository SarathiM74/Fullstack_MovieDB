import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Movie from "./models/movies.js";
import cors from "cors";
import "dotenv/config";

const app = express()

app.use(cors({
    origin: true,
}))

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded // middleware
app.use(bodyParser.json())

// const mongoURL = process.env.MONGO_URL;
const atlasURL = process.env.ATLAS_URL;

mongoose.connect(atlasURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Mongo-MoviesDB")
    })
    .catch((err) => {
        console.log(err)
    })

app.get("/getmovies", (req, res) => {
    Movie.find()
        .then((movies) => {
            console.log(movies)
            res.send(movies)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post("/movies", (req, res) => {
    console.log(req.body)
    const movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating
    })
    movie.save()
        .then(() => {
            res.send("Movie added successfully")
        })
        .catch((err) => {
            console.log(err)
        })
})

app.put("/movies/:id", (req, res) => {
    const id = req.params.id
    Movie.findOneAndUpdate({ _id: id }, {
        title: req.body.title,
        genre: req.body.genre,
        language: req.body.language,
        rating: req.body.rating
    })
        .then(() => {
            res.send("Movie updated successfully")
        })
        .catch((err) => {
            console.log(err)
        })
})

app.delete("/movies/:id", (req, res) => {
    const id = req.params.id
    Movie.findByIdAndDelete({ _id: id })
        .then(() => {
            res.send("Movie deleted successfully")
        })
        .catch((err) => {
            console.log(err)
        })
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost::${port}`)
})
