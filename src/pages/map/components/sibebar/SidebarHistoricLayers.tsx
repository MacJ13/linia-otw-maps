import { useDispatch, useSelector } from "react-redux";
import SidebarFeature from "./SidebarFeature";
import {
  selectOpenHistoricMaps,
  toggleFeatures,
} from "../../state/sidebarSlice";
import {
  Active,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  Over,
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
  removeActiveLayers,
  removeDraggingCanvasLayer,
  removeDraggingSidebarLayer,
  selectAllActiveLayers,
} from "../../state/historicLayerSlice";

import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableSidebarList, { SidebarLayer } from "./DraggableSidebarLayer";
import Canvas, { CanvasItem } from "./Canvas";
import { ActiveHistoricLayer } from "../../../../types/map";

// export const removeAtIndex = (array, index) => {
//   return [...array.slice(0, index), ...array.slice(index + 1)];
// };

// export const insertAtIndex = (array, index, item) => {
//   return [...array.slice(0, index), item, ...array.slice(index)];
// };

// export const arrayMove = (array, oldIndex, newIndex) => {
//   return dndKitArrayMove(array, oldIndex, newIndex);
// };

// const activePreindex = typeof activeData.index === "undefined";

function isUndefined(index: number | undefined) {
  return typeof index === "undefined";
}

// const activeIndex =
// activePreindex || activeData.index < 0
//   ? -1
//   : activeData.index;

function getIndex(index: number | undefined) {
  const indexExists = isUndefined(index);
  if (indexExists) return -1;

  if (typeof index === "number") {
    return index < 0 ? -1 : index;
  }
}

function getData(prop: Active | Over | null) {
  return prop?.data?.current ?? {};
}

// function createSpacer({ id }: { id: string }) {
//   return {
//     id,
//     type: "spacer",
//     historicLayerId: "",
//     title: "spacer",
//   };
// }

