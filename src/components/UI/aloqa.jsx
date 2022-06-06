import React, { Component } from "react";
import {
  YMaps,
  Map,
  TypeSelector,
  Placemark,
  FullscreenControl,
  ZoomControl,
} from "react-yandex-maps";
import ru from "translations/ru";

import { BsTelegram, BsFacebook } from "react-icons/bs";
import instagram from "assets/img/icons8-instagram.svg";

import "styles/aloqa.css";

class Aloqa extends Component {
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
        <div className="aloqa">
          <div className="container">
            <div className="row ml-0 mr-0">
              <div className="col-lg-6  px-0">
                <h1 style={{ fontWeight: "bold" }}>
                  {this.state.lang === "ru"
                    ? ru.main_boglanish
                    : "Biz bilan bog'lanish"}
                </h1>
                <p style={{ fontSize: "1.8rem" }}>
                  {this.state.lang === "ru"
                    ? ru.aloqa_1
                    : "Savollaringiz yoki takliflaringiz bormi? Muammolar bormi? Biz har qanday vaziyatda muloqot qilishdan mamnunmiz!"}
                </p>

                <h4 style={{ fontWeight: "bold" }}>
                  {this.state.lang === "ru" ? ru.login_tel : "Telefon"}
                </h4>
                <p
                  style={{ textDecoration: "none", color: "black" }}
                  href="tel:+998998332411"
                >
                  <a
                    style={{ color: "black", fontSize: "19px" }}
                    href="tel:+998998332411"
                  >
                    +(998) (99)-833-24-11
                  </a>
                </p>

                <h4 style={{ fontWeight: "bold" }}>Email :</h4>
                <a
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "2rem",
                  }}
                  href="mailto:anvark87@gmail.com"
                >
                  anvark87@gmail.com
                </a>

                <h4 style={{ fontWeight: "bold" }}>
                  {this.state.lang === "ru" ? ru.adres : "Manzil"}
                </h4>
                <p
                  className="col-sm-10 col-md-10 col-lg-10 px-0"
                  style={{ fontSize: "2rem" }}
                >
                  {this.state.lang === "ru"
                    ? ru.main_adres
                    : "Toshkent sh, Uchtepa tumani, Chilozor 12 mavze, 50 uy 26 xonadon"}
                </p>

                <h4 style={{ fontWeight: "bold" }}>
                  {this.state.lang === "ru"
                    ? ru.tarmoqlar
                    : "Ijtimoiy tarmoqlar:"}
                </h4>

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

                {/* <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  <a style={{ color: "#5A5A5A" }} href="https://t.me/Uzb1511">
                    Telegram{" "}
                  </a>
                  <a style={{ color: "#5A5A5A" }} href="">
                    Facebook{" "}
                  </a>
                  <a style={{ color: "#5A5A5A" }} href="">
                    Instagram
                  </a>
                </p> */}
              </div>

              <div className="col-lg-6 col-sm-6">
                <div>
                  <YMaps>
                    <Map
                      width={"100%"}
                      height={"65vh"}
                      defaultState={{
                        center: [41.279804, 69.183446],
                        zoom: 15,
                      }}
                    >
                      <Placemark geometry={[41.279804, 69.183446]} />
                      <TypeSelector options={{ float: "right" }} />
                      <FullscreenControl />
                      <ZoomControl options={{ float: "left" }} />
                    </Map>
                  </YMaps>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default React.memo(Aloqa);
