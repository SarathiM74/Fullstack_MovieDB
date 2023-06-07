import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../components/Addmovie.css";


function Addmovie() {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [rating, setRating] = useState("");
    const { id } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        if (id !== undefined) {
            fetch("http://localhost:4000/getmovies/", {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    data.map((movie) => {
                        if (movie._id === id) {
                            setTitle(movie.title);
                            setGenre(movie.genre);
                            setLanguage(movie.language);
                            setRating(movie.rating);
                        }
                        return null;
                    });
                });
        }
    }, [id]);

    const handleclick = () => {
        if (id === "undefined") {
            try {
                fetch("http://localhost:4000/movies", {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": true,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: title,
                        genre: genre,
                        language: language,
                        rating: rating,
                    }),
                }).then((data) => {
                    console.log(data);
                });
                setTitle("");
                setGenre("");
                setLanguage("");
                setRating("");
            } catch (err) {
                console.log(err);
            }
        }
        else {
            fetch("http://localhost:4000/movies/" + id, {
                method: "PUT",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    genre: genre,
                    language: language,
                    rating: rating,
                }),
            }).then((data) => {
                console.log(data);
            });
        }
        navigate("/");
    };

    return (
        <div className="container">
            <span><h3>{id !== "undefined" ? "Update/Edit Movies" : "ADD MOVIE"}</h3></span>
            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="Movie Title" aria-label="Movie Title" value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="Genre" aria-label="Genre" value={genre}
                    onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="Language" aria-label="Language" value={language}
                    onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div class="input-group mb-3">
                <input type="text" className="form-control" placeholder="Rating" aria-label="Rating" value={rating}
                    onChange={(e) => setRating(e.target.value)} />
            </div>
            {id !== "undefined" ? <div className="d-grid"><button type="button" class="btn btn-info" onClick={handleclick}>Update</button></div> : <div className="d-grid"><button type="button" class="btn btn-secondary" onClick={handleclick}>Add</button></div>}
        </div>
    );
}

export default Addmovie;
