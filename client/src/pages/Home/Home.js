import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Home = () => {
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    if (isAuth) {
        return <Redirect to="/browse" />;
    } else {
        return <Redirect to="/signin" />;
    }
};

export default Home;
