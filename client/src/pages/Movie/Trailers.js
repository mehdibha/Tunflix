import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Modal from "../../components/Modal";

const Trailers = ({ title, trailers, crew }) => {
    const classes = useStyles();
    const director = crew
        .filter((elem) => elem.job === "Director")
        .map((elem) => elem.name)
        .join(", ");
    const screenplay = crew
        .filter((elem) => elem.job === "Screenplay")
        .map((elem) => elem.name)
        .join(", ");
    const producer = crew
        .filter((elem) => elem.job === "Producer")
        .map((elem) => elem.name)
        .join(", ");
    const author = crew
        .filter((elem) => elem.job === "Author")
        .map((elem) => elem.name)
        .join(", ");
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {director && (
                    <Typography>
                        <span style={{ fontWeight: "900" }}>Réalisateur:</span> {director}
                    </Typography>
                )}
                {screenplay && (
                    <Typography>
                        <span style={{ fontWeight: "900" }}>Scénariste:</span> {screenplay}
                    </Typography>
                )}
                {producer && (
                    <Typography>
                        <span style={{ fontWeight: "900" }}>Producteur:</span> {producer}
                    </Typography>
                )}
                {author && (
                    <Typography>
                        <span style={{ fontWeight: "900" }}>Auteur:</span> {author}
                    </Typography>
                )}
            </Grid>
            {trailers.slice(0,3).map((elem) => (
                <Grid item xs={12}>
                    <Paper key={elem.key} elevation={20} className={classes.iframeContainer}>
                        <iframe
                            title={title}
                            className={classes.iframe}
                            src={`https://www.youtube-nocookie.com/embed/${elem.key}?rel=0`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            width="400"
                            height="250"
                        />
                    </Paper>
                </Grid>
            ))}

            <Modal />
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    iframeContainer: {
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%",
        height: 0,
        borderRadius: "7px",
        overflow: "hidden",
    },
    iframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
}));

export default Trailers;
