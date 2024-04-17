import { MapContainer } from "react-leaflet";

import { INIT_MAP_OPTIONS } from "../../../config/map";
import MainTileLayer from "./MainTileLayer";

const MainMap = () => {
  const { lat, lng, zoom, scrollWheelZoom, zoomControl, attributionControl } =
    INIT_MAP_OPTIONS;

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
    </MapContainer>
  );
};

export default MainMap;
