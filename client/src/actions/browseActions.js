import axios from "axios";
import {
    BROWSE_HOME_LOAD,
    BROWSE_MOVIES_LOAD,
    BROWSE_TVSHOWS_LOAD,
    BROWSE_HOME_SUCCESS,
    BROWSE_MOVIES_SUCCESS,
    BROWSE_TVSHOWS_SUCCESS,
    BROWSE_HOME_FAIL,
    BROWSE_MOVIES_FAIL,
    BROWSE_TVSHOWS_FAIL
} from "../constants/actionTypes";
import { BROWSE_HOME, BROWSE_MOVIES, BROWSE_TVSHOWS } from "../constants/api";

export const getBrowseHome = () => async (dispatch) => {
    try {
        dispatch({ type: BROWSE_HOME_LOAD });
        const results = await axios.get(BROWSE_HOME);
        dispatch({
            type: BROWSE_HOME_SUCCESS,
            payload: results.data,
        });
    } catch (error) {
        dispatch({
            type:BROWSE_HOME_FAIL,
            payload:error
        })
    }
};

export const getBrowseMovies = () => async (dispatch) => {
    try {
        dispatch({ type: BROWSE_MOVIES_LOAD });
        const results = await axios.get(BROWSE_MOVIES);
        dispatch({
            type: BROWSE_MOVIES_SUCCESS,
            payload: results.data,
        });
    } catch (error) {
        dispatch({
            type:BROWSE_MOVIES_FAIL,
            payload:error
        })
    }
};

export const getBrowseTVShows = () => async (dispatch) => {
    try {
        dispatch({ type: BROWSE_TVSHOWS_LOAD });
        const results = await axios.get(BROWSE_TVSHOWS);
        dispatch({
            type: BROWSE_TVSHOWS_SUCCESS,
            payload: results.data,
        });
    } catch (error) {
        dispatch({
            type:BROWSE_TVSHOWS_FAIL,
            payload:error
        })
    }
};
