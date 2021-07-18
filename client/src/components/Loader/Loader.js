import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
    loaderContainer: {
        position: "relative",
        width: "100%",
        height: "100vh",
    },
    loader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
    },
}));

const Loader = () => {
    const classes = useStyles();

    return (
        <>
            <Helmet>
                <title>Chargement...</title>
            </Helmet>
            <div className={classes.loaderContainer}>
                <div className={classes.loader}>
                    <CircularProgress size={80} thickness={2} />
                </div>
            </div>
        </>
    );
};

export default Loader;
