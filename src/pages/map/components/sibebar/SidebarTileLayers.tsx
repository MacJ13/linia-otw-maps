import { useDispatch, useSelector } from "react-redux";
import SidebarFeature from "./SidebarFeature";
import { selectOpenLayerList, toggleLayerList } from "../../state/sidebarSlice";
import LayerList from "../layerList/LayerList";

const SidebarTileLayers = () => {
  const openLayerList = useSelector(selectOpenLayerList);
  const dispatch = useDispatch();
  return (
    <>
      <SidebarFeature
        active={false}
        btnName="Warstwa Mapy"
        handleClick={() => {
          dispatch(toggleLayerList());
        }}
      />
      {openLayerList && <LayerList />}
    </>
  );
};

export default SidebarTileLayers;
