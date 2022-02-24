import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Carousel } from '@trendyol-js/react-carousel';
// import { Carousel } from "reactstrap";
import { Carousel } from "bootstrap";
import img from "routes/books.png";

import "styles/jurnallarRoyhati.css";
import Foooter from "./foooter";

class JurnallarRoyxati extends Component {
  render() {
    return (
      <>
        <div className="jurnallar">
          <div className="container">
            <div className="col-md-10">
              <h1>
                Articles.uz ilmiy onlayn jurnallari <br /> ro'yxati
              </h1>
            </div>

            <div className="row mx-0">
              <div className="col-md-12">
                <ul className="nav navpils">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Barchasi
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Tibbiyot va farmakologiya
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Psixologiya va ta'lim
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Texnik fanlar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Filologiya va san'atshunoslik
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Ijtimoiy fanlar
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Kimyo va biologiya
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Iqtisodiyot va huquqshunoslik
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row jurnal_articles">
              <div className="col-md-4 ">
                <div className="card  border-0">
                  <img className="card-img-top" src={img} alt="Card image" />
                  <div className="card-body p-0">
                    <h4 className="card_title">
                      {" "}
                      <Link to="#">Tibbiyot va farmakologiya</Link>{" "}
                    </h4>
                    <p className="card_text">
                      Maqolalar qabul qilish muddati <br />
                      01.09.2020 gacha
                    </p>
                  </div>
                </div>

                <div className="col-md-4 ">
                  <div className="card  border-0">
                    <img className="card-img-top" src={img} alt="Card image" />
                    <div className="card-body p-0">
                      <h4 className="card_title">
                        {" "}
                        <Link to="#">Tibbiyot va farmakologiya</Link>{" "}
                      </h4>
                      <p className="card_text">
                        Maqolalar qabul qilish muddati <br />
                        01.09.2020 gacha
                      </p>
                    </div>
                  </div>

                  <div className="col-md-4 ">
                    <div className="card  border-0">
                      <img
                        className="card-img-top"
                        src={img}
                        alt="Card image"
                      />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          {" "}
                          <Link to="#">Tibbiyot va farmakologiya</Link>{" "}
                        </h4>
                        <p className="card_text">
                          Maqolalar qabul qilish muddati <br />
                          01.09.2020 gacha
                        </p>
                      </div>
                    </div>

                    <div className="col-md-4 ">
                      <div className="card  border-0">
                        <img
                          className="card-img-top"
                          src={img}
                          alt="Card image"
                        />
                        <div className="card-body p-0">
                          <h4 className="card_title">
                            {" "}
                            <Link to="#">Tibbiyot va farmakologiya</Link>{" "}
                          </h4>
                          <p className="card_text">
                            Maqolalar qabul qilish muddati <br />
                            01.09.2020 gacha
                          </p>
                        </div>
                      </div>

                      <div className="col-md-4 ">
                        <div className="card  border-0">
                          <img
                            className="card-img-top"
                            src={img}
                            alt="Card image"
                          />
                          <div className="card-body p-0">
                            <h4 className="card_title">
                              {" "}
                              <Link to="#">Tibbiyot va farmakologiya</Link>{" "}
                            </h4>
                            <p className="card_text">
                              Maqolalar qabul qilish muddati <br />
                              01.09.2020 gacha
                            </p>
                          </div>
                        </div>

                        <div className="col-md-4 ">
                          <div className="card  border-0">
                            <img
                              className="card-img-top"
                              src={img}
                              alt="Card image"
                            />
                            <div className="card-body p-0">
                              <h4 className="card_title">
                                {" "}
                                <Link to="#">
                                  Tibbiyot va farmakologiya
                                </Link>{" "}
                              </h4>
                              <p className="card_text">
                                Maqolalar qabul qilish muddati <br />
                                01.09.2020 gacha
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* gren sections */}

                      <div className="sections a1">
                        <div className="container p-0">
                          <div className="row mx-0">
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
                                  Articles.uz onlayn jurnallari ilm-fanning
                                  turli sohalarida Oliy o'quv yurtlari
                                  o'qituvchilari, ilmiy xodimlar va
                                  mutaxassislarga qaratilgan <br />
                                  <p className="pt-5">
                                    Tadqiqot faoliyati barcha ilmiy
                                    yo'nalishlarda jadal rivojlanmoqda. Muayyan
                                    muammolarga yangi echimlar, fikrlar va
                                    yondashuvlar mavjud. Bu jarayon ilmiy
                                    jamoatchilikka xosdir. Tadqiqot natijalariga
                                    ko'ra ilmiy jurnallarda chop etish zarur.
                                    Ushbu turdagi nashrlar butun dunyodagi
                                    olimlar uchun axborot manbai va aloqa
                                    vositasidir. Uning mazmuni yangi faktlar,
                                    ularni tushunish va gumanitar va texnik
                                    tadqiqotlar sohasida keng jamoatchilik
                                    tomonidan muhokama qilinadi.
                                  </p>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* maqola qabul qilinayotgan  jurnallar */}

                      <div className="maqolaQabul">
                        <h1>Maqolalar qabul qilinayotgan jurnallar</h1>

                        <div className="carousel">
                          <div className="row mt-5 mx-0">
                            <div className="col-md-4">
                              <h4>
                                Barcha turdagi maqolalar qabul qilinuchi
                                jurnallar
                              </h4>
                              <p className="text-muted">
                                <a href="#" className="text-decaration-none">
                                  Barchasini ko’rish
                                </a>
                              </p>
                              <hr />
                            </div>

                     
                            {/* <div className="col-md-8">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="card">
                          <img
                            className="card-img-top"
                            src={img}
                            alt="Card image"
                          />
                          <div className="card-body">
                            <h4 className="card-title">John Doe</h4>
                            <p className="card-text">Some example text.</p>
                            <a href="#" className="btn btn-primary">
                              See Profile
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item"></div>
                      <div className="carousel-item"></div>
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Foooter />
      </>
    );
  }
}

export default JurnallarRoyxati;
