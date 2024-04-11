import style from "./OrnamentLayer.module.scss";
import OrnamentSvg from "../../../assets/svg/swidermajer1.svg?react";

type OrnamentLayerProps = {
  transform: boolean;
};

const OrnamentLayer = ({ transform }: OrnamentLayerProps) => {
  return (
    <div className={transform ? style.ornament__bottom : style.ornament__top}>
      <OrnamentSvg />
    </div>
  );
};

export default OrnamentLayer;
