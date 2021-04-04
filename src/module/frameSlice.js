import {
  createSlice,
  createDraftSafeSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

interface FrameInfoState {
  frameId: string;
  frameOrder: string;
  frameNm: string;
}

interface FrameState {
  frameList: FrameInfoState[];
  isLoading: boolean;
  error: string | null;
}

// 초기 상태
const FrameInitialState: FrameState = {
  frameList: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'frame',
  initialState: FrameInitialState,
  reducers: {
    initFrameState(state: FrameState) {
      state.frameList = [];
      state.linkedFrameOrderList = [];
      state.actionResult = '';
    },
    getFrameList(state: FrameState) {
      state.isLoading = true;
      state.error = null;
    },
    getFrameListSuccess(state: FrameState, { payload: frameList }: PayloadAction<FrameState>) {
      state.frameList = frameList;
      state.isLoading = false;
      state.error = null;
    },
    getFrameListFailure(state: FrameState, { payload: error }: PayloadAction<string>) {
      state.frameList = [];
      state.isLoading = false;
      state.error = error;
    },
    addFrame(state: FrameState, { payload: { frame } }: PayloadAction<FrameInfoState>) {
      state.frameList.push(frame);
      state.isLoading = true;
      state.error = null;
    },
    addFrameSuccess(state: FrameState) {
      state.isLoading = false;
      state.error = null;
    },
    addFrameFailure(state: FrameState, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
    removeFrame(state: FrameState) {
      state.isLoading = true;
      state.error = null;
    },
    removeFrameSuccess(state: FrameState, { payload: { frameId } }: PayloadAction<FrameState>) {
      const findIndex = state.frameList.findIndex(frame => frame.frameId === frameId);
      state.frameList.splice(findIndex, 1);
      state.isLoading = false;
      state.error = null;
    },
    removeFrameFailure(state: FrameState, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

const selectFrameList = createDraftSafeSelector(
  (state: FrameState) => state.frameList,
  frameList => frameList,
);

  const selectStatus = createDraftSafeSelector(
    (state: FrameState) => state.isLoading,
    (state: FrameState) => state.error,
    (actionResult, isLoading, error) => ({ actionResult, isLoading, error }),
  );
  
export const frameSelector = {
  frameList: state => selectFrameList(state[FRAME]),
  status: state => selectStatus(state[FRAME]),
};

export const FRAME = slice.name;
export const frameReducer = slice.reducer;
export const frameAction = slice.actions;
