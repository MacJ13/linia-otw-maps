import style from "./FragmentMapItem.module.scss";

type FragmentMapItemProps = {
  src?: string;
  title: string;
};

const FragmentMapItem = ({ title, src }: FragmentMapItemProps) => {
  return (
    <div className={style.fragmentMap}>
      <div className={style.photo}>{/* <img src={src} alt={title} /> */}</div>
      <h4 className={style.title}>{title}</h4>
    </div>
  );
};

export default FragmentMapItem;
