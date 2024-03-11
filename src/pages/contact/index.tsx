// import SplitPane from "../../components/splitPane/SplitPane";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={style.contact}>
      <div className={style.content}>
        <div className={style.header}>
          <h1 className={style.h1}>Kontakt</h1>
        </div>

        <div className={style.wrapper}>
          <p className={style.p}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry text ever since when
            unknown printer sdfsd imply dummy text of the printing and
            typesetting industry
          </p>
          <div className={style.mail}>
            <strong>example@gmail.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
