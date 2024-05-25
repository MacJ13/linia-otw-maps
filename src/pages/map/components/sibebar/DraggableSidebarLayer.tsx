import { useDraggable } from "@dnd-kit/core";
import style from "./DraggableSidebarLayer.module.scss";

import {
  ActiveHistoricLayer,
  DraggableLayerProps,
  LayerProps,
} from "../../../../types/map";
import { HISTORIC_LAYERS } from "../../../../config/map";
import { useDispatch, useSelector } from "react-redux";
import {
  // addSidebarLayer,
  createSidebarLayer,
  selectActiveLayerById,
} from "../../state/historicLayerSlice";
import { RootState } from "../../state/store";

export const SidebarLayer = ({ layer, overlay }: LayerProps) => {
  let cls = style.item;

  const { name } = layer as ActiveHistoricLayer;

  if (overlay) {
    cls += " " + style.overlay;
  }

  return (
    <div className={cls}>
      <div className={style.content}>{name}</div>
    </div>
  );
};

const DraggableSidebarLayer = (props: DraggableLayerProps) => {
  const dispatch = useDispatch();

  const { layer, ...rest } = props;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: layer.id as string,
    data: {
      layer: { ...layer },
      fromSidebar: true,
    },
  });

  const activeLayer = useSelector((state: RootState) =>
    selectActiveLayerById(state, layer.activeId)
  );

  const exist = Boolean(activeLayer);

  if (exist) {
    return (
      <div className={style.item + " " + style.dragged}>
        <SidebarLayer layer={layer} {...rest} />
      </div>
    );
  }

  // if (exist) {
  //   return null;
  // }

  const onHandleClick = () => {
    dispatch(
      createSidebarLayer(
        layer.id,
        layer.activeId,
        layer.name,
        layer.layers,
        layer.url,
        layer.format,
        "layer"
      )
    );
  };

  return (
    <div
      onClick={onHandleClick}
      ref={setNodeRef}
      className={style.item}
      {...listeners}
      {...attributes}
    >
      <SidebarLayer layer={layer} {...rest} />
    </div>
  );
};

const DraggableSidebarList = () => {
  // const activeLayers = useSelector(selectAllActiveLayers);

  // const activeCanvasLayer = useSelector(getCanvasLayer);

  const layers = HISTORIC_LAYERS.map((layer) => {
    // const existLayer = activeLayers.find(
    //   (activeLayer) =>
    //     activeLayer.layerId === layer.id ||
    //     activeCanvasLayer?.layerId === layer.id
    // );

    return (
      <DraggableSidebarLayer
        // exist={false}
        // // exist={Boolean(existLayer)}
        key={layer.id}
        layer={layer}
      />
    );
  });

  return <div id="draggable-sidebar-list">{layers}</div>;
};

export default DraggableSidebarList;
