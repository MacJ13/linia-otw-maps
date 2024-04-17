import "leaflet/dist/leaflet.css";
import style from "./Map.module.scss";
// import Sidebar from "./sidebar/Sidebar";
import { Provider } from "react-redux";
import { store } from "./state/store";
import Sidebar from "./components/sibebar";
import MainMap from "./leaflet/MainMap";

// const Container = () => {
//   console.log("map");

//   const { lat, lng, zoom, scrollWheelZoom, zoomControl, attributionControl } =
//     INIT_MAP_OPTIONS;

//   const tileLayerUrl = useSelector(selectTileLayer);
//   {

//   }

//   return (
//     <div className={style.main}>
//       <div className={style.map}>
//         <MainMap />
//         <Sidebar />
//       </div>
//     </div>
//   );
// };

/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */

const Map = () => {
  return (
    <Provider store={store}>
      {/* <Container /> */}
      <div className={style.main}>
        <div className={style.map}>
          <MainMap />
          <Sidebar />
        </div>
      </div>
    </Provider>
  );
};

export default Map;
