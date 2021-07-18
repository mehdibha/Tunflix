import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";


const SearchBar = (props) => {
    const [searchInput, setSearchInput] = useState("");
    const classes = useStyles({searchInput});
    const history = useHistory();
    
    useEffect(()=>{
        if (searchInput !== "") {
                            history.push(`/search/${searchInput}`);
                    }
    },[searchInput])

    return (
        <div className={classes.search} {...props}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder="Chercher un film, une série..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    );
};


const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: 0,
        backgroundColor: theme.palette.background,
        "&:focus-within": {
            backgroundColor: "rgba(0,0,0,1)",
            border: '1px solid white'
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
        transition: theme.transitions.create("background-color"),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:"white",
    },
    inputRoot: {
        color: "white",
        
    },
    inputInput: props => ({
        cursor:'pointer',
        padding: theme.spacing(1, 1, 1, 0),
        fontSize:"14px",
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: props.searchInput.length > 0 ? "150px" : "0px",
            "&:focus": {
                width: "150px",
            },
        },
        "&:focus-within": {
            cursor : 'text'
        }
    }),
}));

export default SearchBar;
