import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { INIT_TILE_LAYER_URL } from "../../../config/map";

const options = {
  openPlaces: true,
  openHistoricMaps: false,
  openLayerList: false,
  activeTileLayer: INIT_TILE_LAYER_URL,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: options,

  reducers: {
    toggleFeatures(state) {
      state.openPlaces = !state.openPlaces;
      state.openHistoricMaps = !state.openHistoricMaps;
    },

    toggleLayerList(state) {
      state.openLayerList = !state.openLayerList;
    },

    changeTileLayer(state, action: PayloadAction<string>) {
      if (action.payload === state.activeTileLayer) return;
      state.activeTileLayer = action.payload;
    },
  },
});

export const { toggleFeatures, toggleLayerList, changeTileLayer } =
  sidebarSlice.actions;

export const selectOpenPlaces = (state: RootState) => state.sidebar.openPlaces;

export const selectOpenHistoricMaps = (state: RootState) =>
  state.sidebar.openHistoricMaps;

export const selectOpenLayerList = (state: RootState) =>
  state.sidebar.openLayerList;

export const selectTileLayer = (state: RootState) =>
  state.sidebar.activeTileLayer;

export default sidebarSlice.reducer;
