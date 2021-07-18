import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getMedia } from "../../actions/watchActions";
import Loader from "../../components/Loader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieDetails from "./MovieDetails";
import Trailers from "./Trailers";
import Modal from "../../components/Modal/Modal";
import { handleModal } from "../../actions/watchActions";
import { Container } from "@material-ui/core";
import MainContainer from "../../containers/MainContainer";
import Cast from "./Cast";

const Movie = () => {
    const { movie_id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.watchReducer.isLoading);
    const modalIsOpen = useSelector((state) => state.watchReducer.modalIsOpen);
    const media = useSelector((state) => state.watchReducer.media);
    const mediaType = useSelector((state) => state.watchReducer.mediaType);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getMedia(movie_id, "movie"));
    }, [dispatch, movie_id]);

    return !isLoading && media && (mediaType === 'movie') ? (
        <>
            <Helmet>
                <title>{`X-Netflix - ${media.title}`}</title>
            </Helmet>
            <MainContainer style={{paddingTop:'80px'}}>
                <div className={classes.backgroundContainer} >
                    <div className={classes.background}>
                        <img className={classes.backdropPath} src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`} alt={media.title} />
                        <div className={classes.vignette} ></div>
                    </div>
                </div>
                <Container>
                <Grid container spacing={4} className={classes.grid} alignItems="flex-start">
                    <Grid item xs={8}>
                        <MovieDetails
                            title={media.title}
                            vote_average={media.vote_average}
                            genres={media.genres}
                            runtime={media.runtime}
                            year={media.year}
                            overview={media.overview}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <Trailers title={media.title} trailers={media.videos} crew={media.crew} />
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
                </Container>
                        <Cast cast={media.cast} />
                <Modal
                    open={modalIsOpen}
                    handleClose={() => dispatch(handleModal(false))}
                    videoLinks={media.videoLinks}
                    title={media.title}
                    />
            </MainContainer>
        </>
    ) : (
        <Loader />
    );
};

const useStyles = makeStyles((theme) => ({

    backgroundContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
    },
    fillContainer: {
        padding: theme.spacing(30, 10, 0, 10),
    },
    background: {
        position: "relative",
        width: "100%",
    },
    backdropPath: {
        width: "100%",
        filter: "brightness(50%) blur(4px)",
    },
    vignette: {
        position: "absolute",
        bottom: 0,
        transform:'translateY(10px)',
        background: "linear-gradient(180deg,transparent 20%,rgb(20, 20, 20) 80%)",
        width: "100%",
        height: "500px",
    },
}));

export default Movie;
