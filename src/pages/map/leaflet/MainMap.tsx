import {
  MapContainer,
  // WMSTileLayer
} from "react-leaflet";

import { INIT_MAP_OPTIONS } from "../../../config/map";
import MainTileLayer from "./MainTileLayer";
import HistoricLayers from "./HistoricLayers";
// import { useSelector } from "react-redux";
// import { selectAllActiveLayers } from "../state/historicLayerSlice";

const MainMap = () => {
  const { lat, lng, zoom, scrollWheelZoom, zoomControl, attributionControl } =
    INIT_MAP_OPTIONS;

  // const historicLayers = useSelector(selectAllActiveLayers);

  // console.log(historicLayers);

  // const layers = historicLayers.map((layer, index) => {
  //   if (layer.type === "spacer") return null;

  //   return (
  //     <WMSTileLayer
  //       key={layer.id}
  //       layers={layer.layers}
  //       url={layer.url}
  //       format={layer.format}
  //       transparent={layer.transparent}
  //       opacity={layer.opacity}
  //       zIndex={100 - index}
  //     />
  //   );
  // });

  // console.log(layers);
  return (
    <MapContainer
      id="map"
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      zoomControl={zoomControl}
      attributionControl={attributionControl}
    >
      <MainTileLayer />
      {/* {layers.map((layer) => { */}
      {/* {layers} */}
      <HistoricLayers />
    </MapContainer>
  );
};

export default MainMap;
