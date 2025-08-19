import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // adjust path if needed


export default function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/movies/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setMovies(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="card-container">
        {movies.map((movie) => (
          <a key={movie.id} href={`/description/${movie.id}`} className="card-link">
            <div className="card">
              <img
                src={`http://127.0.0.1:8000/${movie.Movie_thumbnail}`}
                alt={movie.Movie_title}
              />
              <div className="overlay">
                <h3>{movie.Movie_title}</h3>
  
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
