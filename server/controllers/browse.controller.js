import axios from "axios";
import { requestsHome, requestsMovies, requestsTVShows } from "../utils/requests";
import {fetchTMDB} from '../utils/movie.utils'
import {fetchTMDB as fetchTMDBshows} from '../utils/tvshow.utils'

const browseHome = async (req, res) => {
    try {
        const fetchData = async ({ name, url }) => {
            const { data } = await axios.get(url);
            return { title: name, data: data.results };
        };
        const rows = [
            ...requestsHome,
            ...requestsMovies
                .filter((elem) => elem.name !== "Trending")
                .map((elem) => ({ ...elem, name: `${elem.name} movies` })),
            ...requestsTVShows
                .filter((elem) => elem.name !== "Trending")
                .map((elem) => ({ ...elem, name: `${elem.name} TV Shows` })),
        ];
        const results = await axios.all(rows.map((elem) => fetchData(elem)));
        let random = results.filter((elem) => elem.title === "Trending movies")[0]
        random = random.data[Math.floor(Math.random() * (random.data.length - 1))];
        const banner = await fetchTMDB(random.id)
        res.json({
            banner,
            rows: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const browseMovies = async (req, res) => {
    try {
        const fetchData = async ({ name, url }) => {
            const { data } = await axios.get(url);
            return { title: name, data: data.results };
        };
        const rows = requestsMovies.map((elem) => ({ ...elem, name: `${elem.name} movies` }));
        const results = await axios.all(rows.map((elem) => fetchData(elem)));
        let random = results.filter((elem) => elem.title === "Trending movies")[0]
        random = random.data[Math.floor(Math.random() * (random.data.length - 1))];
        const banner = await fetchTMDB(random.id)
        res.json({
            banner,
            rows: results,
        });
    } catch (error) {
        console.log(error);
    }
};

const browseTVShows = async (req, res) => {
    try {
        const fetchData = async ({ name, url }) => {
            const { data } = await axios.get(url);
            return { title: name, data: data.results };
        };
        const rows = requestsTVShows.map((elem) => ({ ...elem, name: `${elem.name} TV Shows` }));
        const results = await axios.all(rows.map((elem) => fetchData(elem)));
        let random = results.filter((elem) => elem.title === "Trending TV Shows")[0]
        random = random.data[Math.floor(Math.random() * (random.data.length - 1))];
        const banner = await fetchTMDBshows(random.id)
        res.json({
            banner,
            rows: results,
        });
    } catch (error) {
        console.log(error);
    }
};

export { browseHome, browseMovies, browseTVShows };
