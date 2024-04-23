import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HistoricLayer } from "../../../types/map";

// const state = {};

const historicLayerAdapter = createEntityAdapter({
  selectId: (historicLayer: HistoricLayer) => historicLayer.layerId,
});

const historicLayerSlice = createSlice({
  name: "historicLayer",
  initialState: historicLayerAdapter.getInitialState(),
  // initialState: {
  //   activeLayers: [] as HistoricLayer[],
  // },
  reducers: {
    addLayer: {
      reducer: (state, action: PayloadAction<HistoricLayer>) => {
        const { layerId } = action.payload;

        const existId = state.entities[layerId];

        if (existId) return;
        console.log(existId);

        historicLayerAdapter.addOne(state, action.payload);
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
          },
        };
      },
    },
    removeLayer(state, action: PayloadAction<string>) {
      historicLayerAdapter.removeOne(state, action.payload);
      // const filteredLayers = state.activeLayers.filter(
      //   (layer) => action.payload !== layer.id
      // );

      // state.activeLayers = filteredLayers;
    },
  },
});

export const { addLayer, removeLayer } = historicLayerSlice.actions;

// export const selectAllActiveLayers = (state: RootState) =>
//   state.historicLayer.activeLayers;

export const {
  selectAll: selectAllActiveLayers,
  selectById: selectActiveLayerById,
  selectIds: selectActiveLayerIds,
  selectTotal: selectTotalActiveLayers,
} = historicLayerAdapter.getSelectors(
  (state: RootState) => state.historicLayer
);

export default historicLayerSlice.reducer;
