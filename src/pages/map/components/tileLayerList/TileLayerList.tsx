import style from "./TileLayerList.module.scss";

import { useDispatch } from "react-redux";

import { TILE_LAYERS } from "../../../../config/map";
import { changeTileLayer } from "../../state/sidebarSlice";

const TileLayerList = () => {
  const dispatch = useDispatch();

  const changeMainMap = (url: string) => {
    dispatch(changeTileLayer(url));
  };

  return (
    <div className={style.list}>
      {TILE_LAYERS.map(
        (tile: { name: string; url: string; previewUrl: string }) => {
          return (
            <button
              key={tile?.name}
              className={style.item}
              onClick={() => {
                changeMainMap(tile.url);
              }}
            >
              <img src={tile?.previewUrl} alt={`preview ${tile?.name}`} />
            </button>
          );
        }
      )}
    </div>
  );
};

export default TileLayerList;
