import style from "./Map.module.scss";
import Sidebar from "./sidebar/Sidebar";

const Map = () => {
  return (
    <div className={style.main}>
      <Sidebar />
      {/* <div className={style.config}>
        <div className={style.feature}>
          <div className={style.config__item}>
            <h3 className={style.h3}>Historyczne Mapy</h3>
            <div className={style.list}>
              <div className={style.hist_map}>
                <div className={style.fragment}></div>
                <h4 className={style.h4}>Map title #1</h4>
              </div>
              <div className={style.hist_map}>
                <div className={style.fragment}></div>
                <h4 className={style.h4}>Map title #2</h4>
              </div>
              <div className={style.hist_map}>
                <div className={style.fragment}></div>
                <h4 className={style.h4}>Map title #2</h4>
              </div>
            </div>
          </div>
          <div className={style.config__item}>
            <h3 className={style.h3}>Miejsce</h3>
          </div>
          <div className={style.config__item}>
            <h3 className={style.h3}>Warstwy Mapy</h3>
          </div>
        </div>
      </div> */}
      <div className={style.map}></div>
    </div>
  );
};

export default Map;
