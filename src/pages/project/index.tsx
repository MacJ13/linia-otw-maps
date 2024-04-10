import style from "./Project.module.scss";
import Intro from "./intro/Intro";
import OrnamentLayer from "./OrnamentLayer/OrnamentLayer";
import ProjectInfo from "./ProjectInfo/ProjectInfo";

const Project = () => {
  return (
    <div className={style.main}>
      <div className={style.about}>
        <OrnamentLayer transform={false} />
        <Intro />

        <OrnamentLayer transform={true} />
      </div>

      <ProjectInfo />
    </div>
  );
};

export default Project;
