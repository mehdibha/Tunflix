import axios from "axios";
import { GET_MEDIA_LOAD, GET_MEDIA_SUCCESS, GET_MEDIA_FAIL, HANDLE_MODAL_IS_OPEN } from "../constants/actionTypes";
import { BASE_MOVIE, BASE_TVSHOW } from "../constants/api";

export const getMedia = (id, mediaType) => async (dispatch) => {
    try {
        dispatch({ type: GET_MEDIA_LOAD });
        const results = await axios.get(`${mediaType === 'tv' ? BASE_TVSHOW : BASE_MOVIE}/${id}`);
        dispatch({
            type: GET_MEDIA_SUCCESS,
            payload: { media: results.data, mediaType },
        });
    } catch (error) {
        dispatch({
            type: GET_MEDIA_FAIL,
            payload: error,
        });
    }
};

export const handleModal = (bool) => (dispatch) => {
    dispatch({ type: HANDLE_MODAL_IS_OPEN, payload: bool });
};
