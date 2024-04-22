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

export interface HistoricLayer {
  layerId: string;
  id: string;
  name: string;
  layers: string;
  url: string;
  format: string;
  transparent: boolean;
  opacity: number;
}

export type FragmentMapItemProps = {
  name: string;
  layers: string;
  url: string;
  format: string;
};

export type LayerProps = {
  layer: {
    id: string;
    name: string;
    layers: string;
    url: string;
    format: string;
  };
};

export type HistLayer = {
  name: string;
  layers: string;
  url: string;
  format: string;
};

export type DragHistItem = {
  children?: React.ReactNode;
} & HistLayer;
