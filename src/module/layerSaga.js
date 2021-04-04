import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { layerAction } from './layerSlice';

function* getLayerListSaga({ payload: frameId }) {
  try {
    const layerList = [];
    yield put(layerAction.getLayerListSuccess({ layerList }));
  } catch (error) {
    yield put(layerAction.getLayerListFailure('Layer List Error'));
  }
}

export function* watchGetLayerList() {
  yield takeLatest(layerAction.getLayerList, getLayerListSaga);
}

function* rootSaga() {
  yield all([
    fork(watchGetLayerList),
  ]);
}

export default rootSaga;
