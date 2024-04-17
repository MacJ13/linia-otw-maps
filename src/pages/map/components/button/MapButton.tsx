import { MapButtonProps } from "../../../types/map";
import style from "./MapButton.module.scss";

const MapButton = ({ name, handleClick }: MapButtonProps) => {
  return (
    <button className={`link ${style.link}`} onClick={handleClick}>
      {name}
    </button>
  );
};

export default MapButton;
