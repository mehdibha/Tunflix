import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import ImdbRating from "../../components/ImdbRating";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch } from "react-redux";
import { handleModal } from "../../actions/watchActions";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const TVShowDetails = ({ name, vote_average, genres, number_of_seasons, year, overview }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [listed, setListed] = useState(false);
    const [like, setLike] = useState(false);
    const [unlike, setUnlike] = useState(false);

    return (
        <Grid container spacing={2} style={{margin:'10vh 0'}}>
            <Grid item xs={12}>
                <Typography variant="h2" className={classes.name}>{name}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.desc}>
                <ImdbRating rating={vote_average} style={{ marginRight: "20px", textShadow: "initial" }} />
                {genres.slice(0, 3).map((elem) => (
                    <Paper className={classes.infos}>{elem.name}</Paper>
                ))}
                <Paper className={classes.infos}>{year}</Paper>
                <Paper className={classes.infos}>
                    {`${number_of_seasons} saison${(number_of_seasons > 1 )? "s" : ""}`}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Typography className={classes.overview}>
                    {overview.length > 300 ? `${overview.slice(0, 300)}...` : overview}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button
                    className={classes.playBtn}
                    variant="contained"
                    color="secondary"
                    startIcon={<PlayArrowIcon />}
                    size="large"
                    onClick={() => {
                        dispatch(handleModal(true));
                    }}
                >
                    Reprendre
                </Button>
                <IconButton aria-label="list" onClick={() => setListed(!listed)}>
                    {listed ? <DoneIcon /> : <AddIcon />}
                </IconButton>
                <IconButton
                    aria-label="like"
                    onClick={() => {
                        setUnlike(false);
                        setLike(!like);
                    }}
                >
                    {like ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <IconButton
                    aria-label="like"
                    onClick={() => {
                        setLike(false);
                        setUnlike(!unlike);
                    }}
                >
                    {unlike ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                </IconButton>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    name: {
        letterSpacing: "2px",
        textShadow: "2px 2px 4px rgb(0 0 0 / 45%)",
    },
    desc: {
        display: "flex",
        alignItems: "center",
        textShadow: "1px 1px 2px rgb(0 0 0 / 100%)",
    },
    infos: {
        padding: "5px 10px",
        marginRight: theme.spacing(1),
    },
    playBtn: {
        fontWeight: 700,
        marginRight: theme.spacing(2),
        textTransform: "capitalize",
        width: "250px",
        height: "50px",
    },
    listBtn: {
        backgroundColor: "rgba(109, 109, 110, 0.7)",
        fontWeight: 700,
        color: "#fff",
        "&:hover": {
            backgroundColor: "rgba(109, 109, 110, 0.4)",
        },
        textTransform: "capitalize",

        height: "50px",
    },
    overview: {
        textShadow: "1px 1px 2px rgb(0 0 0 / 100%)",
        fontSize: "18px",
    },
}));

export default TVShowDetails;
