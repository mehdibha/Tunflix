import axios from "axios";
import config from "../config";
import cheerio from "cheerio";
import Movie from "../models/movie.model";

const fetchTMDB = async (id) => {
    try {
        const { data } = await axios.get(
            `http://api.themoviedb.org/3/movie/${id}?api_key=${config.TMDBApiKey}&append_to_response=videos,credits`
        );
        const imdb_id = data.imdb_id ? data.imdb_id : null;
        const overview = data.overview ? data.overview : null;
        const title = data.title || data.original_title;
        const popularity = data.popularity ? data.popularity : null;
        const backdrop_path = data.backdrop_path ? data.backdrop_path : null;
        const poster_path = data.poster_path ? data.poster_path : null;
        const year = data.release_date ? data.release_date : null;
        const imdb_rating = data.vote_average ? data.vote_average : null;
        const runtime = data.runtime ? data.runtime : null;
        const genres = data.genres ? data.genres : [];
        const videos = data.videos.results
            ? data.videos.results
                  .map((elem) => ({ name: elem.name, key: elem.key, type: elem.type }))
            : [];
        let cast = data.credits.cast
            .filter((elem) => elem["known_for_department"] === "Acting")
            .filter((elem) => elem.profile_path !== null && elem.name !== null && elem.character !== null)
            .sort((elemA, elemB) => elemA.order - elemB.order)
            .slice(0, 12)
            .map((elem) => ({
                id: elem.id,
                name: elem.name || elem.original_name,
                profile_path: elem.profile_path,
                character: elem.character,
            }));

        const crew = data.credits.crew
            .filter(
                (elem) =>
                    elem.job === "Producer" ||
                    elem.job === "Director" ||
                    elem.job === "Author" ||
                    elem.job === "Screenplay"
            )
            .map((elem) => ({ id: elem.id, name: elem.name, job: elem.job }));
        return {
            tmdb_id: id,
            imdb_id,
            title,
            popularity,
            overview,
            genres,
            poster_path,
            backdrop_path,
            year,
            imdb_rating,
            runtime,
            videos,
            cast,
            crew,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export {
    fetchTMDB,
};
