// import SplitPane from "../../components/splitPane/SplitPane";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={`main ${style.main}`}>
      <div className={style.wrapper}>
        <div className={style.info}>
          <h1 className="h1">Kontakt</h1>
          <p className="paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem ipsum has been the industry text ever since when
            unknown printer sdfsd imply dummy text of the printing and
            typesetting industry
          </p>
          <div className={`link ${style.link}`}>
            <strong>example@gmail.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
