import { useDroppable } from "@dnd-kit/core";
import style from "./Canvas.module.scss";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
  CanvasItemProps,
  CanvasProps,
  SortableItemProps,
} from "../../../../types/map";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  changeLayerOpacity,
  removeLayer,
  selectActiveLayerById,
} from "../../state/historicLayerSlice";

export const CanvasItem = ({
  attributes,
  listeners,
  layer,
  overlay,
}: CanvasItemProps) => {
  const dispatch = useDispatch();

  let cls = style.item;

  const { name, id, opacity } = layer;

  if (overlay) {
    cls += " " + style.overlay;
  }

  // if (layer) {
  //   cls += layer.type === "spacer" ? style.opacity : "";
  // }
  // console.log(layer);

  // return (
  //   <>
  //     {layer?.type == "spacer" ? (
  //       <div className={style.spacer}>{layer?.id}</div>
  //     ) : (
  //       <div className={cls}>{layer?.name}</div>
  //     )}
  //   </>
  // );

  // const handleClick = (id: string) => {

  // };

  return (
    <>
      <div className={cls}>
        <button {...attributes} {...listeners} className={style.btnDrag}>
          &nbsp;
        </button>
        <div className={style.box}>
          <div className={style.content}>
            <h4>{name}</h4>
            <button
              onClick={() => {
                dispatch(removeLayer(id));
              }}
              className={style.close}
            >
              &#10006;
            </button>
          </div>
          <div className={style.range}>
            <input
              type="range"
              value={opacity * 100}
              onChange={(e) => {
                const opacity = Number(e.target.value) / 100;

                dispatch(changeLayerOpacity({ opacity, id }));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const SortableItem = (props: SortableItemProps) => {
  const { id, index, layerId } = props;

  // const updatingTask = useSelector((state: RootState) => {
  //   return selectTaskById(state, taskId)!;
  // });

  const layer = useSelector((state: RootState) => {
    return selectActiveLayerById(state, layerId);
  });

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      index,
      id,
      layer,
    },
  });

  const styleSort = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || layer?.type === "spacer" ? 0.5 : 1,
  };

  return (
    <div className={style.sort} ref={setNodeRef} style={styleSort}>
      <CanvasItem attributes={attributes} listeners={listeners} layer={layer} />
    </div>
  );
};

const Canvas = ({ ids, dragging }: CanvasProps) => {
  const { setNodeRef } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  let cls = style.canvas;

  if (dragging) {
    cls += " " + style.dragging;
  }

  return (
    <div ref={setNodeRef} className={cls}>
      {/* {layers.map((layer, i) => {
        return (
          <SortableItem
            key={layer.id}
            id={layer.id as string}
            layer={layer}
            index={i}
          />
        );
      })} */}
      {ids.map((id, i) => {
        return <SortableItem key={id} id={id} layerId={id} index={i} />;
      })}
    </div>
  );
};

export default Canvas;
