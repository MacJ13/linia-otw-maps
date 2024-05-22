import style from "./TileLayerList.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { TILE_LAYERS } from "../../../../config/map";
import { changeTileLayer, selectTileLayer } from "../../state/sidebarSlice";

const TileLayerList = () => {
  const dispatch = useDispatch();

  const changeMainMap = (url: string) => {
    dispatch(changeTileLayer(url));
  };

  const activeTileLayer = useSelector(selectTileLayer);

  return (
    <div className={style.list}>
      {TILE_LAYERS.map(
        (tile: { name: string; url: string; previewUrl: string }) => {
          const cls =
            style.item +
            " " +
            `${activeTileLayer === tile.url ? style.active : ""}`;

          return (
            <button
              key={tile?.name}
              className={cls}
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
