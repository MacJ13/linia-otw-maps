import { useSelector } from "react-redux";
import style from "./Sidebar.module.scss";
import SidebarHistoricLayers from "./SidebarHistoricLayers";

import SidebarPlace from "./SidebarPlace";
import SidebarTileLayers from "./SidebarTileLayers";
import SidebarToggleButton from "./SidebarToggleButton";
import { selectOpenSidebar } from "../../state/sidebarSlice";

const Sidebar = () => {
  const openSidebar = useSelector(selectOpenSidebar);

  let cls = style.sidebar;

  if (!openSidebar) cls += " " + style.hidden;

  return (
    <div className={cls}>
      <div className={style.li}>
        <SidebarPlace />
        <SidebarHistoricLayers />
        <SidebarTileLayers />
      </div>
      <SidebarToggleButton />
    </div>
  );
};

export default Sidebar;
