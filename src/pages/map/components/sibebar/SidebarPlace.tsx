import { useDispatch, useSelector } from "react-redux";
import SidebarFeature from "./SidebarFeature";
import { selectOpenPlaces, toggleFeatures } from "../../state/sidebarSlice";

const SidebarPlace = () => {
  const openPlaces = useSelector(selectOpenPlaces);

  const dispatch = useDispatch();

  return (
    <>
      <SidebarFeature
        btnName="Miejsca"
        active={openPlaces}
        handleClick={() => {
          dispatch(toggleFeatures());
        }}
      >
        Some default text. Later it's going to add some features.
      </SidebarFeature>
    </>
  );
};

export default SidebarPlace;
