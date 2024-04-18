import { useDispatch } from "react-redux";
// import { FragmentMapItemProps } from "../../../../types/map";
import style from "./FragmentMapItem.module.scss";
import { addLayer } from "../../state/historicLayerSlice";

type FragmentMapItemProps = {
  layer: {
    name: string;
    layers: string;
    url: string;
    format: string;
  };
};

const FragmentMapItem = ({ layer }: FragmentMapItemProps) => {
  const dispatch = useDispatch();

  const { name, layers, url, format } = layer;

  return (
    <button
      key={layer.layers}
      onClick={() => {
        dispatch(addLayer(name, layers, url, format));
      }}
      className={style.fragmentMap}
    >
      <div className={style.photo}>{/* <img src={src} alt={title} /> */}</div>
      <h4 className={style.title}>{name}</h4>
    </button>
  );
};

export default FragmentMapItem;
