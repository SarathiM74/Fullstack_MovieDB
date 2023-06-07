import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../components/Getmovies.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function Getmovies() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        try {
            fetch("https://movieserver-k281.onrender.com/getmovies", {
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
                    setMovies(data);
                });
        } catch (err) {
            console.log(err);
        }
    });

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this movie?");
        if (!confirmed) {
            return;
        }
        try {
            fetch("https://movieserver-k281.onrender.com/movies/" + id, {
                method: "DELETE",
                headers: {
                    "Access-Control-Allow-Origin": true,
                    "Content-Type": "application/json",
                },
            }).then((data) => {
                console.log(data);
            });
        } catch (err) {
            console.log(err);
        }
    };
    const handleUpdate = (id) => {
        navigate("/addmovie/" + id);
    };

    return (
        <div>
            <div className="container container-fluid">
                <div className="d-grid">
                    <button className="btn btn-outline-warning" onClick={() => navigate(`/addmovie/${undefined}`)} type="button">Click to add a Movie</button>
                </div>
            </div>
            <div className="container-sm">
                <div className="table-responsive">
                    <table className="table table-dark custom-table">
                        <thead>
                            <tr className="table-active">
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Language</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.language}</td>
                                    <td>{movie.rating}</td>
                                    <td>
                                        <button type="button" onClick={() => handleUpdate(movie._id)}><i class="bi bi-pencil-square"></i></button>
                                        <button type="button" onClick={() => handleDelete(movie._id)}><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Getmovies;
