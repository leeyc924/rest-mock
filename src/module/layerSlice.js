import {
  createSlice,
  createDraftSafeSelector,
  PayloadAction,
} from '@reduxjs/toolkit';

interface LayerDataState {
  layerId: string;
  layerOrder: number;
  width: number;
  height: number;
  x: number;
  y: number;
  title: number;
  color: string;
}

interface LayerState {
  layerList: Array<LayerDataState>;
  isLoading: boolean;
  error: string | null;
}

const initialState: LayerState = {
  layerList: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'layer',
  initialState,
  reducers: {
    initLayerState(state: LayerState, { payload }: PayloadAction<String>) {
      state.layerList = [];
    },
    getLayerList(state: LayerState, { payload }: PayloadAction<String>) {
      state.isLoading = true;
      state.error = null;
    },
    getLayerListSuccess(state: LayerState, { payload: { layerList }}: PayloadAction<LayerState>) {
      state.layerList = layerList;
      state.isLoading = false;
      state.error = null;
    },
    getLayerListFailure(state: LayerState, { payload }: PayloadAction<String>) {
      state.isLoading = false;
      state.error = payload;
    },
  }
});

const selectLayerList = createDraftSafeSelector(
  (state: LayerState) => state.layerList,
  (layerList) => layerList,
);

const selectStatus = createDraftSafeSelector(
  (state: LayerState) => state.isLoading,
  (state: LayerState) => state.error,
  (isLoading, error) => ({ isLoading, error }),
);

export const layerSelector = {
  layerList: state => selectLayerList(state[LAYER]),
  status: state => selectStatus(state[LAYER]),
};

export const LAYER = slice.name;
export const layerReducer = slice.reducer;
export const layerAction = slice.actions;
