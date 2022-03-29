import React from "react";
import AOS from "aos";
import ru from "translations/ru";

import "aos/dist/aos.css";
import "styles/homePage.css";

class Section extends React.Component {
  state = {
    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });

    AOS.init();
  }

  render() {
    return (
      <>
        <div className="sections">
          <div className="container p-0">
            <div className="row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-6">
                <div
                  className="article-chap"
                  data-aos="fade-right"
                  data-aos-duration="2000"
                >
                  <p className="jurnal-haqida">
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

              <div className="col-md-6">
                <div
                  className="art-tex"
                  data-aos="fade-left"
                  data-aos-duration="2000"
                >
                  <span className="articles-text">
                    {this.state.lang === "ru"
                      ? ru.main_aboutText2
                      : "Articles.uz onlayn jurnallari ilm-fanning turli sohalarida Oliy o'quv yurtlari o'qituvchilari, ilmiy xodimlar va mutaxassislarga qaratilgan"}
                    <p className="pt-5">
                      {this.state.lang === "ru"
                        ? ru.main_aboutText3
                        : "Tadqiqot faoliyati barcha ilmiy yo'nalishlarda jadal rivojlanmoqda. Muayyan muammolarga yangi echimlar, fikrlar va yondashuvlar mavjud. Bu jarayon ilmiy jamoatchilikka xosdir. Tadqiqot natijalariga ko'ra ilmiy jurnallarda chop etish zarur. Ushbu turdagi nashrlar butun dunyodagi olimlar uchun axborot manbai va aloqa vositasidir. Uning mazmuni yangi faktlar, ularni tushunish va gumanitar va texnik tadqiqotlar sohasida keng jamoatchilik tomonidan muhokama qilinadi."}
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
