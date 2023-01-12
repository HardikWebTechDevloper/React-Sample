import { CREATE_REGION, CREATE_REGION_SUCCESSFUL, API_FAILED, EMPTY_ERROR } from './actionTypes';

export const createRegion = (region, history) => {
    return {
        type: CREATE_REGION,
        payload: { region,  history }
    }
}

export const createRegionSuccessful = (region) => {
    return {
        type: CREATE_REGION_SUCCESSFUL,
        payload: region
    }
}

export const apiError = (error) => {
    return {
        type: API_FAILED,
        payload: error
    }
}

export const emptyError = () => {
    return {
        type: EMPTY_ERROR
    }
}

// export const confirmMail = (token,userId) => {
//     return {
//         type: CONFIRM_MAIL,
//         payload: { userId,token }
//     }
// }

// export const confirmSuccess = (user) => {
//     return {
//         type: CONFIRM_SUCCESS,
//         payload: { user }
//     }
// }

// export const confirmError = (error) => {
//     return {
//         type: CONFIRM_ERROR,
//         payload: error
//     }
// }
