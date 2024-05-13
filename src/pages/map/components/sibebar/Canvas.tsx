import { useDroppable } from "@dnd-kit/core";
import style from "./Canvas.module.scss";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
  CanvasItemProps,
  CanvasProps,
  SortableItemProps,
} from "../../../../types/map";

export const CanvasItem = ({ layer, overlay }: CanvasItemProps) => {
  let cls = style.item;

  const { name } = layer;

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

  return (
    <>
      <div className={cls}>{name}</div>
    </>
  );
};

const SortableItem = (props: SortableItemProps) => {
  const { id, index, layer } = props;

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
    <div ref={setNodeRef} style={styleSort} {...attributes} {...listeners}>
      <CanvasItem layer={layer} />
    </div>
  );
};

const Canvas = ({ layers, dragging }: CanvasProps) => {
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
      {layers.map((layer, i) => {
        return (
          <SortableItem
            key={layer.id}
            id={layer.id as string}
            layer={layer}
            index={i}
          />
        );
      })}
    </div>
  );
};

export default Canvas;
