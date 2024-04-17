import style from "./Sidebar.module.scss";
import SidebarHistoricLayers from "./SidebarHistoricMaps";

import SidebarPlace from "./SidebarPlace";
import SidebarTileLayers from "./SidebarTileLayers";

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.li}>
        <SidebarPlace />

        <SidebarHistoricLayers />
        <SidebarTileLayers />
      </div>
    </div>
  );
};

export default Sidebar;
