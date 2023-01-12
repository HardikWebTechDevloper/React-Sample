import { takeEvery, fork, put, all, call } from 'redux-saga/effects';

//Account Redux states
import { CREATE_REGION } from './actionTypes';
import { createRegionSuccessful, apiError } from './actions';

//AUTH related methods 
import { postAPI } from '../../helpers/authUtils';

// Is user register successfully then direct plot user in redux.
function* createRegion({ payload: { region, history } }) {
    try {  
        const response = yield call(postAPI, '/admin/regions', region);
        yield put(createRegionSuccessful(response));
        history.push('/regions');
    } catch (error) {
        yield put(apiError(error));
    }
}

export function* watchRegion() {
    yield takeEvery(CREATE_REGION, createRegion)
}

function* regionSaga() {
    yield all([fork(watchRegion)]);
}

export default regionSaga;