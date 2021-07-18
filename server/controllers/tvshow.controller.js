import { fetchTMDB  } from "../utils/tvshow.utils";


const getTVShow = async (req, res) => {
    try {
        const tmdb_id = req.params.tmdb_id;
        const show = await fetchTMDB(tmdb_id);
        res.status(200).json({ ...show });
    } catch (error) {
        res.json([{ msg: error.message }]);
    }
};

export { getTVShow }