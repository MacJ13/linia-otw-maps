import { Link } from "react-router-dom";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={`main ${style.main}`}>
      <div className={style.box}>
        <div className={style.intro}>
          <h1 className="h1"> Mapy: Linia Otwocka</h1>
          <p className={`paragraph ${style.p}`}>
            Projekt ma na celu{" "}
            <strong>przedstawienie oraz zachowanie pamięci o historii </strong>
            różnych miejsc oraz obiektów znajdujących się na terenie linii
            otwockiej, a także jej okolicach.
          </p>
          <Link to="/map" className={`link ${style.link}`}>
            Przejdź do mapy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
