import { useDispatch, useSelector } from "react-redux";
import SidebarFeature from "./SidebarFeature";
import {
  selectOpenHistoricMaps,
  toggleFeatures,
} from "../../state/sidebarSlice";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  addLayer,
  changeCanvasType,
  changePositions,
  changeType,
  createCanvasLayer,
  createSidebarLayer,
  getCanvasLayer,
  getSidebarLayer,
  insertDraggingCanvasLayer,
  moveToLastPosition,
  removeActiveLayers,
  removeDraggingCanvasLayer,
  removeDraggingSidebarLayer,
  selectAllActiveLayers,
  selectTotalActiveLayers,
} from "../../state/historicLayerSlice";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableSidebarList, { SidebarLayer } from "./DraggableSidebarLayer";
import Canvas, { CanvasItem } from "./Canvas";
import { ActiveHistoricLayer } from "../../../../types/map";
import { getIndex } from "../../../../utils/getIndex";
import { getData } from "../../../../utils/getData";

import { selectActiveLayerIds } from "../../state/historicLayerSlice";

// export const removeAtIndex = (array, index) => {
//   return [...array.slice(0, index), ...array.slice(index + 1)];
// };

// export const insertAtIndex = (array, index, item) => {
//   return [...array.slice(0, index), item, ...array.slice(index)];
// };

// export const arrayMove = (array, oldIndex, newIndex) => {
//   return dndKitArrayMove(array, oldIndex, newIndex);
// };

const SidebarHistoricLayers = () => {
  const dispatch = useDispatch();
  const openHistoricMaps = useSelector(selectOpenHistoricMaps);

  // const activeLayers = useSelector(selectAllActiveLayers);

  const activeIds = useSelector(selectActiveLayerIds);

  const activeSidebarLayer = useSelector(getSidebarLayer);

  const activeCanvasLayer = useSelector(getCanvasLayer);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      // distance: 10,
      distance: 2,
    },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = useSensors(mouseSensor, keyboardSensor);

  const isDragging = Boolean(activeSidebarLayer) || Boolean(activeCanvasLayer);

  const totalLayers = useSelector(selectTotalActiveLayers);

  // console.log({ totalLayers });
  const canvasLayers = useSelector(selectAllActiveLayers);

  console.log("start:", canvasLayers);
  // console.log("start (pervious):", activeLayers);

  return (
    <>
      <DndContext
        sensors={sensors}
        autoScroll
        onDragStart={(e) => {
          const { active } = e;

          const activeData = getData(active);
          const { layer } = activeData;

          // console.log(layer.activeId);

          if (activeData.fromSidebar) {
            //   const activeLayer = activeLayers.find(
            //     (l) => l.layerId === layer.id
            //   );
            //   if (activeLayer) return;

            dispatch(
              createSidebarLayer(
                layer.id,
                layer.activeId,
                layer.name,
                layer.layers,
                layer.url,
                layer.format
              )
            );
            return;
          }

          dispatch(createCanvasLayer(layer));
        }}
        onDragOver={(e) => {
          const { active, over } = e;

          const activeData = getData(active);
          const overData = getData(over);

          if (activeData.fromSidebar) {
            if (overData.isContainer) {
              //   //////////////////////////////////////
              //   // 11111111111111
              //   /////////////////////////////////

              //   // console.log({ layer });
              //   dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));
              // } else {
              //   // console.log("length list");
              //   dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));
              // }

              // const { layer } = activeData;
              // const activeLayer = activeLayers.find(
              //   (l) => l.layerId === layer.id
              // );
              // if (activeLayer) return;

              if (!totalLayers) {
                dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));
              } else {
                // console.log("DRAG over on container ");
                // console.log({ activeData, overData });

                const { layer } = activeData;

                dispatch(moveToLastPosition(layer.activeId));
              }

              return;
            }

            if (overData.sortable) {
              const { index } = overData.sortable;

              dispatch(
                changePositions({
                  overIndex: index,
                })
              );
              return;
            }

            // if (!over) {
            //   // console.log("outside container");

            //   dispatch(removeDraggingSidebarLayer());
            //   return;
            // }
          } else {
            const activeIndex = getIndex(activeData.index) as number;
            const overIndex = getIndex(overData.index) as number;

            if (overData.isContainer) {
              dispatch(moveToLastPosition(activeIndex));
              return;
            }

            dispatch(
              insertDraggingCanvasLayer({
                overIndex,
                activeIndex,
              })
            );
          }
        }}
        onDragEnd={(e) => {
          // console.log("-----------------------------------");
          // console.log("DRAG END");

          const activeData = getData(e.active);

          const activeIndex = getIndex(activeData.index) as number;

          if (!e.over) {
            if (activeData.fromSidebar) dispatch(removeDraggingSidebarLayer());
            else dispatch(removeDraggingCanvasLayer(activeIndex));
          } else {
            if (activeData.fromSidebar)
              dispatch(changeType(activeSidebarLayer?.id as string));
            else dispatch(changeCanvasType(activeCanvasLayer?.id as string));
          }

          dispatch(removeActiveLayers());

          // if (activeData.fromSidebar) {
          //   if (!e.over) {
          //     dispatch(removeDraggingSidebarLayer());

          //     return;
          //   }
          //   dispatch(removeActiveLayers());
          //   dispatch(changeType(activeSidebarLayer?.id as string));
          // } else {
          //   if (!e.over) {
          //     // const activeIndex = getIndex(activeData.index) as number;
          //     dispatch(removeDraggingCanvasLayer(activeIndex));
          //     return;
          //   }
          //   dispatch(removeActiveLayers());
          //   dispatch(changeCanvasType(activeCanvasLayer?.id as string));
          // }
        }}
      >
        <SidebarFeature
          btnName="Historyczne Mapy"
          active={openHistoricMaps}
          handleClick={() => {
            dispatch(toggleFeatures());
          }}
        >
          {/* 1. step */}
          <DraggableSidebarList />
          {/* 2. step */}

          {/* 3. step */}
        </SidebarFeature>
        <SortableContext
          strategy={verticalListSortingStrategy}
          // items={activeLayers.map((layer) => layer.id as string | number)}
          items={activeIds}
        >
          <DragOverlay dropAnimation={null}>
            {activeSidebarLayer && (
              <SidebarLayer layer={activeSidebarLayer} overlay />
            )}
            {activeCanvasLayer && (
              <CanvasItem
                layer={activeCanvasLayer as ActiveHistoricLayer}
                overlay
              />
            )}
          </DragOverlay>
          <Canvas
            // layers={activeLayers as ActiveHistoricLayer[]}
            ids={activeIds}
            dragging={isDragging}
          />
        </SortableContext>
      </DndContext>
    </>
  );
};

export default SidebarHistoricLayers;
