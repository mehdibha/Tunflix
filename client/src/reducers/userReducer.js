import {
    SIGN_IN_USER_SUCCESS,
    SIGN_UP_USER_SUCCESS,
    SIGN_OUT_USER_SUCCESS,
    SET_LOADING,
    AUTH_FAIL,
    GET_AUTH_USER,
    SET_LOADING_LOCAL,
    SET_LOADING_GOOGLE,
    SET_DARK_MODE,
} from "../constants/actionTypes";

const initialState = {
    token: null,
    user: null,
    isLoading: true,
    isAuth: false,
    error: null,
    darkMode: true,
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_IN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadingLocal: false,
                isLoadingGoogle: false,
                isAuth: true,
                token: payload.token,
                user: payload.user,
                error: null,
            };
        case SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                token: payload.token,
                user: payload.user,
                error: null,
            };
        case SET_LOADING:
            return { ...state, isLoading: true };
        case SET_LOADING_LOCAL:
            return { ...state, isLoading: true, isLoadingLocal: true, isLoadingGoogle: false };
        case SET_LOADING_GOOGLE:
            return { ...state, isLoading: true, isLoadingGoogle: true, isLoadingLocal: false };
        case AUTH_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isLoading: false,
                isLoadingLocal: false,
                isLoadingGoogle: false,
                isAuth: false,
                error: payload,
            };
        case GET_AUTH_USER:
            return {
                ...state,
                isLoading: false,
                isLoadingGoogle: false,
                isLoadingLocal: false,
                isAuth: true,
                user: payload.user,
            };
        case SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                token: null,
                user: null,
                isLoading: false,
                isLoadingLocal: false,
                isLoadingGoogle: false,
                isAuth: false,
                error: payload,
            };
        case SET_DARK_MODE:
            return { ...state, darkMode: payload };
        default:
            return state;
    }
};

export default userReducer;
