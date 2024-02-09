import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.main}>
      <div className={style.box}>
        <div className={style.intro}>
          <h1 className={style.h1}>Mapy: Linia Otwocka</h1>
          <p className={style.desc}>
            Projekt ma na celu przedstawienie oraz zachowanie pamięci o historii
            różnych miejsc oraz obiektów znajdujących się na terenie linii
            otwockiej, a także jej okolicach.
          </p>
          <a className={style.link}>Przejdź do mapy</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
