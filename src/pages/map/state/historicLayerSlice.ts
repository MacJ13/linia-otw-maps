import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HistoricLayer } from "../../../types/map";

// const state = {};

const historicLayerSlice = createSlice({
  name: "historicLayer",
  initialState: {
    activeLayers: [] as HistoricLayer[],
  },
  reducers: {
    addLayer: {
      reducer: (state, action: PayloadAction<HistoricLayer>) => {
        state.activeLayers.push(action.payload);
      },
      prepare(name: string, layers: string, url: string, format: string) {
        return {
          payload: {
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
      const filteredLayers = state.activeLayers.filter(
        (layer) => action.payload !== layer.id
      );

      state.activeLayers = filteredLayers;
    },
  },
});

export const { addLayer, removeLayer } = historicLayerSlice.actions;

export const selectAllActiveLayers = (state: RootState) =>
  state.historicLayer.activeLayers;
export default historicLayerSlice.reducer;
