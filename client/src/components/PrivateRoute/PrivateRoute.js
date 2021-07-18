import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, component: Component, ...rest }) => {
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const isLoading = useSelector((state) => state.userReducer.isLoading);
    if (isLoading) {
        return <div style={{ color: "white" }}>loading...</div>;
    } else {
        if (!isAuth) {
            return <Redirect to="/signin" />;
        } else {
            return <Route path={path} component={Component} {...rest} />;
        }
    }
};

export default PrivateRoute;
