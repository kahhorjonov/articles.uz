import React, { Component } from "react";
import { Link } from "react-router-dom";
import img from "routes/books.png";
import img1 from "assets/img/damir-bosnjak.jpg";
import img2 from "assets/img/mike.jpg";
import { toast } from "react-toastify";

import {
  getMagazinesById,
  getParentCategories,
} from "services/magazineService";

import { Col } from "reactstrap";

import GetImages from "utils/getImages";
import Listhome from "./listhome";
import Foooter from "./foooter";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import "styles/jurnallarRoyhati.css";

class JurnallarRoyxati extends Component {
  state = {
    magazineCategories: [],
    magazines: [],
  };

  componentDidMount = async () => {
    await this.getCategory();

    this.state.magazineCategories &&
      (await this.handleGetMagazinesById(this.state.magazineCategories[0].id));
  };

  getCategory = async () => {
    try {
      await getParentCategories().then((respons) => {
        this.setState({ magazineCategories: respons.data });
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleGetMagazinesById = async (id) => {
    try {
      await getMagazinesById(id).then((res) => {
        this.setState({ magazines: res.data });
      });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const { magazines, magazineCategories } = this.state;

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

          <div className="row mx-0 mx-sm-0">
            <div className="col-md-12">
              <ul className="nav navpils">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    data-toggle="pill"
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleGetMagazinesById(0);
                    }}
                  >
                    Barchasi
                  </Link>
                </li>

                {magazineCategories &&
                  magazineCategories.map((category) => (
                    <li key={category.id} className="nav-item">
                      <Link
                        className="nav-link"
                        data-toggle="pill"
                        to=""
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleGetMagazinesById(category.id);
                        }}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="row mx-0 mx-sm-0 jurnal_articles">
            {magazines &&
              magazines.map((magazine) => (
                <div key={magazine.id} className="col-md-4 ">
                  <div className="card border-0">
                    <GetImages url={magazine.cover.id} />

                    <div className="card-body p-0">
                      <h4
                        style={{ marginTop: "15px" }}
                        className="card_title p-0"
                      >
                        <Link
                          to={`/listOfMagazines/magazineInfo/:${magazine.id}`}
                        >
                          {magazine.title}
                        </Link>
                      </h4>
                      {/* <p className="card_text">
                        Maqolalar qabul qilish muddati <br />
                        {new Date(magazine.deadline)
                          .toISOString()
                          .slice(0, 10)}{" "}
                        gacha
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* gren sections */}

        <div className="sections a1">
          <div className="container p-0">
            <div className="row mx-0 mx-sm-0">
              <div className="col-md-6">
                <div className="article-chap">
                  <p style={{ fontSize: "32px" }} className="jurnal-haqida">
                    Jurnal haqida
                  </p>
                  <h2 style={{ fontSize: "32px" }} className="article_uz">
                    Articles.uz onlayn jurnallari - bu <br />
                    o’zbek tilida elektron va bosma <br />
                    shaklda chop etiladigan oylik ilmiy nashrlar.
                  </h2>
                </div>
              </div>

              <div className="col-md-6">
                <div className="art-tex">
                  <span className="articles-text">
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
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* maqola qabul qilinayotgan  jurnallar */}

        <div className="maqolaQabul">
          <h1>Maqolalar qabul qilinayotgan jurnallar</h1>

          <div className="carousel">
            <div className="row mx-0 mx-sm-0 mt-5 mx-0">
              <div className="col-lg-4">
                <h4>Barcha turdagi maqolalar qabul qilinuchi jurnallar</h4>
                <p className="text-muted">
                  <a href="#" className="text-decaration-none">
                    Barchasini ko’rish
                  </a>
                </p>
                <hr className="hrrr" />
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
                      <img src={img} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Tibbiyot va farmakologiya</Link>
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
                      <img src={img1} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Sport</Link>
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
                      <img src={img2} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Fizika</Link>
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
            <hr className="hr2" />
            <div className="row mx-0 mx-sm-0 mt-5 mx-0">
              <div className="col-lg-4">
                <h4>Filologiya va san'atshunoslik</h4>
                <p className="text-muted">
                  <a href="#" className="text-decaration-none">
                    Barchasini ko’rish
                  </a>
                </p>
                <hr className="hrrr" />
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
                      <img src={img} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Tibbiyot va farmakologiya</Link>
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
                      <img src={img1} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Sport</Link>
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
                      <img src={img2} alt="123" />
                      <div className="card-body p-0">
                        <h4 className="card_title">
                          <Link to="#">Fizika</Link>
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
        <Listhome />
        {/* <Foooter /> */}

        <div className="footer">
          <div className="container">
            <h1>Biz bilan bog’lanish</h1>
            <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <p>
                  Toshkent shahri, Mirzo Ulug'bek tumani, Ulug'bek shaharchasi,
                  QORASUV 6-MAVZE, 1-UY, 55-XONA
                </p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Aloqa:</h5>
                <p>
                  <a href="mailto:anvark87@gmail.com">anvark87@gmail.com</a>
                </p>
                <p className="pt-0">
                  <a href="tel:+9989998332411">(99) 833-24-11</a>
                </p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <div className="d-flex">
                  <a href="https://telegram.me/Uzb1511">Telegram</a>
                  <a href="#" className="px-5">
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/avto.intalim.uz/">
                    Instagram
                  </a>
                </div>
              </div>

              <div className="queres">
                <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
                  <div className="col-md-4">
                    <h1>Savollar qoldimi?</h1>
                    <a href="">
                      {/* <button type="button" className="btn btn-dark">
                        Xabar qoldirish
                      </button> */}
                    </a>
                  </div>

                  <div className="col-md-8 pr-0">
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
                <div className="yerss col-lg-6">
                  <p>© Articles.uz {new Date().getFullYear()}</p>
                </div>

                <div className="col-lg-6 endd">
                  <p className="">NDT Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JurnallarRoyxati;
