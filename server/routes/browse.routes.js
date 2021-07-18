import express from "express"
import {browseHome,browseMovies,browseTVShows} from '../controllers/browse.controller'
import {auth} from '../middlewares/auth'


const router = express.Router();

router.route("/home").get(auth,browseHome);
router.route("/movies").get(auth,browseMovies);
router.route("/tvshows").get(auth,browseTVShows);


export default router;