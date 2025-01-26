import OrnamentSvg from "../../../assets/svg/swidermajer4.svg?react";
// import SingleCurvedSvg from "../../../assets/svg/singlecurved1.svg?react";

import { Link } from "react-router-dom";
import style from "./ProjectInfo.module.scss";

const ProjectInfo = () => {
  return (
    <div className={style.content}>
      <div className={style.box}>
        <div className={style.ornament__side}>
          <OrnamentSvg />
        </div>

        <div className={style.info}>
          <h3 className={style.h3}>Za pomocą interaktywnej mapy można :</h3>
          <div className={style.wrap}>
            <ul className={style.ul}>
              <li className={style.li}>
                podejrzeć i przeglądać lokalizacje dawnych miejsc
              </li>
              <li className={style.li}>
                przeczytać informację na temat danego miejsca
              </li>
              <li className={style.li}>
                dodawać historyczne warstwy map na główną mapę
              </li>
              <li className={style.li}>
                konfigurować transparentność dodanych map
              </li>
              <li className={style.li}>
                filtrować lokalizacje w zależności od typu czy regionu
              </li>
            </ul>
            <Link to="/map" className="link">
              Przejdź do mapy
            </Link>
          </div>
        </div>

        <div className={style.ornament__side}>
          <OrnamentSvg />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
