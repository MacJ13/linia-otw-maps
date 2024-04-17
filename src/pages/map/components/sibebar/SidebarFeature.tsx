import { SidebarFeatureProps } from "../../../../types/map";
import MapButton from "../button/MapButton";
import style from "./SidebarFeature.module.scss";

const SidebarFeature = ({
  active,
  btnName,
  children,
  handleClick,
}: SidebarFeatureProps) => {
  return (
    <div className={active ? `${style.item} ${style.active}` : style.item}>
      <MapButton name={btnName} handleClick={handleClick} />
      {active && (
        <div className={style.overflow}>
          <div className={style.content}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default SidebarFeature;
