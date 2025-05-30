// src/Admin/Editmovie.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Admin/Editmovie.css";

function Editmovie() {
  const [movieName, setMovieName] = useState("");
  const [image, setImage] = useState("");               // Poster URL
  const [movieGenre, setMovieGenre] = useState("");
  const [movieLanguage, setMovieLanguage] = useState("");
  const [movieDuration, setMovieDuration] = useState("");
  const [castMembers, setCastMembers] = useState([{ name: "", image: "" }]);
  const [movieDescription, setMovieDescription] = useState("");
  const [movieReleasedate, setMovieReleasedate] = useState("");
  const [trailerLink, setTrailerLink] = useState("");   // <-- Added state
  const [movieFormat, setMovieFormat] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage
    setMovieName(localStorage.getItem("moviename") || "");
    setImage(localStorage.getItem("movieimage") || "");
    setMovieGenre(localStorage.getItem("moviegenre") || "");
    setMovieLanguage(localStorage.getItem("movielanguage") || "");
    setMovieDuration(localStorage.getItem("movieduration") || "");
    setMovieDescription(localStorage.getItem("moviedescription") || "");
    setMovieReleasedate(localStorage.getItem("moviereleasedate") || "");
    setTrailerLink(localStorage.getItem("movietrailer") || ""); // <-- Initialize
    setMovieFormat(localStorage.getItem("movieformat") || "");
    setId(localStorage.getItem("id") || "");

    const storedCast = localStorage.getItem("moviecast") || "[]";
    try {
      const arr = JSON.parse(storedCast);
      setCastMembers(Array.isArray(arr) && arr.length ? arr : [{ name: "", image: "" }]);
    } catch {
      setCastMembers([{ name: "", image: "" }]);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/movieview/update/${id}`, {
        movieName,
        image,
        movieGenre,
        movieLanguage,
        movieDuration,
        movieCast: castMembers,
        movieDescription,
        movieReleasedate,
        trailerLink,     // <-- Include in payload
        movieFormat,
      });
      navigate("/movieview");
    } catch (err) {
      console.error("Error updating movie:", err);
    }
  };

  return (
    <div className="edit-body-movie-div">
      <form className="edit-form" onSubmit={handleSubmit}>
        {/* Movie Name */}
        <div className="mb-3">
          <label>Movie Name</label>
          <input
            type="text"
            className="form-control"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
          />
        </div>

        {/* Poster URL */}
        <div className="mb-3">
          <label>Poster URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          {image && <img src={image} alt="Poster" width="100" />}
        </div>

        {/* Genre */}
        <div className="mb-3">
          <label>Genre</label>
          <input
            type="text"
            className="form-control"
            value={movieGenre}
            onChange={(e) => setMovieGenre(e.target.value)}
            required
          />
        </div>

        {/* Language */}
        <div className="mb-3">
          <label>Language</label>
          <input
            type="text"
            className="form-control"
            value={movieLanguage}
            onChange={(e) => setMovieLanguage(e.target.value)}
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-3">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            value={movieDuration}
            onChange={(e) => setMovieDuration(e.target.value)}
            required
          />
        </div>

        {/* Cast Members */}
        <div className="mb-3">
          <label>Cast Members</label>
          {castMembers.map((c, i) => (
            <div key={i} className="cast-edit-row">
              <input
                type="text"
                placeholder="Name"
                value={c.name}
                onChange={(e) => {
                  const arr = [...castMembers];
                  arr[i].name = e.target.value;
                  setCastMembers(arr);
                }}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={c.image}
                onChange={(e) => {
                  const arr = [...castMembers];
                  arr[i].image = e.target.value;
                  setCastMembers(arr);
                }}
              />
              {c.image && <img src={c.image} alt="Cast" width="80" />}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setCastMembers([...castMembers, { name: "", image: "" }])
            }
          >
            Add Cast Member
          </button>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
            required
          />
        </div>

        {/* Release Date */}
        <div className="mb-3">
          <label>Release Date</label>
          <input
            type="text"
            className="form-control"
            value={movieReleasedate}
            onChange={(e) => setMovieReleasedate(e.target.value)}
            required
          />
        </div>

        {/* Trailer Link */}
        <div className="mb-3">
          <label>Trailer Link (YouTube URL)</label>
          <input
            type="text"
            className="form-control"
            value={trailerLink}
            onChange={(e) => setTrailerLink(e.target.value)}
            required
          />
          {trailerLink && (
            <div style={{ marginTop: "0.5rem" }}>
              <a href={trailerLink} target="_blank" rel="noopener noreferrer">
                Preview Trailer
              </a>
            </div>
          )}
        </div>

        {/* Format */}
        <div className="mb-3">
          <label>Format</label>
          <input
            type="text"
            className="form-control"
            value={movieFormat}
            onChange={(e) => setMovieFormat(e.target.value)}
            required
          />
        </div>

        {/* Buttons */}
        <div className="Update_container">
          <button className="Updatebutton1" type="submit">
            Update
          </button>
        </div>
        <Link to="/movieview">
          <div className="Update_container">
            <button className="Homebutton1" type="button">
              Home
            </button>
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Editmovie;
