import {
    fetchTMDB,
} from "../utils/movie.utils";

const getMovie = async (req, res) => {
    try {
        const tmdb_id = req.params.tmdb_id;
        const movie = await fetchTMDB(tmdb_id);
        res.status(200).json({
            ...movie,
            videoLinks: [
                {
                    lang: "fr",
                    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                },
                {
                    lang : 'en',
                    url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                }
            ],
        });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};

// const fetchSubs = async (req, res, next) => {
//     try {
//         const tmdb_id = req.params.tmdb_id;
//         const movie = await fetchTMDB(tmdb_id);
//         const subs = await fetchYTS(
//             movie.imdb_id,
//             ["Arabic", "French", "English"],
//             __dirname + `/../assets/captions/${tmdb_id}`
//         );
//         next();
//     } catch (error) {
//         res.json([{ msg: error.message }]);
//     }
// };

const getSub = async (req, res, next) => {
    const languages = { en: "English", fr: "French", ar: "Arabic" };
    try {
        res.sendFile(`/assets/captions/51876${languages[req.params.language]}.vtt`, {
            root: __dirname + "/..",
        });
    } catch (error) {
        res.status(400).json([{ msg: error.message }]);
    }
};

export { getMovie, getSub };
