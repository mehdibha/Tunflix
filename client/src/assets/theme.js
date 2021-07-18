import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const theme = (darkMode) => {
    return createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : "light",
            primary: red,
            secondary: grey,
            background: {
                default: darkMode ? "#141414" : "white",
            },
            error: { main: "#e87c03" },
            text: { primary: "#fff", secondary: "rgb(150,150,150)", disabled: "#fff" },
        },
        typography: {
            fontFamily: ["Montserrat", "sans-serif"].join(","),
        },
    });
};

export default theme;
