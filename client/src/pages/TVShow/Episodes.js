import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Grid, Container } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useDispatch } from "react-redux";
import { handleModal } from "../../actions/watchActions";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

const Episodes = ({ seasons }) => {
    const [selectedEpisode,setSelectedEpisode]=useState(0)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [selectedSeason, setSelectedSeason] = useState(0);
    return (
        <Box>
            <Box className={classes.episodeSelectorHeader}>
                <Typography variant="h3" className={classes.episodeSelectorLabel}>
                    Episodes
                </Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedSeason}
                        onChange={(event) => setSelectedSeason(event.target.value)}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            },
                            getContentAnchorEl: null,
                            className: classes.selectorMenu,
                        }}
                    >
                        {seasons.map((elem, k) => (
                            <MenuItem value={k}>
                                <Typography component="span" style={{ fontWeight: "900" }}>
                                    {`Saison ${k + 1} `}
                                    <Typography component="span"> {` (${elem.episodes.length} épisodes)`}</Typography>
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Container style={{ marginBottom: "60px" }}>
                <List>
                    {seasons[selectedSeason].episodes.map((elem, k) => {
                        return (
                            <div key={k} >
                                <ListItem
                                    alignItems="center"
                                    button
                                    onClick={() => {
                                        dispatch(handleModal(true));
                                        setSelectedEpisode(k)
                                    }}
                                    selected={selectedEpisode === k}
                                >
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item xs={1}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h4"
                                                style={{ textAlign: "center" }}
                                            >
                                                {elem.episode_number}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Grid container spacing={4} alignItems="center">
                                                <Grid item xs={3}>
                                                    <img
                                                        alt="Remy Sharp"
                                                        src={`https://image.tmdb.org/t/p/w300${elem.poster_path}`}
                                                        style={{ width: "100%" }}
                                                    />
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Typography variant="h5" color="textPrimary">
                                                        {elem.name}
                                                    </Typography>

                                                    <Typography variant="body2" color="textPrimary">
                                                        {elem.overview.length > 300
                                                            ? `${elem.overview.slice(0, 300)}...`
                                                            : elem.overview}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                {!(k === seasons[selectedSeason].episodes.length - 1) && <Divider />}
                            </div>
                        );
                    })}
                </List>
            </Container>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    episodeSelectorHeader: {
        display: "flex",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    episodeSelectorLabel: {
        flexGrow: 1,
    },
    selectorMenu: {
        "& .MuiPaper-root": {
            backgroundColor: "rgba(0,0,0,.9)",
            border: "1px solid rgb(20,20,20)",
        },
    },
}));

export default Episodes;
