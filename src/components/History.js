import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // adjust path if needed
import "./desc.css";

export default function MainPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/view_his", {
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
    {movies.length>0? (
    movies.map((item) => (
    <a key={item.id} href={`/description/${item.movie.id}`} className="card-link">
      <div className="card">
        <img
          src={`http://127.0.0.1:8000/${item.movie.Movie_thumbnail}`}
          alt={item.movie.Movie_title}
        />
        <div className="overlay">
          <h3>{item.movie.Movie_title}</h3>
          <p>Viewed on: {new Date(item.date).toLocaleDateString()}</p>
        </div>
      </div>
    </a>
  ))
):(
   <p style={{ textAlign: "center", marginTop: "20px" }}>No movies browsed yet.</p>
)}
</div>

    </>
  );
}
