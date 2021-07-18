import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImdbRating from "../../components/ImdbRating";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const Banner = ({ data, mediaType }) => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.paper}
            style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5)100%) ,url(https://image.tmdb.org/t/p/original/${data.backdrop_path}) center center`,
                backgroundSize: "cover",
            }}
        >
            <div className={classes.bannerContent}>
                <div className={classes.bannerDetails}>
                    <Typography className={classes.title}>{mediaType === "movie" ? data.title : data.name}</Typography>
                    <div className={classes.desc}>
                        <ImdbRating rating={data.vote_average} style={{ marginRight: "20px", textShadow: "initial" }} />
                        {data.genres.slice(0, 3).map((elem) => (
                            <Paper className={classes.infos}>{elem.name}</Paper>
                        ))}
                        {mediaType === 'tv' && <Paper className={classes.infos}>{`${data.number_of_seasons} saison${data.number_of_seasons>1 ? 's' : ''}`}</Paper>}
                        <Paper className={classes.infos}>{data.year.slice(0,4)}</Paper>
                        {data.runtime && <Paper className={classes.infos}>
                            {`${Math.floor(data.runtime / 60)} h ${data.runtime - Math.floor(data.runtime / 60) * 60} min`}{" "}
                        </Paper>}
                    </div>
                    <Typography className={classes.overview}>
                        {data.overview.length > 150 ? `${data.overview.slice(0, 150)}...` : data.overview}
                    </Typography>
                    <div>
                        <Button
                            className={classes.playBtn}
                            variant="contained"
                            component={Link}
                            startIcon={<PlayArrowIcon />}
                            size="large"
                            to={`/${mediaType}/${data.tmdb_id}`}
                        >
                            Lecture
                        </Button>
                        <Button className={classes.listBtn} variant="contained" startIcon={<AddIcon />} size="large">
                            Ma liste
                        </Button>
                    </div>
                </div>
                <div className={classes.vignette}></div>
            </div>
        </Paper>
    );
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        height: "650px",
        backgroundSize: "cover",
        "&::after": {
            backgroundColor: "black",
            content: "",
        },
    },
    bannerContent: {
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
    bannerDetails: {
        position: "absolute",
        bottom: "50px",
        margin: theme.spacing(10, 5),
    },
    title: {
        fontSize: "40px",
        letterSpacing: "2px",
        textShadow: "2px 2px 4px rgb(0 0 0 / 45%)",
        flexGrow: 1,
        marginBottom: theme.spacing(2),
    },
    desc: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(2),
        textShadow: "1px 1px 2px rgb(0 0 0 / 100%)",
    },
    infos: {
        padding: "5px 10px",
        marginRight: theme.spacing(1),
    },
    playBtn: {
        fontWeight: 700,
        marginRight: theme.spacing(2),
        "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        textTransform: "capitalize",
    },
    listBtn: {
        backgroundColor: "rgba(109, 109, 110, 0.7)",
        fontWeight: 700,
        color: "#fff",
        "&:hover": {
            backgroundColor: "rgba(109, 109, 110, 0.4)",
        },
        textTransform: "capitalize",
    },
    overview: {
        textShadow: "1px 1px 2px rgb(0 0 0 / 100%)",
        fontSize: "18px",
        marginBottom: theme.spacing(2),
        maxWidth: "80%",
    },
    vignette: {
        background: "linear-gradient(180deg,transparent 10%,rgb(20, 20, 20))",
        width: "100%",
        height: "200px",
    },
}));

export default Banner;
