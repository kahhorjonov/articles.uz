import React from "react";
import NavbarHome from "./navbarHome";
import img from "../profile.png";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <NavbarHome />

        <div className="mainPages">
          <div className="container">
            <div className="col-md-10 pl-0  maqola_nashir">
              <h1>
                Maqolalar nashr qilish uchun <br />
                Articles.uz ilmiy onlayn jurnallari
              </h1>
              <p>Quyida maqolalar qabul qilinayotgan jurnallar ro’yxati</p>
            </div>

            <div className="article_rows row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 pl-0">
              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 card-articles">
                <div className="border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">Tibbiyot va farmakologiya</h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="buut-ons justify-content-center d-flex">
            <a href="">
              <button
                type="button"
                className="btn btn-dark btn-sm btn-outline-dark "
              >
                Barchasini ko’rish
              </button>
            </a>
          </div>
        </div>

        {/* gren Rrtecles */}

        <div className="sections">
          <div className="container p-0">
            <div className="row mr-0 ml-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-6">
                <div className="article-chap">
                  <p className="jurnal-haqida">Jurnal haqida</p>
                  <h2 className="article_uz">
                    Articles.uz onlayn jurnallari - bu <br />
                    o’zbek tilida elektron va bosma <br />
                    shaklda chop etiladigan oylik ilmiy nashrlar.
                  </h2>
                </div>
              </div>

              <div className="col-md-6">
                <div className="art-tex">
                  <p className="articles-text">
                    Articles.uz onlayn jurnallari ilm-fanning turli sohalarida
                    Oliy o'quv yurtlari o'qituvchilari, ilmiy xodimlar va
                    mutaxassislarga qaratilgan <br />
                    <p className="pt-5">
                      Tadqiqot faoliyati barcha ilmiy yo'nalishlarda jadal
                      rivojlanmoqda. Muayyan muammolarga yangi echimlar, fikrlar
                      va yondashuvlar mavjud. Bu jarayon ilmiy jamoatchilikka
                      xosdir. Tadqiqot natijalariga ko'ra ilmiy jurnallarda chop
                      etish zarur. Ushbu turdagi nashrlar butun dunyodagi
                      olimlar uchun axborot manbai va aloqa vositasidir. Uning
                      mazmuni yangi faktlar, ularni tushunish va gumanitar va
                      texnik tadqiqotlar sohasida keng jamoatchilik tomonidan
                      muhokama qilinadi.
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bg  */}

        <div className="container p-0">
          <div className="img-bg">
            <div className="col-md-12 p-0">
              <img src={img} alt="" />
            </div>

            <div className="d-flex row ml-0 mr-0">
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

        <div className="mualif container">
          <div className="row ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 ml-0 mr-0">
            <h2>
              Biz mualliflarga eng qulay ish sharoitlarini <br />
              taqdim etishga intilamiz:
            </h2>
            <ul className="list-group w-100 list-group-flush">
              <li className="list-group-item"></li>
              <li className="list-group-item">
                Ko'rib chiqish muddati (10 kun)
              </li>
              <li className="list-group-item">
                Jurnalning bosma versiyasini 20 kun ichida yuborish
              </li>
              <li className="list-group-item">Qulay narxlar</li>
              <li className="list-group-item">
                Jurnallar ilmiy bazalarda indekslanadi: Ulrichning Periodicals
                Directory, Cyberlinka, GoogleScholar
              </li>
              <li className="list-group-item"></li>
            </ul>
          </div>
        </div>

        {/* footer */}
        <div className="footer">
          <div className="container p-0">
            <h1>Biz bilan bog’lanish</h1>
            <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <p>Toshkent sh., Yunusobod t. 4-10-20</p>
                <p className="pt-0">10001010</p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Aloqa:</h5>
                <p>ost.info10@gmail.com</p>
                <p className="pt-0">(71) 224-20-30</p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <div className="d-classNameflex">
                  <a href="">Telegram</a>
                  <a href="" className="px-5">
                    Facebook
                  </a>
                  <a href="">Instagram</a>
                </div>
              </div>

              <div className="queres">
                <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
                  <div className="col-md-4">
                    <h1>Savollar qoldimi?</h1>
                    <a href="">
                      <button type="button" className="btn btn-dark">
                        Xabar qoldirish
                      </button>
                    </a>
                  </div>

                  <div className="col-md-8">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Asosiy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Jurnallar ro’yxati
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Nashr shartlari
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Biz bilan bog’lanish
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Tizimga kirish
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hr2">
                <hr />
              </div>

              <div className="foo_nex justify-content-between row">
                <div>
                  <div className="yerss">
                    <p>© Articles.uz 2020</p>
                  </div>
                </div>
                <div>
                  <div>
                    <p>OST Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
