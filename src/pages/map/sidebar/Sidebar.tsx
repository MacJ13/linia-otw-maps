import { useState } from "react";
import style from "./Sidebar.module.scss";
import FragmentMapItem from "../fragmentMapItem/FragmentMapItem";

const Sidebar = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  return (
    <div className={style.sidebar}>
      <div className={style.features}>
        <div
          id={style.places}
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
          {activeFeature === 0 && (
            <div className={style.overflow}>
              <div className={style.content}>
                some default text when we click on button link
              </div>
            </div>
          )}
        </div>
        <div
          id={style.fragments}
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
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #2" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
              <FragmentMapItem title="Map title #1" />
            </div>
          )}
        </div>
        <div className={style.feature}>
          <button className={`link ${style.link}`}>Warstwa mapy</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
