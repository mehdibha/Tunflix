import axios from "axios";
import {
    SIGN_IN_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    AUTH_FAIL,
    SET_LOADING,
    GET_AUTH_USER,
    SET_LOADING_LOCAL,
    SIGN_OUT_USER_SUCCESS,
    SET_DARK_MODE,
} from "../constants/actionTypes";
import { CURRENT_USER, SIGN_IN, SIGN_UP } from "../constants/api";

export const getAuthUser = () => async (dispatch) => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
    dispatch({ type: SET_LOADING });
    try {
        const { data } = await axios.get(CURRENT_USER);
        dispatch({
            type: GET_AUTH_USER,
            payload: data,
        });
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode !== null) {
            dispatch({
                type: SET_DARK_MODE,
                payload: darkMode === "true",
            });
        }
    } catch (error) {
        dispatch({ type: AUTH_FAIL, payload: null });
    }
};

export const signIn = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING });
        dispatch({ type: SET_LOADING_LOCAL });
        const { data } = await axios.post(SIGN_IN, formData);
        localStorage.setItem("token", data.token);
        dispatch({ type: SIGN_IN_USER_SUCCESS, payload: data });
    } catch (error) {
        const res = error.response.data;
        dispatch({ type: AUTH_FAIL, payload: res });
    }
};

export const signUp = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING });
        const { data } = await axios.post(SIGN_UP, formData);
        localStorage.setItem("token", data.token);
        dispatch({ type: SIGN_UP_USER_SUCCESS, payload: data });
    } catch (error) {
        const res = error.response.data;
        dispatch({ type: AUTH_FAIL, payload: res });
    }
};

export const signOut = () => async (dispatch) => {
    try {
        localStorage.removeItem("token");
        dispatch({ type: SIGN_OUT_USER_SUCCESS });
    } catch (error) {
        const res = error.response.data;
        dispatch({ type: AUTH_FAIL, payload: res });
    }
};

export const setDarkMode = () => async (dispatch, getState) => {
    const { darkMode } = getState().userReducer;
    localStorage.setItem("darkMode", !darkMode);
    dispatch({ type: SET_DARK_MODE, payload: !darkMode });
};
