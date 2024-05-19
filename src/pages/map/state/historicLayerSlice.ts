import {
  PayloadAction,
  createSlice,
  nanoid,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ActiveHistoricLayer, HistoricLayerState } from "../../../types/map";

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
    activeLayers: [] as ActiveHistoricLayer[],
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
      // console.log(action.payload);

      const exist = state.activeLayers.find(
        (layer) => layer.layerId == action.payload.layerId
      );

      // state.activeLayers.forEach((layer) => {
      //   console.log(layer.id, layer.layerId, layer.name);
      // });

      // console.log(exist);

      if (exist) return;

      // console.log(exist);

      state.activeLayers.push(action.payload);

      historicLayersAdapter.addOne(state, action.payload);
    },
    /////////

    removeLayer(state, action: PayloadAction<string>) {
      console.log(state.activeLayers, action.payload);
    },

    ///////// DONE
    changeType(state, action: PayloadAction<string>) {
      const targetId = action.payload;
      const existingLayer = state.entities[targetId];

      // console.log(existingLayer.name, existingLayer.layerId, existingLayer.id);

      const updatedLayer = {
        ...existingLayer,
        type: "layer",
      };

      const targetLayer = state.activeLayers.find(
        (layer) => layer.id === action.payload
      );

      if (!targetLayer) return;
      const type = targetLayer.type;
      targetLayer.type = type === "layer" ? "spacer" : "layer";

      historicLayersAdapter.upsertOne(state, updatedLayer);
    },
    /////////

    changeCanvasType(state, action: PayloadAction<string>) {
      const targetLayer = state.activeLayers.find(
        (layer) => layer.id === action.payload
      );

      const canvasLayer = state.entities[action.payload];

      if (!targetLayer) return;
      if (!canvasLayer) return;

      targetLayer.type = "layer";

      canvasLayer.type = "layer";
      historicLayersAdapter.upsertOne(state, canvasLayer);
    },

    ///////// DONE
    removeDraggingSidebarLayer(state) {
      const draggedId = state.sidebarLayer?.id as string;
      // const draggedLayer = state.entities[draggedId];

      // console.log(draggedLayer.name);
      const filteredLayers = state.activeLayers.filter(
        (layer) => layer.type !== "spacer"
      );

      state.activeLayers = filteredLayers;

      historicLayersAdapter.removeOne(state, draggedId);
    },
    removeDraggingCanvasLayer(state, action: PayloadAction<number>) {
      if (state.canvasLayer) {
        state.canvasLayer.type = "spacer";
      }

      const index = action.payload;
      console.log({ payload: action.payload });

      const draggingLayer = state.activeLayers[action.payload];
      // console.log(draggedLayer.name);
      const draggingId = state.ids[index];

      if (!draggingLayer) return;

      const start = state.activeLayers.slice(0, action.payload);

      const end = state.activeLayers.slice(action.payload + 1);

      state.activeLayers = [...start, ...end];

      if (!draggingId) return;

      historicLayersAdapter.removeOne(state, draggingId);
    },
    insertDraggingCanvasLayer(
      state,
      action: PayloadAction<{ activeIndex: number; overIndex: number }>
    ) {
      const { overIndex, activeIndex } = action.payload;

      const canvasIndex = state.activeLayers.findIndex(
        (layer) => layer.id === state.canvasLayer?.id
      );

      const canvasLayer = state.entities[state.canvasLayer?.id as string];
      console.log({ canvasLayer });
      const canvasIndex2 = activeIndex;

      // console.log(canvasLayer.name, canvasLayer.id);
      console.log({ overIndex, canvasIndex, canvasIndex2 });

      if (overIndex === activeIndex && overIndex > -1 && activeIndex < -1)
        return;

      if (overIndex === -1 && activeIndex === -1) {
        state.activeLayers.push(state.canvasLayer as ActiveHistoricLayer);
        historicLayersAdapter.addOne(
          state,
          state.canvasLayer as ActiveHistoricLayer
        );
      } else if (overIndex >= 0 && canvasIndex === -1) {
        const copyLayers = [...state.activeLayers];
        copyLayers.splice(
          overIndex,
          0,
          state.canvasLayer as ActiveHistoricLayer
        );

        state.activeLayers = copyLayers;

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
        const overLayer = state.activeLayers[overIndex];
        const activeLayer = state.activeLayers[activeIndex];

        const overLayer2 = state.ids[overIndex];
        const activeLayer2 = state.ids[activeIndex];
        if (!overLayer) return;
        if (!overLayer2) return;

        state.ids[overIndex] = activeLayer2;
        state.ids[activeIndex] = overLayer2;

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

      // console.log(state.sidebarLayer?.name);

      const sidebarLayer2 = state.entities[state.sidebarLayer?.id as string];

      // console.log(
      //   "sidebarLayer2: ,",
      //   sidebarLayer2.name,
      //   sidebarLayer2.id,
      //   sidebarLayer2.layerId,
      //   sidebarLayer2.type
      // );

      // console.log(
      //   "spacer layer: ",
      //   sidebarLayer?.name,
      //   sidebarLayer?.id,

      //   sidebarLayer?.layerId
      // );

      const overLayer = state.activeLayers[overIndex];

      const overLayerId = state.ids[overIndex];

      const overLayer2 = state.entities[overLayerId];
      // console.dir(overLayer2);
      // console.log(
      //   "over layer 2: ",
      //   overLayer2?.name,
      //   overLayer2?.id,

      //   overLayer2?.layerId,
      //   overLayer2?.type
      // );

      // const arrObj = Object.values(state.entities);

      // const start = arrObj.slice(0, overIndex);
      // const end = arrObj.slice(overIndex - 1);

      // console.log(start);
      if (sidebarLayer?.id === overLayer.id) return;
      if (sidebarLayer2?.id === overLayer2.id) return;

      const dragLayer = sidebarLayer ? sidebarLayer : state.sidebarLayer;

      // const dragLayer2 = sidebarLayer2 ? sidebarLayer2 : state.sidebarLayer;

      if (!sidebarLayer2) {
        // console.log(state.ids.findIndex((id) => id === state.sidebarLayer?.id));

        historicLayersAdapter.addOne(
          state,
          state.sidebarLayer as ActiveHistoricLayer
        );
        // const draggedId = state.ids[state.ids.length - 1];

        // const overId = state.ids[overIndex];

        const canvasIds = Array.from(state.ids);

        const draggedId = canvasIds.pop();

        if (draggedId) {
          canvasIds.splice(overIndex, 0, draggedId);

          state.ids = canvasIds;
        }

        // console.log({ draggedId, overId });
      } else {
        const draggedIndex = state.ids.findIndex(
          (id) => id === sidebarLayer2.id
        );

        state.ids[draggedIndex] = overLayer2.id;
        state.ids[overIndex] = sidebarLayer2.id;

        // console.log({ draggedIndex, overIndex });
        // const sidebarLayerDragging =
        //   state.entities[state.sidebarLayer?.id as string];
        // console.log(sidebarLayerDragging.name);
        // historicLayersAdapter.
        // const draggedId =
      }
      // if (sidebarLayer2)
      //   historicLayersAdapter.removeOne(state, sidebarLayer2.id);

      // historicLayersAdapter.upsertMany(state, [
      //   ...start,
      //   dragLayer as ActiveHistoricLayer,
      //   ...end,
      // ]);

      // historicLayersAdapter.removeOne(state, sidebarLayer2.id);
      // historicLayersAdapter.addOne(state, dragLayer2 as ActiveHistoricLayer);

      // const copyIds = [...state.ids];

      // const overIndx = copyIds[overIndex];
      // const dragIndx = copyIds[state.ids.length - 1];

      // console.log(state.entities[dragIndx].name);

      // const startIds = copyIds.slice(0, overIndex);

      // const endIds = copyIds.slice(overIndex);

      // // console.log({ start, end });

      // state.ids = [...startIds, ...endIds];

      // const arrObj = Object.values(state.entities);
      // arrObj.splice(overIndex, 0, dragLayer2 as ActiveHistoricLayer);

      // console.log(arrObj);

      // historicLayersAdapter.upsertMany(state, arrObj);

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

export const {
  selectAll: selectAllActiveLayersTest,
  selectById: selectActiveLayerByIdTest,
  selectIds: selectActiveLayerIdsTest,
} = historicLayersAdapter.getSelectors(
  (state: RootState) => state.historicLayer
);

export const selectAllActiveLayers = (state: RootState) =>
  state.historicLayer.activeLayers;

export const getSidebarLayer = (state: RootState) =>
  state.historicLayer.sidebarLayer;

export const getCanvasLayer = (state: RootState) =>
  state.historicLayer.canvasLayer;

export default historicLayerSlice.reducer;
