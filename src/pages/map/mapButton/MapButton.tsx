import style from "./MapButton.module.scss";

type MapButtonProps = {
  name: string;
  handleClick: () => void;
};

const MapButton = ({ name, handleClick }: MapButtonProps) => {
  return (
    <button className={`link ${style.link}`} onClick={handleClick}>
      {name}
    </button>
  );
};

export default MapButton;
