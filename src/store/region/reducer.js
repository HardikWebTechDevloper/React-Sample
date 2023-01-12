import { CREATE_REGION, CREATE_REGION_SUCCESSFUL, API_FAILED, EMPTY_ERROR } from './actionTypes';

const initialState = {
    createError: null, message: null, loading: null
}

const region = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REGION:
            state = {
                ...state,
                region: null,
                loading: true,
                createError: null
            }
            break;
        case EMPTY_ERROR:
            state = {
                createError: false,
                region: false,
                loading: false
            }
            break;
        case CREATE_REGION_SUCCESSFUL:
            state = {
                ...state,
                region: action.payload,
                loading: false,
                createError: null
            }
            break;
        case API_FAILED:
            state = {
                ...state,
                loading: false,
                createError: action.payload
            }
            break;
        // case CONFIRM_MAIL:
        //     state = {
        //         confirmSuccess: false,
        //         confirmError: false,
        //     }
        //     break;
        // case CONFIRM_SUCCESS:
        //     state = {
        //         confirmSuccess: action.payload,
        //         confirmError: false,
        //     }
        //     break;
        // case CONFIRM_ERROR:
        //     state = {
        //         confirmSuccess: false,
        //         confirmError: action.payload
        //     }
        //     break;
        default:
            state = { ...state };
            break;
    }
    return state;
}

export default region;