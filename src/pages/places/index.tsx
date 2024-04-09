import style from "./Places.module.scss";
import SinglePlace from "./singlePlace/SinglePlace";
import OrnamentSvg from "../../assets/svg/swidermajer3.svg?react";

const Places = () => {
  return (
    <div>
      <div className={style.intro}>
        <h1 className="h1">Wyróżnione Miejsca</h1>
        <div className={style.ornament}>
          <OrnamentSvg />
        </div>
      </div>

      <div className={style.content}>
        <SinglePlace reverse={false} />
        <SinglePlace reverse={true} />
        <SinglePlace reverse={false} />
      </div>
    </div>
  );
};

export default Places;
