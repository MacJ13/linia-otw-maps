import { useDispatch, useSelector } from "react-redux";
import FragmentMapItem from "../fragmentMapItem/FragmentMapItem";
import SidebarFeature from "./SidebarFeature";
import {
  selectOpenHistoricMaps,
  toggleFeatures,
} from "../../state/sidebarSlice";
import HistoricLayerList from "../historicLayerList/HistoricLayerList";
import { HISTORIC_LAYERS } from "../../../../config/map";

const SidebarHistoricLayers = () => {
  const openHistoricMaps = useSelector(selectOpenHistoricMaps);

  const dispatch = useDispatch();

  return (
    <>
      <SidebarFeature
        btnName="Historyczne Mapy"
        active={openHistoricMaps}
        handleClick={() => {
          dispatch(toggleFeatures());
        }}
      >
        {HISTORIC_LAYERS.map((layer) => {
          return <FragmentMapItem layer={layer} />;
        })}
      </SidebarFeature>
      <HistoricLayerList />
    </>
  );
};

export default SidebarHistoricLayers;
