import style from "./SplitPane.module.scss";

type SplitPane = {
  left: React.ReactNode;
  right: React.ReactNode;
};

const SplitPane = ({ left, right }: SplitPane) => {
  return (
    <div className={style.pane}>
      <div className={style.pane__left}>{left}</div>
      <div className={style.pane__right}>{right}</div>
    </div>
  );
};

export default SplitPane;
