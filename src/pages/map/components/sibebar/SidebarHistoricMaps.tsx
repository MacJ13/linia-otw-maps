import { useDispatch, useSelector } from "react-redux";
import FragmentMapItem from "../fragmentMapItem/FragmentMapItem";
import SidebarFeature from "./SidebarFeature";
import {
  selectOpenHistoricMaps,
  toggleFeatures,
} from "../../state/sidebarSlice";

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
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #2" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
        <FragmentMapItem title="Map title #1" />
      </SidebarFeature>
    </>
  );
};

export default SidebarHistoricLayers;
