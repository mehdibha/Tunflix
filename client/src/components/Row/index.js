import React from "react";
import MovieCard from "../MovieCard";
import "./style.css";

const Row = ({ title, data, wrap }) => {
    const wrapOptions = {flexWrap:"wrap",margin:"0 20px",justifyContent:'space-between'}
    return (
        <div className="row">
            <div className="row-title">{title}</div>
            <div className="row-posters" style={wrap ? wrapOptions : null}>
                {data
                    .filter((elem) => elem.poster_path != null)
                    .map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            rating={movie.vote_average}
                            img={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                            title={movie.original_title}
                            mediaType={movie.media_type}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Row;
