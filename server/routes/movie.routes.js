import express from "express"
import {auth} from '../middlewares/auth'
import {getMovie,getSub} from "../controllers/movie.controller"


const router = express.Router();

router.route("/:tmdb_id").get(auth,getMovie);
router.route("/subs/:tmdb_id/:language").get(getSub);



export default router;