import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { getAuthUser } from "./actions/userActions";
import Cookies from "js-cookie";
import Routes from "./Routes";
import Loader from "./components/Loader";

function App() {
    const isLoading = useSelector((state) => state.userReducer.isLoading);
    const darkMode = useSelector((state) => state.userReducer.darkMode);
    const dispatch = useDispatch();
    useEffect(() => {
        if (window.location.hash === "#_=_") window.location.hash = "";
        const cookieJwt = Cookies.get("auth-cookie");
        if (cookieJwt) {
            Cookies.remove("auth-cookie");
            localStorage.setItem("token", cookieJwt);
        }
        dispatch(getAuthUser());
    }, [dispatch]);

    return (
        <Router>
            <ThemeProvider theme={theme(darkMode)}>
                <CssBaseline />
                <ScrollToTop />
                {isLoading ? <Route path='*' component={Loader} /> : <Routes />}
            </ThemeProvider>
        </Router>
    );
}

export default App;
