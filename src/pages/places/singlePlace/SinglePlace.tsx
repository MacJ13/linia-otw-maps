import style from "./SinglePlace.module.scss";
import Ornament from "../../../assets/svg/swidermajer.svg?react";
import placeImg from "../../../assets/images/place.jpg";
// import OrnamentImg from "../../../assets/svg/swidermayer.svg?react";

type SinglePlaceProps = {
  reverse: boolean;
};

const SinglePlace = ({ reverse }: SinglePlaceProps) => {
  return (
    <div className={style.wrapper}>
      <div className={`${style.card} ${reverse ? style.reverse : ""}`}>
        <div className={style.ornament}>
          <Ornament />
        </div>
        <div className={`${style.content}`}>
          <h3 className={style.h3}>Fortyfikacje</h3>
          <p className={`paragraph ${style.p}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry text ever since when
            unknown printer sdfsd sdg sdg sdg sdg sdng kjsdg jksdg kj sdjsdjkg
            hksdjg hkjg lsdgj lksdgj lksdgj lksdgj lkj
          </p>
          <a className={`link ${style.link}`}>Zobacz na mapie</a>
        </div>
        <div className={style.photo}>
          <img src={placeImg} alt="image test" />
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
