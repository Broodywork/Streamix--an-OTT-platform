import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import { AuthContext } from "../context/AuthContext";
import "./desc.css";

function Description() {
  const [movie, setMovie] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const { id } = useParams();
  const [wish, setWishlist] = useState(null);
  const [History, setHistory] = useState(null);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/movies/${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));
  }, [id]);

  const handlelogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ make async and await axios
  const handleVideo = async () => {
    setShowVideo(true);
    try {
      const token = localStorage.getItem("token");

      const payload = {
        movie: id,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/add_his", payload, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Added to History ✅", res.data);
      setHistory(res.data);
    } catch (err) {
      console.error("Error updating History ❌", err);
    }
  };

  const handlewish = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to add to wishlist");
        return;
      }

      const payload = {
        movie: id,
      };

      const res = await axios.post("http://127.0.0.1:8000/api/add", payload, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Added to wishlist ✅:", res.data);
      setWishlist(res.data);
      alert("Movie added to wishlist ✅");
    } catch (err) {
      console.error("Error adding to wishlist ❌", err);
      alert("Already in Wishlist Not Possible❌");
    }
  };

  return (
    <>
      <Navbar handlelogout={handlelogout} />

      {movie && (
        <div className="description-card">
          {!showVideo ? (
            <>
              <img
                src={`http://127.0.0.1:8000/${movie.Movie_thumbnail}`}
                alt={movie.Movie_title}
                className="description-image"
              />

              <div className="description-overlay">
                <h1>{movie.Movie_title}</h1>
                <p>{movie.Movie_Description}</p>

                <div className="description-buttons">
                  <button onClick={handleVideo}>Watch Now</button>
                  <button onClick={handlewish}>Wishlist</button>
                </div>
              </div>
            </>
          ) : (
            <div className="video-container">
              <video controls autoPlay>
                <source
                  src={`http://127.0.0.1:8000/${movie.Movie_video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Description;
