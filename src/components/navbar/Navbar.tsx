import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <ul className={style.navul}>
        <li className={style.navli}>
          <a className={style.active} href="">
            Główna
          </a>
        </li>
        <li className={style.navli}>
          <a href="">Mapa</a>
        </li>
        <li className={style.navli}>
          <a href="">O Projekcie</a>
        </li>
        <li className={style.navli}>
          <a href="">Miejsca</a>
        </li>
        <li className={style.navli}>
          <a href="">Kontakt</a>
        </li>
      </ul>
      <Curve />
    </nav>
  );
};

const Curve = () => (
  <div className={style.curve}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
        className={style.fill}
      ></path>
    </svg>
  </div>
);

export default Navbar;
