import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getMedia } from "../../actions/watchActions";
import Loader from "../../components/Loader";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TVShowDetails from "./TVShowDetails";
import Trailers from "./Trailers";
import Modal from "../../components/Modal/Modal";
import { handleModal } from "../../actions/watchActions";
import Episodes from "./Episodes";
import { Container } from "@material-ui/core";
import MainContainer from "../../containers/MainContainer";
import Cast from "./Cast";

const TVShow = () => {
    const { tvshow_id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.watchReducer.isLoading);
    const modalIsOpen = useSelector((state) => state.watchReducer.modalIsOpen);
    const media = useSelector((state) => state.watchReducer.media);
    const mediaType = useSelector((state) => state.watchReducer.mediaType);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getMedia(tvshow_id, "tv"));
    }, [dispatch, tvshow_id]);

    return !isLoading && media && (mediaType === 'tv') ? (
        <>
            <Helmet>
                <title>{`X-Netflix - ${media.name}`}</title>
            </Helmet>
            <MainContainer style={{paddingTop:'80px'}}>
                <div className={classes.backgroundContainer} >
                    <div className={classes.background}>
                        <img className={classes.backdropPath} src={media.backdrop_path} alt={media.name} />
                        <div className={classes.vignette} ></div>
                    </div>
                </div>
                <Container>
                <Grid container spacing={4} className={classes.grid} alignItems="center">
                    <Grid item xs={8}>
                        <TVShowDetails
                            name={media.name}
                            vote_average={media.vote_average}
                            genres={media.genres}
                            number_of_seasons={media.number_of_seasons}
                            year={media.year}
                            overview={media.overview}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <Trailers title={media.name} trailers={media.trailers} crew={media.crew} />
                    </Grid>
                    <Grid item xs={12}>
                    <Episodes seasons={media.seasons} />
                    </Grid>
                </Grid>
                </Container>
                <Cast cast={media.cast} />
                <Modal
                    open={modalIsOpen}
                    handleClose={() => dispatch(handleModal(false))}
                    videoLink={media.videoLink}
                    tmdbId={media.tmdb_id}
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

export default TVShow;
