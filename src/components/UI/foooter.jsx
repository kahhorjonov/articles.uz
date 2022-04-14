import React from "react";
import { BsTelegram, BsFacebook } from "react-icons/bs";
import instagram from "assets/img/icons8-instagram.svg";
import ru from "translations/ru";

import "styles/homePage.css";

class Foooter extends React.Component {
  state = {
    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });
  }

  render() {
    return (
      <>
        <div className="footer">
          <div className="container">
            <h1>
              {this.state.lang === "ru"
                ? ru.main_boglanish
                : "Biz bilan bog‘lanish"}
            </h1>
            <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-4 col-sm-4 col-lg-4">
                <hr className="hr1 col-md-4 col-sm-4 col-lg-4" />
                <h5>{this.state.lang === "ru" ? ru.adres : "Manzil :"}</h5>
                <p>
                  {this.state.lang === "ru"
                    ? ru.main_adres
                    : "Toshkent shahri, Mirzo Ulug‘bek tumani, QORASUV 6-MAVZE, 1-UY, 55-XONA"}
                </p>
              </div>

              <div className="col-md-4 col-sm-3 col-lg-4">
                <hr className="hr1 col-md-4 col-sm-4 col-lg-4" />
                <h5>{this.state.lang === "ru" ? ru.aloqa : "Aloqa :"}</h5>
                <p>
                  <a href="mailto:anvark87@gmail.com">anvark87@gmail.com</a>
                </p>
                <p className="pt-0">
                  <a href="tel:+9989998332411">(99) 833-24-11</a>
                </p>
              </div>

              <div className="col-md-4 col-sm-3 col-lg-4">
                <hr className="hr1 col-md-4 col-sm-4 col-lg-4" />
                <h5>
                  {this.state.lang === "ru"
                    ? ru.tarmoqlar
                    : "Ijtimoiy tarmoqlar :"}
                </h5>
                <div className="d-flex align-items-center">
                  <a
                    style={{ paddingRight: "1rem" }}
                    href="https://telegram.me/Uzb1511"
                  >
                    <BsTelegram size={25} style={{ color: "	#0088cc" }} />
                  </a>

                  {/* <a href="#" className="px-5">
                    <FaInstagramSquare size={25} className="instagramLogo" />
                  </a> */}

                  <a
                    href="https://www.instagram.com/avto.intalim.uz/"
                    style={{ paddingRight: "1rem" }}
                  >
                    <img
                      style={{ width: "35px", height: "35px" }}
                      src={instagram}
                    />
                    {/* <FaInstagramSquare size={25} className="instagramLogo" /> */}
                  </a>

                  <a href="https://www.instagram.com/avto.intalim.uz/">
                    <BsFacebook size={25} style={{ color: "#3b5998" }} />
                  </a>
                </div>
              </div>

              <div className="queres">
                <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
                  <div className="col-md-4">
                    <h1>
                      {this.state.lang === "ru"
                        ? ru.main_savollar
                        : "Savollar qoldimi?"}
                    </h1>
                    {/* <a href="">
                      <button type="button" className="btn btn-dark">
                        Xabar qoldirish
                      </button>
                    </a> */}
                  </div>

                  <div className="col-md-8 pr-0">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="/main">
                          {this.state.lang === "ru" ? ru.nav_asosiy : "Asosiy"}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/listOfMagazines">
                          {this.state.lang === "ru"
                            ? ru.nav_jurnallar
                            : "Jurnallar ro‘yxati"}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/termsOfPublication">
                          {this.state.lang === "ru"
                            ? ru.nav_shartlar
                            : "Nashr shartlari"}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/contact">
                          {this.state.lang === "ru"
                            ? ru.main_boglanish
                            : "Biz bilan bog‘lanish"}
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="/login">
                          {this.state.lang === "ru"
                            ? ru.nav_kirish
                            : "Tizimga kirish"}
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
                <div className="yerss col-lg-6 col-sm-6 col-md-6">
                  <p>© Articles.uz {new Date().getFullYear()}</p>
                </div>

                <div className="col-lg-6 col-sm-6 col-md-6 endd">
                  <p className="">NDT Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Foooter;
