import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signOut as signOutUser } from "../../actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownSharpIcon from "@material-ui/icons/KeyboardArrowDownSharp";
import { setDarkMode } from "../../actions/userActions";

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const darkMode = useSelector((state) => state.userReducer.darkMode);
    const avatar = useSelector((state) => state.userReducer.user.avatar);
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const signOut = () => {
        handleClose();
        dispatch(signOutUser());
        history.push("/signin");
    };
    return (
        <div>
            <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
                <img
                    src={avatar}
                    alt="profile"
                    style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "4px",
                        objectFit: "cover",
                    }}
                />
                <KeyboardArrowDownSharpIcon style={{ color: "white" }} />
            </Button>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                className={classes.profileMenu}
            >
                <MenuItem>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={() => dispatch(setDarkMode())}
                                name="dark mode"
                                color="primary"
                                classes={{
                                    track: classes.track,
                                }}
                            />
                        }
                        label="Mode sombre"
                    />
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleClose}>
                    Compte
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={signOut}>
                    Se déconnecter
                </MenuItem>
            </Menu>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    profileMenu: {
        "& .MuiPaper-root": {
            backgroundColor: "rgba(0,0,0,.9)",
            border: "1px solid rgb(20,20,20)",
        },
    },
    menuItem: {
        "&:hover": {
            textDecoration: "underline",
        },
    },
    track: {
        backgroundColor: "grey",
        opacity: 1,
    },
}));

export default ProfileMenu;
