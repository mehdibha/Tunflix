import React, { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, useLocation } from "react-router-dom";
import { HOME, BROWSE, SIGN_IN, SIGN_UP, MOVIES, TV_SHOWS, MY_LIST } from "./constants/routes";
import { useSelector } from "react-redux";
import Footer from './components/Footer'
import Home from './pages/Home';
import Browse from './pages/Browse';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import BrowseMovies from './pages/BrowseMovies';
import BrowseTVShows from './pages/BrowseTVShows';
import MyList from './pages/MyList';
import SearchContent from './pages/SearchContent';
import Movie from './pages/Movie';
import TVShow from './pages/TVShow';


const Routes = () => {
    const location = useLocation();
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    return (
        <>
            {(location.pathname.slice(0, 7) === "/browse" || location.pathname.slice(0, 7) === "/search" || location.pathname.slice(0, 6) === "/movie" || location.pathname.slice(0,3) === "/tv") && isAuth && (
                <Navbar />
            )}
            <Switch>
                <Route exact path={HOME} component={Home} />
                <PrivateRoute exact path={BROWSE} component={Browse} />
                <Route exact path={SIGN_IN} component={SignIn} />
                <Route exact path={SIGN_UP} component={SignUp} />
                <PrivateRoute exact path={MOVIES} component={BrowseMovies} />
                <PrivateRoute exact path={TV_SHOWS} component={BrowseTVShows} />
                <PrivateRoute exact path={MY_LIST} component={MyList} />
                <PrivateRoute exact path={"/movie/:movie_id"} component={Movie} />
                <PrivateRoute exact path={"/tv/:tvshow_id"} component={TVShow} />
                <PrivateRoute exact path="/search/:search_term" component={SearchContent} />
                <Route path='*' component={NotFound} />
            </Switch>
            <Footer />
        </>
    );
};

export default Routes;
