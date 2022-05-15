import React from "react";
import AOS from "aos";
import ru from "translations/ru";

import "styles/homePage.css";
import "aos/dist/aos.css";

class Section extends React.Component {
  state = {
    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });

    AOS.init({});
  }

  render() {
    return (
      <>
        <div className="sections">
          <div className="container p-0">
            <div className="row mx-0 mx-lg-0 mx-md-0">
              <div className="col-md-6 pr-3">
                <div
                  className="article-chap"
                  data-aos="fade-right"
                  data-aos-duration="1200"
                  data-aos-offset="1000"
                  data-aos-anchor="#example-anchor"
                >
                  <p className="jurnal-haqida mt-3">
                    {this.state.lang === "ru"
                      ? ru.main_pAbout
                      : "Jurnal haqida"}
                  </p>

                  <h2 className="article_uz">
                    {this.state.lang === "ru"
                      ? ru.main_aboutText
                      : "Articles.uz onlayn jurnallari - bu o’zbek tilida elektron va bosma shaklda chop etiladigan oylik ilmiy nashrlar."}
                  </h2>
                </div>
              </div>

              <div className="col-md-6 pl-3">
                <div
                  className="art-tex"
                  data-aos="fade-left"
                  data-aos-duration="1200"
                  data-aos-offset="1000"
                  data-aos-anchor="#example-anchor"
                >
                  <span className="articles-text">
                    {this.state.lang === "ru"
                      ? ru.main_aboutText2
                      : "Articles.uz onlayn jurnallari ilm-fanning turli sohalarida Oliy o'quv yurtlari o'qituvchilari, ilmiy xodimlar va mutaxassislarga qaratilgan"}
                    <p className="pt-5">
                      {this.state.lang === "ru"
                        ? ru.main_aboutText3
                        : "Tadqiqot faoliyati barcha ilmiy yo'nalishlarda jadal rivojlanmoqda. Muayyan muammolarga yangi yechimlar, fikrlar va yondashuvlar mavjud va bu jarayon ilmiy jamoatchilikka xosdir. Ushbu turdagi nashrlar butun dunyodagi olimlar uchun axborot manbai va aloqa vositasidir. Uning mazmuni yangi faktlar, ularni tushunish,gumanitar va texnik tadqiqotlar sohasida keng jamoatchilik tomonidan muhokama qilinadi."}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Section;
