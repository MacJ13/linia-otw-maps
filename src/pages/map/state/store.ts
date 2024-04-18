import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import historicLayerReducer from "./historicLayerSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    historicLayer: historicLayerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
