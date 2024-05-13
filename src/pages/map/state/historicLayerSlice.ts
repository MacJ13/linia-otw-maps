import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ActiveHistoricLayer, HistoricLayerState } from "../../../types/map";

const initialState: HistoricLayerState = {
  activeLayers: [],
  sidebarLayer: null,
  canvasLayer: null,
};

const historicLayerSlice = createSlice({
  name: "historicLayer",

  // initialState: {
  //   activeLayers: [] as ActiveHistoricLayer[],
  //   sidebarLayer: null as ActiveHistoricLayer | null,
  //   canvasLayer: null as ActiveHistoricLayer | null,
  // },
  initialState,
  reducers: {
    createSidebarLayer: {
      reducer: (state, action: PayloadAction<ActiveHistoricLayer | null>) => {
        state.sidebarLayer = action.payload;
      },
      prepare(
        id: string,
        name: string,
        layers: string,
        url: string,
        format: string
      ) {
        return {
          payload: {
            layerId: id,
            id: nanoid(),
            name,
            layers,
            url,
            format,
            transparent: true,
            opacity: 1,
            type: "spacer",
          },
        };
      },
    },

    createCanvasLayer(state, action: PayloadAction<ActiveHistoricLayer>) {
      state.canvasLayer = action.payload;
    },

    removeActiveLayers(state) {
      state.sidebarLayer = null;
      state.canvasLayer = null;
    },

    addLayer(state, action: PayloadAction<ActiveHistoricLayer>) {
      const exist = state.activeLayers.find(
        (layer) => layer.id == action.payload.id
      );

      if (exist) return;

      state.activeLayers.push(action.payload);
    },

    removeLayer(state, action: PayloadAction<string>) {
      console.log(state.activeLayers, action.payload);
    },
    changeType(state, action: PayloadAction<string>) {
      const targetLayer = state.activeLayers.find(
        (layer) => layer.id === action.payload
      );

      if (!targetLayer) return;
      const type = targetLayer.type;
      targetLayer.type = type === "layer" ? "spacer" : "layer";
    },

    changeCanvasType(state, action: PayloadAction<string>) {
      const targetLayer = state.activeLayers.find(
        (layer) => layer.id === action.payload
      );

      if (!targetLayer) return;

      targetLayer.type = "layer";
    },
    removeDraggingSidebarLayer(state) {
      const filteredLayers = state.activeLayers.filter(
        (layer) => layer.type !== "spacer"
      );

      state.activeLayers = filteredLayers;
    },
    removeDraggingCanvasLayer(state, action: PayloadAction<number>) {
      if (state.canvasLayer) {
        state.canvasLayer.type = "spacer";
      }

      const draggingLayer = state.activeLayers[action.payload];

      if (!draggingLayer) return;

      const start = state.activeLayers.slice(0, action.payload);

      const end = state.activeLayers.slice(action.payload + 1);

      state.activeLayers = [...start, ...end];
    },
    insertDraggingCanvasLayer(
      state,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>
    ) {
      const { overIndex, activeIndex } = action.payload;

      const canvasIndex = state.activeLayers.findIndex(
        (layer) => layer.id === state.canvasLayer?.id
      );

      if (overIndex === activeIndex && overIndex > -1 && activeIndex < -1)
        return;

      if (overIndex === -1 && activeIndex === -1) {
        state.activeLayers.push(state.canvasLayer as ActiveHistoricLayer);
      } else if (overIndex >= 0 && canvasIndex === -1) {
        const copyLayers = [...state.activeLayers];
        copyLayers.splice(
          overIndex,
          0,
          state.canvasLayer as ActiveHistoricLayer
        );

        state.activeLayers = copyLayers;
      } else {
        const overLayer = state.activeLayers[overIndex];
        const activeLayer = state.activeLayers[activeIndex];
        if (!overLayer) return;

        state.activeLayers[overIndex] = activeLayer;
        state.activeLayers[activeIndex] = overLayer;
      }
    },
    changePositions(
      state,
      action: PayloadAction<{
        overIndex: number;
      }>
    ) {
      const { overIndex } = action.payload;

      const sidebarLayer = state.activeLayers.find(
        (activeLayer) => activeLayer.type === "spacer"
      );

      const overLayer = state.activeLayers[overIndex];

      if (sidebarLayer?.id === overLayer.id) return;

      const dragLayer = sidebarLayer ? sidebarLayer : state.sidebarLayer;

      const filteredLayers = state.activeLayers.filter(
        (layer) => layer.type !== "spacer"
      );

      filteredLayers.splice(overIndex, 0, dragLayer as ActiveHistoricLayer);

      state.activeLayers = filteredLayers;
    },
  },
});

export const {
  addLayer,
  removeLayer,
  changePositions,
  changeType,
  changeCanvasType,
  removeDraggingSidebarLayer,
  createSidebarLayer,
  removeActiveLayers,
  removeDraggingCanvasLayer,
  createCanvasLayer,
  insertDraggingCanvasLayer,
} = historicLayerSlice.actions;

export const selectAllActiveLayers = (state: RootState) =>
  state.historicLayer.activeLayers;

export const getSidebarLayer = (state: RootState) =>
  state.historicLayer.sidebarLayer;

export const getCanvasLayer = (state: RootState) =>
  state.historicLayer.canvasLayer;

export default historicLayerSlice.reducer;
