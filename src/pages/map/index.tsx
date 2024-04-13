import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "./Map.module.scss";
import Sidebar from "./sidebar/Sidebar";

const Map = () => {
  return (
    <div className={style.main}>
      <div className={style.map}>
        <MapContainer
          id={style.map}
          center={[52.161944, 21.211111]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
        <Sidebar />
      </div>
    </div>
  );
};

export default Map;
