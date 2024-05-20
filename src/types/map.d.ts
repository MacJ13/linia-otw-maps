type FeatureItem = {
  active: boolean;
  handleClick: () => void;
};

export type FeatureSidebarItem = {
  active: boolean;
  handleClick: () => void;
};

export type MapButtonProps = {
  name: string;
  handleClick: () => void;
};

export type FragmentMapItemProps = {
  src?: string;
  title?: string;
};

export type SidebarItemProps = {
  btnName: string;
  children?: React.ReactNode;
} & FeatureSidebarItem;

export type SidebarFeatureProps = {
  btnName: string;
  children?: React.ReactNode;
} & FeatureSidebarItem;

export interface SideBarOptions {
  activeFeatureId: string;
  openLayerList: boolean;
}

interface SidebarLayer {
  id: string;
  name: string;
  layers: string;
  url: string;
  format: string;
}

export type HistoricLayer = {
  activeId: string;
} & SidebarLayer;

export type ActiveHistoricLayer = {
  type: string;
  layerId: string;
  transparent: boolean;
  opacity: number;
} & HistLayer;

export type FragmentMapItemProps = {
  name: string;
  layers: string;
  url: string;
  format: string;
};

export type DraggableLayerProps = {
  layer: HistoricLayer;
  // exist: boolean;
};

export type LayerProps = {
  overlay?: boolean;
  layer: ActiveHistoricLayer | null | HistoricLayer;
};

type CanvasProps = {
  // layers: ActiveHistoricLayer[];
  ids: string[];
  dragging: boolean;
};

type SortableItemProps = {
  id: string;
  // layer: ActiveHistoricLayer;
  layerId: string;
  index: number;
};

type CanvasItemProps = {
  overlay?: boolean;
  layer: ActiveHistoricLayer;
};

export interface HistoricLayerState {
  activeLayers: ActiveHistoricLayer[];
  sidebarLayer: ActiveHistoricLayer | null;
  canvasLayer: ActiveHistoricLayer | null;
}

// export type LayerProps = {
//   layer: {
//     id: string;
//     name: string;
//     layers: string;
//     url: string;
//     format: string;
//   };
// };

// export type HistLayer = {
//   name: string;
//   layers: string;
//   url: string;
//   format: string;
// };

// export type DragHistItem = {
//   children?: React.ReactNode;
// } & HistLayer;
