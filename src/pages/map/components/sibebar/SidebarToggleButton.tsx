import style from "./SidebarToggleButton.module.scss";
import NextSvg from "../../../../assets/svg/next.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenSidebar, toggleSidebar } from "../../state/sidebarSlice";

const SidebarToggleButton = () => {
  const openSidebar = useSelector(selectOpenSidebar);

  let cls = style.btn;

  if (openSidebar) cls += " " + style.rotate;

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className={style.toggle}>
      <button onClick={handleClick} className={cls}>
        <NextSvg />
      </button>
    </div>
  );
};

export default SidebarToggleButton;
