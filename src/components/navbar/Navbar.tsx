import { NavLink } from "react-router-dom";
import style from "./Navbar.module.scss";

const Navbar = () => {
  type NavLinkProps = { isActive: boolean };

  const activeCls = ({ isActive }: NavLinkProps) =>
    isActive ? style.active : "";

  return (
    <nav className={style.nav}>
      <ul className={style.navul}>
        <li className={style.navli}>
          <NavLink className={activeCls} to="/">
            Główna
          </NavLink>
        </li>
        <li className={style.navli}>
          <NavLink className={activeCls} to="/map">
            Mapa
          </NavLink>
        </li>
        <li className={style.navli}>
          <NavLink className={activeCls} to="/project">
            O Projekcie
          </NavLink>
        </li>
        <li className={style.navli}>
          <NavLink className={activeCls} to="/places">
            Miejsca
          </NavLink>
        </li>
        <li className={style.navli}>
          <NavLink className={activeCls} to="/contact">
            Kontakt
          </NavLink>
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
