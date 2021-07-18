import express from "express"
import {auth} from '../middlewares/auth'
import { getTVShow } from "../controllers/tvshow.controller";
import {getMovie, fetchSubs,getSub} from "../controllers/movie.controller"


const router = express.Router();

router.route("/:tmdb_id").get(auth,getTVShow);



export default router;