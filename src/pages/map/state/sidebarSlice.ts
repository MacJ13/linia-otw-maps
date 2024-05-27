import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { INIT_TILE_LAYER_URL } from "../../../config/map";

const options = {
  openPlaces: true,
  openHistoricMaps: false,
  openLayerList: false,
  openSidebar: true,
  activeTileLayer: INIT_TILE_LAYER_URL,
  activeHistoricLayer: "" as string,

  activeHistoricId: "" as string,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: options,

  reducers: {
    changeActiveId(state, action: PayloadAction<string>) {
      state.activeHistoricId = action.payload;
    },

    toggleFeatures(state) {
      state.openPlaces = !state.openPlaces;
      state.openHistoricMaps = !state.openHistoricMaps;

      if (!state.openHistoricMaps) state.activeHistoricLayer = "";
    },

    toggleLayerList(state) {
      state.openLayerList = !state.openLayerList;
    },

    changeTileLayer(state, action: PayloadAction<string>) {
      if (action.payload === state.activeTileLayer) return;
      state.activeTileLayer = action.payload;
    },

    toggleSidebar(state) {
      state.openSidebar = !state.openSidebar;
    },
  },
});

export const {
  toggleFeatures,
  toggleLayerList,
  changeTileLayer,
  changeActiveId,
  toggleSidebar,
} = sidebarSlice.actions;

export const selectOpenPlaces = (state: RootState) => state.sidebar.openPlaces;

export const selectOpenHistoricMaps = (state: RootState) =>
  state.sidebar.openHistoricMaps;

export const selectOpenLayerList = (state: RootState) =>
  state.sidebar.openLayerList;

export const selectTileLayer = (state: RootState) =>
  state.sidebar.activeTileLayer;

export const selectOpenSidebar = (state: RootState) =>
  state.sidebar.openSidebar;

export default sidebarSlice.reducer;
