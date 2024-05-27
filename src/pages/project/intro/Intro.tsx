import style from "./Intro.module.scss";

const Intro = () => {
  return (
    <>
      <div className={style.content1}>
        <div className={style.photo}></div>
        <div className={style.info}>
          <h1 className="h1">
            {" "}
            Na Temat <br /> Projektu
          </h1>
          <p className="paragraph">
            Na przełomie XIX oraz XX wieku na terenie dzisiejszego Wawra oraz
            powiatu otwockiego powstały dwie równoległe linie:{" "}
            <ul className={style.ul}>
              <li className={style.li}>
                <strong>linia otwocka</strong> (linia kolejowa z Warszawy do
                Lublina)
              </li>
              <li className={style.li}>
                <strong>kolejka jabłonowska</strong> (linia kolejki
                wąskotorowej)
              </li>
            </ul>
            Wraz ze swoim uzdrowiskowym mikroklimatem spowodowały dynamiczny
            rozwój tego obszaru na początku XX wieku.
            <br />
            <br />
            Od tamtej pory aż do czasów współczesnych zarówno z postępem
            cywilizacyjno-technologicznym jak i z wydarzeniami historycznymi
            obszar regionu uległ znacząco zmianie.
          </p>
        </div>
      </div>
      <div className={style.content2}>
        <div className={style.photo}></div>
        <div className={style.info}>
          <p className="paragraph">
            Bardzo często jesteśmy świadkami (świadomie lub nie){" "}
            <strong>
              nieustających i postępujących przemian w naszych okolicach
            </strong>
            , które przeważnie prowadzą do zaniedbania, niszczenia a nawet
            wyburzania budynków, czego konsekwencją jest zmiana krajobrazu
            otoczenia i budowanie w te miejsca nowej infrastruktury.
            <br />
            <br />
            Dlatego ideą tego projektu jest{" "}
            <strong>
              zachowanie i utrwalenie pamięci oraz pogłębienie świadomości o o
              miejscach
            </strong>
            , które kiedyś były w pewien sposób istotne dla regionu czy
            społeczności żyjących na tych terenach w postaci interaktywnej mapy.
          </p>
        </div>
      </div>
    </>
  );
};

export default Intro;
