import { useDraggable } from "@dnd-kit/core";
import style from "./DraggableSidebarLayer.module.scss";

import {
  DraggableLayerProps,
  HistoricLayer,
  LayerProps,
} from "../../../../types/map";
import { HISTORIC_LAYERS } from "../../../../config/map";

export const SidebarLayer = ({ layer, overlay }: LayerProps) => {
  let cls = style.item;

  const { name } = layer as HistoricLayer;

  if (overlay) {
    cls += " " + style.overlay;
  }

  return <div className={cls}>{name}</div>;
};

const DraggableSidebarLayer = (props: DraggableLayerProps) => {
  const { layer, ...rest } = props;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: layer.id as string,
    data: {
      layer: { ...layer },
      fromSidebar: true,
    },
  });

  return (
    <div ref={setNodeRef} className={style.item} {...listeners} {...attributes}>
      <SidebarLayer layer={layer} {...rest} />
    </div>
  );
};

const DraggableSidebarList = () => {
  const layers = HISTORIC_LAYERS.map((layer) => {
    return <DraggableSidebarLayer key={layer.id} layer={layer} />;
  });

  return <div id="draggable-sidebar-list">{layers}</div>;
};

export default DraggableSidebarList;
