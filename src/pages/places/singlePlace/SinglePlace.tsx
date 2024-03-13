import style from "./SinglePlace.module.scss";

type SinglePlaceProps = {
  reverse: boolean;
};

const SinglePlace = ({ reverse }: SinglePlaceProps) => {
  return (
    <div className={style.wrapper}>
      <div className={style.place}>
        <div className={`${style.card} ${reverse ? style.reverse : ""}`}>
          <div className={style.photo}>photo</div>
          <div className={style.info}>
            <div className={style.heading}>
              <h3 className={style.h3}>Fortyfikacje</h3>
            </div>

            <p className={style.p}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry text ever since when
              unknown printer sdfsd sdg sdg sdg sdg sdng kjsdg jksdg kj sdjsdjkg
              hksdjg hkjg lsdgj lksdgj lksdgj lksdgj lkj
            </p>
            <a className={style.link}>Zobacz na mapie</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlace;
