import { useState } from "react";
import style from "./Sidebar.module.scss";

const Sidebar = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  //   const onButtonClick = (activeNumber: number) => {
  //     setActiveFeature(activeNumber);
  //   };

  return (
    <div className={style.sidebar}>
      <div className={style.features}>
        <div
          id="places"
          className={
            activeFeature === 0
              ? `${style.feature} ${style.active__feature}`
              : style.feature
          }
        >
          <button
            onClick={() => {
              setActiveFeature(0);
            }}
            className={`link ${style.link}`}
          >
            Miejsca
          </button>
          {activeFeature === 0 && <div className={style.content}></div>}
        </div>
        <div
          className={
            activeFeature === 1
              ? `${style.feature} ${style.active__feature}`
              : style.feature
          }
        >
          <button
            onClick={() => {
              setActiveFeature(1);
            }}
            className={`link ${style.link}`}
          >
            Historyczne mapy
          </button>
          {/* <div className={style.content}></div> */}
          {activeFeature === 1 && (
            <div className={style.content}>
              sdgsdg sdghsdhsdh sdghsdhsdhsd hasdgsdg
            </div>
          )}
        </div>

        <button className={`link ${style.link}`}>Warstwa mapy</button>
      </div>
    </div>
  );
};

export default Sidebar;
