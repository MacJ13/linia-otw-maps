import { useSelector } from "react-redux";
import { selectAllActiveLayers } from "../state/historicLayerSlice";
import { WMSTileLayer } from "react-leaflet";

const HistoricLayers = () => {
  const activeLayers = useSelector(selectAllActiveLayers);

  const wmsLayers = activeLayers.map((layer, index) => {
    if (layer.type === "spacer") return null;

    return (
      <WMSTileLayer
        key={layer.id}
        layers={layer.layers}
        url={layer.url}
        format={layer.format}
        transparent={layer.transparent}
        opacity={layer.opacity}
        zIndex={100 - index * 5}
      />
    );
  });

  return <>{wmsLayers}</>;
};

export default HistoricLayers;
