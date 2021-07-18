import {
    GET_MEDIA_LOAD,GET_MEDIA_SUCCESS,GET_MEDIA_FAIL,HANDLE_MODAL_IS_OPEN
} from "../constants/actionTypes";

const initialState = {
    media: null,
    mediaType: null,
    isLoading: false,
    modalIsOpen : false,
    error:null
};

const watchReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_MEDIA_LOAD:
            return {
                ...state,
                isLoading: true,
            };
        case GET_MEDIA_SUCCESS:
            return {
                ...state,
                isLoading:false,
                media: payload.media,
                mediaType: payload.mediaType,
                error: null,
            };
        case GET_MEDIA_FAIL:
            return {
                ...state,
                isLoading:false,
                error: payload,
            };
        case HANDLE_MODAL_IS_OPEN:
            return {
                ...state,
                modalIsOpen:payload
            }
                default:
            return state;
    }
};

export default watchReducer;
