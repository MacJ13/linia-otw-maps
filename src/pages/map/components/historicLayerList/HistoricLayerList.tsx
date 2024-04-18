import { useDispatch, useSelector } from "react-redux";
import style from "./HistoricLayerList.module.scss";
import {
  removeLayer,
  selectAllActiveLayers,
} from "../../state/historicLayerSlice";

const HistoricLayerList = () => {
  const layers = useSelector(selectAllActiveLayers);

  const dispatch = useDispatch();

  console.log(layers);
  return (
    <div className={style.ul}>
      {layers.map((layer) => {
        return (
          <div className={style.item} key={layer.id}>
            <div className={style.photo}></div>
            <div className={style.content}>
              <h3 className={style.h3}>{layer.name.slice(0, 12)}</h3>
              <button
                onClick={() => {
                  dispatch(removeLayer(layer.id));
                }}
                className={style.btn}
              >
                &#120;
              </button>
            </div>
          </div>
        );
      })}
      <p>Add maps here</p>
    </div>
  );
};

export default HistoricLayerList;