const SidebarHistoricLayers = () => {
  const openHistoricMaps = useSelector(selectOpenHistoricMaps);

  const dispatch = useDispatch();

  const activeLayers = useSelector(selectAllActiveLayers);

  const activeSidebarLayer = useSelector(getSidebarLayer);

  const activeCanvasLayer = useSelector(getCanvasLayer);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(
    mouseSensor,

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const activeLayersId = useSelector(selectActiveLayerIds);

  // const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
  //   Date.now()
  // );

  // const [layerInsterted, setLayerInserted] = useState<boolean>(false);

  // const spacerInsertedRef = useRef<boolean>(false);
  // const currentDragLayerRef = useRef<{
  //   id: string;
  //   type: string;
  //   name: string;
  //   parent: null;
  //   historicLayerId: string;
  // } | null>(null);

  return (
    <>
      <SidebarFeature
        btnName="Historyczne Mapy"
        active={openHistoricMaps}
        handleClick={() => {
          dispatch(toggleFeatures());
        }}
      >
        <DndContext
          sensors={sensors}
          autoScroll
          onDragStart={(e) => {
            const { active } = e;

            const activeData = getData(active);
            const { layer } = activeData;

            if (activeData.fromSidebar) {
              console.log("from Sidebar");

              dispatch(
                createSidebarLayer(
                  layer.id,
                  layer.name,
                  layer.layers,
                  layer.url,
                  layer.format
                )
              );
              return;
            }

            dispatch(createCanvasLayer(layer));

            // const { active } = e;
            // const activeData = getData(active);
            // if (activeData.fromSidebar) {
            //   const { layer } = activeData;
            //   const { type } = layer;
            //   setActiveSidebarLayer(layer);
            //   setLayerInserted(false);
            //   currentDragLayerRef.current = {
            //     id: active.id as string,
            //     type: type,
            //     name: `${type}${layers.length + 1}`,
            //     parent: null,
            //     historicLayerId: "",
            //   };
            //   // console.log(currentDragLayerRef.current);
            //   return;
            // }
            // const { layer, index } = activeData;
            // setActiveCanvasLayer(layer);
            // currentDragLayerRef.current = layer;
            // const copyLayers = layers.map((layer) => ({ ...layer }));
            // copyLayers.splice(
            //   index,
            //   1,
            //   createSpacer({ id: active.id as string })
            // );
            // setLayers(copyLayers);
            // const { active } = e;
            // console.log(active);
            // const activeData = getData(active);
            // // console.log(activeData);
            // if (activeData.fromSidebar) {
            //   const { layer } = activeData;
            //   const { type } = layer;
            //   setActiveSidebarLayer(layer);
            //   currentDragLayerRef.current = {
            //     id: active.id as string,
            //     type: type,
            //     name: `${type}${layers.length + 1}`,
            //     parent: null,
            //     historicLayerId: "",
            //   };
            //   // console.log(currentDragLayerRef.current);
            //   return;
            // }
            // const { layer, index } = activeData;
            // // const { id } = active;
            // setActiveCanvasLayer(layer);
            // currentDragLayerRef.current = layer;
            // const copyLayers = layers.map((layer) => ({ ...layer }));
            // copyLayers.splice(
            //   index,
            //   1,
            //   createSpacer({ id: active.id as string })
            // );
            // setLayers(copyLayers);
            // const { active } = e;
            // console.log(e);
            // const activeData = getData(active);
            // if (layers.length) {
            //   const layerIndex = layers.findIndex((layer) => {
            //     return layer.historicLayerId === activeData.layer.id;
            //   });
            //   // console.log(layerIndex);
            //   if (layerIndex >= 0) {
            //     return;
            //   }
            // }
            // if (activeData.fromSidebar) {
            //   console.log("from sidebar");
            //   // console.log("sdsdg");
            //   setActiveSidebarLayer({
            //     ...activeData.layer,
            //   });
            //   return;
            // } else if (activeData.sortable) {
            //   console.log("hello");
            //   setActiveCanvasLayer({
            //     ...activeData.layer,
            //   });
            // }
            // console.log();
            // console.log(e);
            // const { active } = e;
            // const { data, id } = active;
            // console.log(active);
            // const activeSidebar = data?.current?.fromSidebar;
            // if (activeSidebar) {
            //   setActiveSidebarLayer(id as string);
            //   currentDragFieldRef.current = {
            //     id: id as string,
            //     parent: null,
            //   };
            //   return;
            // }
            // const { index } = active;
            // setActiveCanvasLayer(id as string);
            // setFields((fields) => {
            //   // console.log(prev);
            //   const newFields = [...fields].splice(
            //     index,
            //     1,
            //     active.id + "-spacer"
            //   );
            //   return newFields;
            // });
          }}
          onDragOver={(e) => {
            console.log("_______________________");

            const { active, over } = e;

            const activeData = getData(active);
            const overData = getData(over);

            if (activeData.fromSidebar) {
              // console.log("from sidebar");

              // console.log(overData);

              if (overData.isContainer) {
                // console.log("inside container");
                // const { layer } = activeData;

                // if (!activeLayers.length) {
                //   // console.log("not length, empty list");

                //   // const { layer } = activeData;

                //   //////////////////////////////////////
                //   // 11111111111111
                //   /////////////////////////////////

                //   // console.log({ layer });
                //   dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));
                // } else {
                //   // console.log("length list");
                //   dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));
                // }

                dispatch(addLayer(activeSidebarLayer as ActiveHistoricLayer));

                return;
              }

              if (overData.sortable) {
                console.log("on layers list");
                // console.log({ active, over });
                const { index } = overData.sortable;

                dispatch(
                  changePositions({
                    overIndex: index,
                    // layer: activeData.layer,
                    // allLayers: activeLayers,
                  })
                );

                return;
              }

              if (!over) {
                // console.log("outside container");
                // console.log(activeData);
                // dispatch(removeDraggingLayer(active.id as string));
                dispatch(removeDraggingSidebarLayer());
                return;
              }

              return;
            } else {
              // console.log("active drag list element ");
              // console.log(over);
              // console.log(active);
              if (!over) {
                // const activePreindex = typeof activeData.index === "undefined";

                // const activePreindex = isUndefined(activeData.index);

                // const activeIndex =
                //   activePreindex || activeData.index < 0
                //     ? -1
                //     : activeData.index;
                const activeIndex = getIndex(activeData.index) as number;
                dispatch(removeDraggingCanvasLayer(activeIndex));
                return;
              }

              // const overPreindex = typeof overData.index === "undefined";
              // const activePreindex = typeof activeData.index === "undefined";
              // const overIndex =
              //   overPreindex || overData.index < 0 ? -1 : overData.index;

              // const activeIndex =
              //   activePreindex || activeData.index < 0 ? -1 : activeData.index;

              const overIndex = getIndex(overData.index) as number;
              const activeIndex = getIndex(activeData.index) as number;
              dispatch(
                insertDraggingCanvasLayer({
                  overIndex,
                  activeIndex,
                })
              );

              // if (over?.id === "canvas_droppable") {
              //   // console.log("on draggable canvas");

              //   return;
              // }
            }
            //   const { active, over } = e;
            //   const activeData = getData(active);
            //   // console.log({ active, over });

            //   if (activeData.fromSidebar) {
            //     console.log("from sidebar");
            //     const overData = getData(over);
            //     // console.log({ activeData });

            //     // console.log({ spacerInsertedRef });

            //     // if (overData.isContainer) {
            //     //   setLayerInserted(false);
            //     // }
            //     // console.log(overData.isContainer);
            //     // if (!spacerInsertedRef.current) {
            //     if (!layerInsterted) {
            //       console.log("in spacer inserted element");
            //       const spacer = createSpacer({
            //         id: active.id + "spacer",
            //       });

            //       // console.log(overData.sortable);

            //       if (!layers.length) {
            //         // setLayers([...layers, spacer]);

            //         const copyLayers = layers.map((layer) => ({ ...layer }));

            //         copyLayers.push(spacer);
            //         setLayers([...copyLayers]);
            //         // console.log("hello not length");
            //       } else {
            //         // console.log("hello length");
            //         const nextIndex =
            //           overData.index > -1 ? overData.index : layers.length;

            //         const copyLayers = layers.map((layer) => ({ ...layer }));

            //         copyLayers.splice(nextIndex, 0, spacer);

            //         console.log(copyLayers);
            //         setLayers(copyLayers);
            //       }

            //       setLayerInserted(true);
            //     } else if (!over) {
            //       console.log("over the canvas");
            //       setLayers(layers.filter((layer) => layer.type !== "spacer"));

            //       // spacerInsertedRef.current = false;
            //       setLayerInserted(false);
            //     } else {
            //       console.log("else (on sortable list)");

            //       const spacerIndex = layers.findIndex(
            //         (layer) => layer.id === active.id + "spacer"
            //       );

            //       const nextIndex =
            //         overData.index > -1 ? overData.index : layers.length - 1;

            //       // console.log(spacerIndex, nextIndex);

            //       if (nextIndex === spacerIndex) {
            //         return;
            //       }

            //       setLayers(arrayMove(layers, spacerIndex, overData.index));
            //     }
            //   }
            // console.log({ insert: spacerInsertedRef.current });
            // if (activeData.fromSidebar) {
            //   const overData = getData(over);
            //   if (!spacerInsertedRef.current) {
            //     const spacer = createSpacer({
            //       id: active.id + "spacer",
            //     });
            //     if (!layers.length) {
            //       setLayers([...layers, spacer]);
            //     } else {
            //       const nextIndex =
            //         overData.index > -1 ? overData.index : layers.length;
            //       const copyLayers = layers.map((layer) => ({ ...layer }));
            //       copyLayers.splice(nextIndex, 1, spacer);
            //       setLayers(copyLayers);
            //     }
            //     spacerInsertedRef.current = true;
            //   } else if (!over) {
            //     setLayers(layers.filter((layer) => layer.type !== "spacer"));
            //     spacerInsertedRef.current = false;
            //   } else {
            //     const spacerIndex = layers.findIndex(
            //       (layer) => layer.id === active.id + "-spacer"
            //     );
            //     const nextIndex =
            //       overData.index > -1 ? overData.index : layers.length - 1;
            //     if (nextIndex === spacerIndex) {
            //       return;
            //     }
            //     setLayers(arrayMove(layers, spacerIndex, overData.index));
            //   }
            // }
            // const { active, over } = e;
            // // console.log({ active, over });
            // const activeData = getData(active);
            // if (layers.length) {
            //   const layerIndex = layers.findIndex((layer) => {
            //     return layer.historicLayerId === activeData.layer.id;
            //   });
            //   // console.log(layerIndex);
            //   if (layerIndex >= 0) {
            //     return;
            //   }
            // }
            // // console.log(getData(active));
            // if (!over) {
            //   // console.log(getData(active), getData(over));
            //   setLayers(
            //     layers.filter(
            //       (layer) => layer.historicLayerId !== activeSidebarLayer?.id
            //     )
            //   );
            //   return;
            // } else {
            //   const active_index = layers.findIndex((layer) => {
            //     const id =
            //       //= activeSidebarLayer
            //       //   ? layer.historicLayerId
            //       //   :
            //       layer.id;
            //     return id === active.id;
            //   });
            //   const over_index = layers.findIndex(
            //     (layer) => layer.id === over.id
            //   );
            //   console.log(active_index, over_index);
            //   console.log(getData(active), getData(over));
            //   if (active_index !== -1 && over_index !== -1) {
            //     if (active_index === over_index) return;
            //     setLayers(arrayMove(layers, active_index, over_index));
            //     return;
            //   } else if (over.id === "canvas_droppable") {
            //     if (!layers.length) {
            //       setLayers([...layers, activeData.layer]);
            //     } else {
            //       if (
            //         layers.findIndex((layer) => layer.id === active.id) === -1
            //       ) {
            //         setLayers([...layers, activeData.layer]);
            //       }
            //     }
            // const copyLayers = layers.map((layer) => ({ ...layer }));
            // console.log(activeData);
            // copyLayers.push({
            //   id: nanoid() as string,
            //   historicLayerId: active.id as string,
            //   title: activeData.layer.title,
            //   type: "layer",
            // });
            // setLayers(copyLayers);
            // return;
            // }}
            // }
            // const { active, over } = e;
            // const activeData = getData(active);
            // console.log({ active, over });
            // if (activeData.fromSidebar) {
            //   const overData = getData(over);
            //   console.log(overData);
            //   if (!spacerInsertedRef.current) {
            //     const spacer = active.id + "-spacer";
            //     if (!fields.length) {
            //       setFields([...fields, spacer]);
            //     } else {
            //       const nextIndex =
            //         overData.index > -1 ? overData.index : fields.length;
            //       const copyFields = [...fields].splice(nextIndex, 0, spacer);
            //       setFields(copyFields);
            //       spacerInsertedRef.current = true;
            //     }
            //   } else if (!over) {
            //     const copyFields = [...fields].filter((f) =>
            //       f.includes("spacer")
            //     );
            //     setFields(copyFields);
            //     spacerInsertedRef.current = false;
            //   } else {
            //     const spacerIndex = fields.findIndex((f) =>
            //       f.includes("spacer")
            //     );
            //     console.log(spacerIndex);
            //     const nextIndex =
            //       overData.index > -1 ? overData.index : fields.length - 1;
            //     if (nextIndex === spacerIndex) return;
            //     setFields((fields) => {
            //       return arrayMove(
            //         fields,
            //         spacerIndex,
            //         overData.index
            //       ) as string[];
            //     });
            //   }
          }}
          onDragEnd={(e) => {
            console.log("-----------------------------------");
            console.log("DRAG END");

            const activeData = getData(e.active);

            dispatch(removeActiveLayers());
            if (!e.over) {
              return;
            }

            if (activeData.fromSidebar) {
              dispatch(changeType(activeSidebarLayer?.id as string));
            } else {
              dispatch(changeCanvasType(activeCanvasLayer?.id as string));
            }
          }}
        >
          {/* 1. step */}
          {/* <div
            // key={sidebarFieldsRegenKey}
            // className="drag-sidebar"
            id="dragsidebar"
          >
            <DraggableSidebarList />
          </div> */}
          <DraggableSidebarList />
          {/* 2. step */}
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={activeLayers.map((layer) => layer.id as string | number)}
          >
            <Canvas
              layers={activeLayers as ActiveHistoricLayer[]}
              dragging={
                Boolean(activeSidebarLayer) || Boolean(activeCanvasLayer)
              }
            />
          </SortableContext>
          {/* 3. step */}
          <DragOverlay dropAnimation={null}>
            {/* {activeSidebarLayer ? (
              <SidebarLayer layer={activeSidebarLayer} overlay />
            ) : null} */}
            {/* {activeCanvasLayer ? (
              <CanvasItem layer={activeCanvasLayer} overlay />
            ) : null} */}
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
        </DndContext>
        {/* <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={(event) => {
            const { over, active } = event;

            console.log(event);
            console.log({ over, active });
            if (!over) return;
          }}
          onDragStart={(event) => {
            dispatch(changeActiveId(event.active.id.toString()));

            const draggingLayer = HISTORIC_LAYERS.find(
              (layer) => historicId === layer.id
            );

            if (draggingLayer) return;

            dispatch(changeActiveId(event.active.id.toString()));
            setActiveId(event.active.id);
          }}
          onDragEnd={(event) => {
            dispatch(changeActiveId(""));

            setActiveId(null);
            const { over, active } = event;

            if (!over) {
              console.log("not active");
              return;
            }
          }}
        >
          <DragLayer />

          <SortableContext
            id="map-draggabe"
            items={HISTORIC_LAYERS}
            strategy={verticalListSortingStrategy}
          >
            {HISTORIC_LAYERS.map((layer) => {
              return <HistLayerItem key={layer.name} layer={layer} />;
            })}
          </SortableContext>
          <HistoricLayerList />
        </DndContext>  */}
      </SidebarFeature>
    </>
  );
};

export default SidebarHistoricLayers;
