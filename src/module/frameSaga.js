import { all, fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import * as frameApiLib from '../lib/frameApi';

import { frameAction } from './frameSlice';
import { activeItemAction } from './activeItemSlice';

function* getFrameList({ payload: playlistId}) {
  try {
    const frameList = yield call(frameApiLib.getFrameList, playlistId);
    if (frameList.length) {
      yield put(frameAction.clickFrame({ frameId: frameList[0].frameId }));
    } else {
      yield put(activeItemAction.setActiveFrameId(''));
    }
    yield put(frameAction.getFrameListSuccess(frameList));
  } catch (error) {
    yield put(frameAction.getFrameListFailure('getFrameList error'));
  }
}

function* addFrame({ payload: { activePlaylistId, initFrame, initLayer } }) {
  try {
    yield call(frameApiLib.addFrame, { frame: initFrame });

    yield put(frameAction.addFrameSuccess());
    yield put(frameAction.clickFrame({ frameId: initFrame.frameId, addAfter: true, layer: initLayer }));
  } catch (error) {
    yield put(frameAction.addFrameFailure(error));
  }
}

function* removeFrame({ payload: { frameId, index } }) {
  try {
    yield call(frameApiLib.removeFrame, frameId);
    yield put(frameAction.removeFrameSuccess());
  } catch (error) {
    yield put(frameAction.removeFrameFailure(error));
  }
}

export function* watchGetFrameList() {
  yield takeLatest(frameAction.getFrameList, getFrameList);
}

export function* watchAddFrame() {
  yield takeEvery(frameAction.addFrame, addFrame);
}

export function* watchRemoveFrame() {
  yield takeEvery(frameAction.removeFrame, removeFrame);
}


function* rootSaga() {
  yield all([
    fork(watchGetFrameList),
    fork(watchAddFrame),
    fork(watchRemoveFrame),
  ]);
}

export default rootSaga;
