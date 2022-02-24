import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "routes/books.png";
import img1 from "assets/img/damir-bosnjak.jpg";
import img2 from "assets/img/mike.jpg";
import img3 from "assets/img/header.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "styles/jurnallarRoyhati.css";
import { Col } from "reactstrap";

class JurnallarRoyxati extends Component {
  render() {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2.4,
        slidesToSlide: 2, // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };

    const CustomRightArrow = ({ onClick, ...rest }) => {
      const {
        onMove,
        carouselState: { currentSlide, deviceType },
      } = rest;
      // onMove means if dragging or swiping in progress.
      return <button onClick={() => onClick()} />;
    };

    return (
      <div className="jurnallar">
        <div className="container">
          <div className="col-md-10">
            <h1>
              Articles.uz ilmiy onlayn jurnallari <br /> ro'yxati
            </h1>
          </div>

          <div className="row">
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
            </div>
          </div>
        </div>

        {/* gren sections */}

        <div className="sections a1">
          <div className="container p-0">
            <div className="row">
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

        {/* maqola qabul qilinayotgan  jurnallar */}

        <div className="maqolaQabul">
          <h1>Maqolalar qabul qilinayotgan jurnallar</h1>

          <div className="carousel">
            <div className="row mt-5 mx-0">
              <div className="col-lg-4">
                <h4>Barcha turdagi maqolalar qabul qilinuchi jurnallar</h4>
                <p className="text-muted">
                  <a href="#" className="text-decaration-none">
                    Barchasini ko’rish
                  </a>
                </p>
                <hr />
              </div>

              <div className="col-lg-8 colap">
                <Carousel
                  swipeable={false}
                  draggable={false}
                  // customRightArrow={<CustomRightArrow />}
                  showDots={false}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={this.props.deviceType !== "mobile" ? true : false}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={2000}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-10-px"
                >
                  {/* <div className="row mx-0"> */}

                  <Col lg="10" className="px-0 mx-0">
                    <div className="border-0">
                      <img src={img} width="360px" height="460px" alt="123" />
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
                  </Col>

                  <Col lg="10" className="px-0 mx-0">
                    <div className="border-0">
                      <img src={img1} width="360px" height="460px" alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          {" "}
                          <Link to="#">Sport</Link>{" "}
                        </h4>
                        <p className="card_text">
                          Maqolalar qabul qilish muddati <br />
                          01.09.2020 gacha
                        </p>
                      </div>
                    </div>
                  </Col>

                  <Col lg="10" className="px-0 mx-0">
                    <div className="border-0">
                      <img src={img2} width="360px" height="460px" alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          {" "}
                          <Link to="#">Fizika</Link>{" "}
                        </h4>
                        <p className="card_text">
                          Maqolalar qabul qilish muddati <br />
                          01.09.2020 gacha
                        </p>
                      </div>
                    </div>
                  </Col>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JurnallarRoyxati;
