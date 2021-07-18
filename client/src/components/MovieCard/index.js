import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function MovieCard({ id, rating, img, title, mediaType }) {
    return (
        <Link to={`/${mediaType === 'movie' ? 'movie' : 'tv'}/${id}`}>
            <div className="movie-card">
                {/* <div className="movie-card-clone">
                <div>{title} </div>
                    <img src={img} alt={title} className="movie-card-clone-img" />
                <div>{title} </div>
            </div> */}
                <img className="movie-card-img" src={img} alt={title} />
            </div>
        </Link>
    );
}

export default MovieCard;
