import {
    BROWSE_HOME_LOAD,
    BROWSE_HOME_SUCCESS,
    BROWSE_HOME_FAIL,
    BROWSE_MOVIES_LOAD,
    BROWSE_MOVIES_SUCCESS,
    BROWSE_MOVIES_FAIL,
    BROWSE_TVSHOWS_LOAD,
    BROWSE_TVSHOWS_SUCCESS,
    BROWSE_TVSHOWS_FAIL,
} from "../constants/actionTypes";

const initialState = {
    isLoadingHome: false,
    isLoadingMovies: false,
    isLoadingTVShows: false,
    bannerHome: null,
    rowsHome: null,
    bannerMovies: null,
    rowsMovies: null,
    bannerTVShows: null,
    rowsTVShows: null,
    errorHome: null,
    errorMovies: null,
    errorTVShows: null,
};

const browseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case BROWSE_HOME_LOAD:
            return { ...state, isLoadingHome: true };
        case BROWSE_MOVIES_LOAD:
            return { ...state, isLoadingMovies: true };
        case BROWSE_TVSHOWS_LOAD:
            return { ...state, isLoadingTVShows: true };
        case BROWSE_HOME_SUCCESS:
            return { ...state, bannerHome: payload.banner, rowsHome: payload.rows, isLoadingHome: false, errorHome:null };
        case BROWSE_MOVIES_SUCCESS:
            return { ...state, bannerMovies: payload.banner, rowsMovies: payload.rows, isLoadingMovies: false,errorMovies:null };
        case BROWSE_TVSHOWS_SUCCESS:
            return { ...state, bannerTVShows: payload.banner, rowsTVShows: payload.rows, isLoadingTVShows: false,errorTVShows:null };
        case BROWSE_HOME_FAIL:
            return { ...state, isLoadingHome: false, errorHome:payload };
        case BROWSE_MOVIES_FAIL:
            return { ...state, isLoadingMovies:false, errorMovies:payload };
        case BROWSE_TVSHOWS_FAIL:
            return { ...state, isLoadingTVShows:false, errorTVShows:payload };
        default:
            return state;
    }
};

export default browseReducer;
