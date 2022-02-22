import React from "react";
import img from "../profile.png";
import "../../styles/homePage.css";

class Mainhome2 extends React.Component {
  render() {
    return (
      <>
        <div className="container p-0">
          <div className="img-bg">
            <div className="col-md-12 p-0">
              <img src={img} alt="" />
            </div>

            <div className="d-flex row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-6 p-0">
                <h1>
                  Bizning asosiy maqsadimiz ilmiy <br /> hodimlarning ish
                  unumdorligi oshirish
                </h1>
              </div>

              <div className="col-md-6 p-0">
                <p className="text-left">
                  Maqolalar chop etish uchun ilmiy jurnallar tadqiqot
                  faoliyatida samarali yordamchilardir. Ilmiy va texnologik
                  taraqqiyot materiallarni nashrga etkazish usullarini
                  soddalashtirdi. Endi ishni nashr qilish uchun siz nashriyotga
                  borishingiz, uzoq vaqt kutishingiz shart emas. Shunchaki nashr
                  qildirmoqchi bo’lgan maqolangizni bizga yuborsangiz bo’ldi!
                </p>
                <div className="buttonsDark">
                  <a href="#">
                    <button type="button" className="btn btn-dark">
                      Maqola yuborish
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* db-article.uz */}

        <div className="bgGren2">
          <div className="container p-0">
            <div className="row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-6 p-0">
                <div className="art_uz">
                  <h1>Articles.uz</h1>
                  <p>
                    Ushbu onlayn jurnal o’z faoliyati davomida ilmiy
                    tadqiqotchilarning, pedagog o’qituvchilarning ko’plab ilmiy
                    maqolalaridan tashkil topgan elektron bazani shakllantirib
                    kelmoqda va plagiat maqolalarning oldi olinmoqda.
                  </p>
                  <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 num pt-5">
                    <div className="col-md-4">
                      <h5 className="mb-0">20,000</h5>
                      <p>Barcha maqolalar</p>
                    </div>
                    <div className="col-md-4">
                      <h5 className="mb-0">10,000</h5>
                      <p>Mualliflar</p>
                    </div>

                    <div className="col-md-4">
                      <h5 className="mb-0">347</h5>
                      <p>Ilmiy hodimlar</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="art_uz2">
                  <img src={img} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bizning mualif eng qulay... */}
      </>
    );
  }
}
export default Mainhome2;
