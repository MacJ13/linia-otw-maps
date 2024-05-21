import {
  PayloadAction,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ActiveHistoricLayer } from "../../../types/map";

// const initialState: HistoricLayerState = {
//   activeLayers: [],
//   sidebarLayer: null,
//   canvasLayer: null,
// };

const historicLayersAdapter = createEntityAdapter({
  selectId: (layer: ActiveHistoricLayer) => layer.id,
});

const historicLayerSlice = createSlice({
  name: "historicLayer",

  // initialState: {
  //   activeLayers: [] as ActiveHistoricLayer[],
  //   sidebarLayer: null as ActiveHistoricLayer | null,
  //   canvasLayer: null as ActiveHistoricLayer | null,
  // },

  // initialState,
  initialState: historicLayersAdapter.getInitialState({
    // activeLayers: [] as ActiveHistoricLayer[],
    sidebarLayer: null as ActiveHistoricLayer | null,
    canvasLayer: null as ActiveHistoricLayer | null,
  }),
  reducers: {
    ///////// NO CHANGE
    createSidebarLayer: {
      reducer: (state, action: PayloadAction<ActiveHistoricLayer | null>) => {
        state.sidebarLayer = action.payload;
      },
      prepare(
        id: string,
        activeId: string,
        name: string,
        layers: string,
        url: string,
        format: string
      ) {
        return {
          payload: {
            layerId: id,
            // id: nanoid(),
            id: activeId,
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

    addSidebarLayer: {
      reducer: (state, action: PayloadAction<ActiveHistoricLayer | null>) => {
        const layer = action.payload;
        const exist = state.entities[layer.id];

        if (exist) return;
        historicLayersAdapter.addOne(state, layer);
      },
      prepare(
        id: string,
        activeId: string,
        name: string,
        layers: string,
        url: string,
        format: string
      ) {
        return {
          payload: {
            layerId: id,
            // id: nanoid(),
            id: activeId,
            name,
            layers,
            url,
            format,
            transparent: true,
            opacity: 1,
            type: "layer",
          },
        };
      },
    },

    ///////// NO CHANGE
    createCanvasLayer(state, action: PayloadAction<ActiveHistoricLayer>) {
      state.canvasLayer = action.payload;
    },
    /////////

    ///////// NO CHANGE
    removeActiveLayers(state) {
      state.sidebarLayer = null;
      state.canvasLayer = null;
    },
    /////////

    ///////// DONE
    addLayer(state, action: PayloadAction<ActiveHistoricLayer>) {
      // const exist = state.activeLayers.find(
      //   (layer) => layer.layerId == action.payload.layerId
      // );
      // if (exist) return;
      // state.activeLayers.push(action.payload);

      const layer = action.payload;

      const exist = state.entities[layer.id];

      if (exist) return;

      historicLayersAdapter.addOne(state, action.payload);
    },
    /////////

    removeLayer(state, action: PayloadAction<string>) {
      const id = action.payload;
      const layer = state.entities[id];

      if (!layer) return;

      historicLayersAdapter.removeOne(state, id);
    },

    ///////// DONE
    changeType(state, action: PayloadAction<string>) {
      // const targetLayer = state.activeLayers.find(
      //   (layer) => layer.id === action.payload
      // );

      // if (!targetLayer) return;
      // const type = targetLayer.type;
      // targetLayer.type = type === "layer" ? "spacer" : "layer";

      const targetId = action.payload;
      const existingLayer = state.entities[targetId];

      if (!existingLayer) return;

      const updatedLayer = {
        ...existingLayer,
        type: "layer",
      };

      historicLayersAdapter.upsertOne(state, updatedLayer);
    },
    /////////

    changeCanvasType(state, action: PayloadAction<string>) {
      // const targetLayer = state.activeLayers.find(
      //   (layer) => layer.id === action.payload
      // );

      // if (!targetLayer) return;
      // targetLayer.type = "layer";

      const targetId = action.payload;
      const canvasLayer = state.entities[targetId];

      if (!canvasLayer) return;

      // canvasLayer.type = "layer";
      historicLayersAdapter.upsertOne(state, { ...canvasLayer, type: "layer" });
    },

    ///////// DONE
    removeDraggingSidebarLayer(state) {
      const draggedId = state.sidebarLayer?.id as string;

      // const filteredLayers = state.activeLayers.filter(
      //   (layer) => layer.type !== "spacer"
      // );

      // state.activeLayers = filteredLayers;

      historicLayersAdapter.removeOne(state, draggedId);
    },
    removeDraggingCanvasLayer(state, action: PayloadAction<number>) {
      if (state.canvasLayer) {
        state.canvasLayer.type = "spacer";
      }

      // const draggingLayer = state.activeLayers[action.payload];

      // if (!draggingLayer) return;

      // const start = state.activeLayers.slice(0, action.payload);

      // const end = state.activeLayers.slice(action.payload + 1);

      // state.activeLayers = [...start, ...end];

      const index = action.payload;

      const draggingId = state.ids[index];

      if (!draggingId) return;

      historicLayersAdapter.removeOne(state, draggingId);
    },
    insertDraggingCanvasLayer(
      state,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>
    ) {
      const { overIndex, activeIndex } = action.payload;

      // const canvasIndex = state.activeLayers.findIndex(
      //   (layer) => layer.id === state.canvasLayer?.id
      // );
      // if (overIndex === activeIndex && overIndex > -1 && activeIndex < -1)
      //   return;

      // if (overIndex === -1 && activeIndex === -1) {
      //   state.activeLayers.push(state.canvasLayer as ActiveHistoricLayer);
      // }
      // else if (overIndex >= 0 && canvasIndex === -1) {
      //   const copyLayers = [...state.activeLayers];
      //   copyLayers.splice(
      //     overIndex,
      //     0,
      //     state.canvasLayer as ActiveHistoricLayer
      //   );

      //   state.activeLayers = copyLayers;

      // }
      // else {
      //   const overLayer = state.activeLayers[overIndex];
      //   const activeLayer = state.activeLayers[activeIndex];
      //   if (!overLayer) return;

      //   state.activeLayers[overIndex] = activeLayer;
      //   state.activeLayers[activeIndex] = overLayer;
      // }

      const canvasIndex = activeIndex;

      if (overIndex === activeIndex && overIndex > -1 && activeIndex < -1)
        return;

      if (overIndex === -1 && activeIndex === -1) {
        historicLayersAdapter.addOne(
          state,
          state.canvasLayer as ActiveHistoricLayer
        );
      } else if (overIndex >= 0 && canvasIndex === -1) {
        historicLayersAdapter.addOne(
          state,
          state.canvasLayer as ActiveHistoricLayer
        );

        const canvasIds = Array.from(state.ids);

        const draggedId = canvasIds.pop();

        if (draggedId) {
          canvasIds.splice(overIndex, 0, draggedId);

          state.ids = canvasIds;
        }
      } else {
        const overId = state.ids[overIndex];
        const activeId = state.ids[activeIndex];
        if (!overId) return;

        state.ids[overIndex] = activeId;
        state.ids[activeIndex] = overId;
      }
    },
    changePositions(
      state,
      action: PayloadAction<{
        overIndex: number;
      }>
    ) {
      const { overIndex } = action.payload;

      // const sidebarLayer = state.activeLayers.find(
      //   (activeLayer) => activeLayer.type === "spacer"
      // );
      // const overLayer = state.activeLayers[overIndex];

      // if (sidebarLayer?.id === overLayer.id) return;

      // const dragLayer = sidebarLayer ? sidebarLayer : state.sidebarLayer;

      // const filteredLayers = state.activeLayers.filter(
      //   (layer) => layer.type !== "spacer"
      // );

      // filteredLayers.splice(overIndex, 0, dragLayer as ActiveHistoricLayer);

      // state.activeLayers = filteredLayers;

      const sidebarLayer = state.entities[state.sidebarLayer?.id as string];

      const overLayerId = state.ids[overIndex];

      const overLayer = state.entities[overLayerId];

      if (sidebarLayer?.id === overLayer.id) return;

      if (!sidebarLayer) {
        historicLayersAdapter.addOne(
          state,
          state.sidebarLayer as ActiveHistoricLayer
        );

        const canvasIds = Array.from(state.ids);

        const draggedId = canvasIds.pop();

        if (draggedId) {
          canvasIds.splice(overIndex, 0, draggedId);

          state.ids = canvasIds;
        }
      } else {
        const draggedIndex = state.ids.indexOf(sidebarLayer.id);

        state.ids[draggedIndex] = overLayer.id;
        state.ids[overIndex] = sidebarLayer.id;
      }
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
  addSidebarLayer,
} = historicLayerSlice.actions;

export const {
  selectAll: selectAllActiveLayers,
  selectById: selectActiveLayerById,
  selectIds: selectActiveLayerIds,
} = historicLayersAdapter.getSelectors(
  (state: RootState) => state.historicLayer
);

// export const selectActiveLayerByHistoricLayerId = (state: RootState) =>
//   state.historicLayer.entities[]

// export const selectAllActiveLayers = (state: RootState) =>
//   state.historicLayer.activeLayers;

export const getSidebarLayer = (state: RootState) =>
  state.historicLayer.sidebarLayer;

export const getCanvasLayer = (state: RootState) =>
  state.historicLayer.canvasLayer;

export default historicLayerSlice.reducer;
