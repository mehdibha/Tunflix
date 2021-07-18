import axios from "axios";
import config from "../config";

const fetchTMDB = async (id) => {
    try {
        const [{ data }, requestTrailer] = await axios.all([
            axios.get(
                `http://api.themoviedb.org/3/tv/${id}?api_key=${config.TMDBApiKey}&append_to_response=credits&language=fr`
            ),
            axios.get(`http://api.themoviedb.org/3/tv/${id}/videos?api_key=${config.TMDBApiKey}&language=fr`),
        ]);
        const name = data.name ? data.name : null;
        const original_name = data.original_name ? data.original_name : null;
        const overview = data.overview ? data.overview : null;
        const runtime = data.episode_runtime ? data.episode_runtime : null;
        const year = data.first_air_date ? data.first_air_date.slice(0, 4) : null;
        const genres = data.genres ? data.genres : [];
        const networks = data.networks
            ? data.networks.map((elem) => ({ name: elem.name, logo_path: elem.logo_path }))
            : null;
        const backdrop_path = data.backdrop_path ? `https://image.tmdb.org/t/p/original/${data.backdrop_path}` : null;
        const poster_path = data.poster_path ? `https://image.tmdb.org/t/p/original/${data.poster_path}` : null;
        const vote_average = data.vote_average ? data.vote_average : null;
        const number_of_seasons = data.number_of_seasons ? data.number_of_seasons : null;
        const trailers =
            requestTrailer.data.results.length === 0
                ? null
                : requestTrailer.data.results
                      .filter((elem) => !elem.name.toLowerCase().includes("vost"))
                      .map((elem) => elem.key);
        let seasons = await axios.all(
            [...Array(number_of_seasons).keys()].map((k) =>
                axios.get(
                    `https://api.themoviedb.org/3/tv/${id}/season/${k + 1}?api_key=${config.TMDBApiKey}&language=fr`
                )
            )
        );
        seasons = seasons
            .map((elem) => elem.data)
            .map((elem) => ({
                name: elem.name,
                overview: elem.overview,
                poster_path: elem.poster_path,
                season_number: elem.season_number,
                air_date: elem.air_date,
                episodes: elem.episodes.map((el) => ({
                    name: el.name,
                    overview: el.overview,
                    poster_path: el.still_path,
                    air_date: el.air_date,
                    episode_number: el.episode_number,
                    vote_average: el.vote_average,
                })),
            }));
        let cast = data.credits.cast
            .filter((elem) => elem.profile_path !== null && elem.name !== null && elem.character !== null)
            .slice(0, 8);
        if (cast) {
            cast = cast.map((elem) => ({
                id: elem.id,
                name: elem.name,
                profile_path: elem.profile_path,
                character: elem.character,
            }));
        }
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
            name,
            original_name,
            overview,
            runtime,
            year,
            genres,
            networks,
            poster_path,
            backdrop_path,
            vote_average,
            number_of_seasons,
            trailers,
            seasons,
            cast,
            crew,
        };
    } catch (error) {
        return null;
    }
};

export { fetchTMDB };
