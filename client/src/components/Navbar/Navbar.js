import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../SearchBar";
import Logo from "./Logo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "./Menu";
import ProfileMenu from "./ProfileMenu";
import NotificationsMenu from "./NotificationsMenu";

const Navbar = () => {
    const classes = useStyles();
    const [navBackground, setNavBackground] = useState(false);

    const changeBackground = () => setNavBackground(window.scrollY > 20);
    window.addEventListener("scroll", changeBackground);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            className={classes.navbar}
            component="nav"
            style={{
                backgroundColor: navBackground ? "rgb(20, 20, 20)" : "rgba(0, 0, 0, 0)",
            }}
        >
            <Toolbar>
                <Logo className={classes.logo} />
                <Menu />
                <SearchBar />
                <NotificationsMenu />
                <ProfileMenu />
            </Toolbar>
        </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    navbar: (props) => ({
        padding: theme.spacing(0, 3),
        backgroundImage: "linear-gradient(to bottom,rgba(0,0,0,.7) 10%,rgba(0,0,0,0))",
        transition: ".4s",
    }),
    logo: {
        width: "90px",
        marginRight: theme.spacing(2),
    },
}));

export default Navbar;
