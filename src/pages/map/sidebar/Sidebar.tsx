import style from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.features}>
        <div
          id="places"
          className={`${style.feature} ${style.active__feature}`}
        >
          <button className={`link ${style.link}`}>Miejsca</button>
          <div className={style.content}></div>
        </div>
        <div className={style.feature}>
          <button className={`link ${style.link}`}>Historyczne mapy</button>
          {/* <div className={style.content}></div> */}
        </div>

        <button className={`link ${style.link}`}>Warstwa mapy</button>
      </div>
    </div>
  );
};

export default Sidebar;
