import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import MovieCard from "../../components/MovieCard";
import Loader from "../../components/Loader/Loader";
import axios from "axios";

const SearchContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  const baseImgUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const { search_term } = useParams();

  const API_KEY = "71741288544550e3b57f3a8dca4493fc";
  const fetchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${search_term}&include_adult=false`;

  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);

      setIsLoading(false)
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="search-content">
      {isLoading ? (
          <Loader/>
      ) :"" }{
        movies.filter(movie=>movie.poster_path != null).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            rating={movie.vote_average}
            img={`${baseImgUrl}${movie.poster_path}`}
            title={movie.original_title}
            mediaType={movie.media_type}
          />
        ))
      }
    </div>
  );
};

export default SearchContent;
