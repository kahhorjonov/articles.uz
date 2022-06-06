import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AOS from "aos";
import ru from "translations/ru";
import Section from "./section";
import Foooter from "./foooter";
import { getActiveMagazines } from "services/magazineService";

import {
  getPublishedParentMagazines,
  getPublishedMagazinesById,
} from "services/magazineService";

import { getPublishedParentCategories } from "services/getCategories";

import { Col, Button } from "reactstrap";

import GetImages from "utils/getImages";
// import Listhome from "./listhome";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "styles/jurnallarRoyhati.css";
import "aos/dist/aos.css";

class JurnallarRoyxati extends Component {
  state = {
    magazineCategories: [],
    magazines: [],
    carouselMagazines: [],
    loading: true,

    lang: "",
  };

  componentDidMount = async () => {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });

    await this.getCategory();
    AOS.init();
    this.state.magazineCategories && (await this.handleGetMagazinesById(0));

    try {
      await getActiveMagazines().then((res) => {
        this.setState({ carouselMagazines: res.data });
        this.setState({ loading: false });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getCategory = async () => {
    try {
      await getPublishedParentCategories().then((res) => {
        this.setState({ magazineCategories: res.data.object });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleGetMagazinesById = async (id) => {
    try {
      await getPublishedMagazinesById(id).then((res) => {
        this.setState({ magazines: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { magazines, magazineCategories, carouselMagazines } = this.state;

    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2.4,
        slidesToSlide: 2,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
      },
    };

    const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
      const {
        carouselState: { currentSlide },
      } = rest;
      return (
        <div className="carousel-button-group">
          <Button
            className={currentSlide === 0 ? "disable" : ""}
            onClick={() => previous()}
          />
          <Button onClick={() => next()} />
          <Button onClick={() => goToSlide(currentSlide + 1)}>
            Go to any slide
          </Button>
        </div>
      );
    };

    return (
      <div className="jurnallar">
        <div className="container">
          <div className="col-md-10">
            <h1>
              {this.state.lang === "ru"
                ? ru.jurnallar_h1
                : "Articles.uz ilmiy onlayn jurnallari ro'yxati"}
            </h1>
          </div>

          <div className="row mx-0 mx-sm-0">
            <div className="col-md-12">
              <ul className="nav navpils">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    data-toggle="pill"
                    to=""
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleGetMagazinesById(0);
                    }}
                  >
                    {this.state.lang === "ru"
                      ? ru.jurnallar_cat_all
                      : "Barchasi"}
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

          <div className="article_rows row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 pl-0">
            {magazines &&
              magazines.map((magazine) => (
                <div key={magazine.id} className="col-md-4 card-articles">
                  <div className="border-0">
                    <Link to={`/listOfMagazines/magazineInfo/:${magazine.id}`}>
                      {/* <div className="boxShadow">
                        <GetImages url={magazine.cover.id} />
                      </div> */}
                    </Link>

                    <div className="card-body p-0">
                      <h4 className="card_title">
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

          {/* <div className="row mx-0 mx-sm-0 jurnal_articles">
            {magazines &&
              magazines.map((magazine) => (
                <div key={magazine.id} className="col-md-4 ">
                  <div className="card border-0">
                    <Link to={`/main/magazineInfo/:${magazine.id}`}>
                      <div className="boxShadow">
                        <GetImages url={magazine.cover.id} />
                      </div>
                    </Link>

                    <div className="card-body p-0">
                      <h4
                        // style={{ marginTop: "15px" }}
                        className="card_title p-0"
                      >
                        <Link
                          to={`/listOfMagazines/magazineInfo/:${magazine.id}`}
                        >
                          {magazine.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
        </div>

        {/* gren sections */}

        <Section />

        {/* maqola qabul qilinayotgan  jurnallar */}

        <div className="maqolaQabul">
          <h1>
            {this.state.lang === "ru"
              ? ru.jurnallar_art_rec
              : "Maqolalar qabul qilayotgan jurnallar"}
          </h1>

          <div className="carousel">
            <div className="row mx-0 mx-sm-0 mt-5 mx-0">
              <div className="col-lg-4">
                <h4>
                  {this.state.lang === "ru"
                    ? ru.jurnallar_rec
                    : "Maqolalar qabul qiluvchi barcha jurnallar"}
                </h4>

                {/* <p className="text-muted">
                  <a href="#" className="text-decaration-none">
                    Barchasini ko’rish
                  </a>
                </p>
                <hr className="hrrr" /> */}
              </div>

              <div className="col-lg-8 colap">
                <Carousel
                  swipeable={true}
                  draggable={true}
                  customButtonGroup={<ButtonGroup />}
                  // customRightArrow={<ButtonGroup />}
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
                  {carouselMagazines &&
                    carouselMagazines.map((magazine, idx) => (
                      <Col key={idx} lg="10" className="px-0 mx-0">
                        <div className="border-0">
                          <Link to={`/main/magazineInfo/:${magazine.id}`}>
                            <div className="boxShadow">
                              <GetImages url={magazine.coverId} />
                            </div>
                          </Link>

                          <div className="card-body p-0">
                            <h4 className="card_title">
                              <Link to={`/main/magazineInfo/:${magazine.id}`}>
                                {magazine.title}
                              </Link>
                            </h4>
                            <p className="card_text">
                              {this.state.lang === "ru"
                                ? ru.main_deadline
                                : "Maqolalar qabul qilish muddati"}
                              <br />
                              {new Date(magazine.deadline)
                                .toISOString()
                                .slice(0, 10)}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        <Foooter />
      </div>
    );
  }
}

export default React.memo(JurnallarRoyxati);
