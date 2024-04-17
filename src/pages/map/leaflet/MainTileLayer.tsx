import { TileLayer } from "react-leaflet";
import { selectTileLayer } from "../state/sidebarSlice";
import { useSelector } from "react-redux";

const MainTileLayer = () => {
  const tileLayerUrl = useSelector(selectTileLayer);

  return <TileLayer url={tileLayerUrl} />;
};

export default MainTileLayer;
