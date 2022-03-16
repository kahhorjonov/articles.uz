import React, { Component } from "react";
import {
  YMaps,
  Map,
  TypeSelector,
  Placemark,
  FullscreenControl,
  ZoomControl,
} from "react-yandex-maps";
import "styles/aloqa.css";

class Aloqa extends Component {
  render() {
    return (
      <>
        <div className="aloqa">
          <div className="container">
            <div className="row ml-0 mr-0">
              <div className="col-lg-6  px-0">
                <h1 style={{ fontWeight: "bold" }}>Biz bilan bog'lanish</h1>
                <p style={{ fontSize: "1.8rem" }}>
                  Savollaringiz yoki takliflaringiz bormi? Muammolar bormi? Biz
                  har qanday vaziyatda muloqot qilishdan mamnunmiz!
                </p>

                <h4 style={{ fontWeight: "bold" }}>Telefon:</h4>
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

                <h4 style={{ fontWeight: "bold" }}>Email:</h4>
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

                <h4 style={{ fontWeight: "bold" }}>Manzil:</h4>
                <p style={{ fontSize: "2rem" }}>
                  Toshkent shahri, Mirzo Ulug'bek tumani, Ulug'bek shaharchasi,
                  QORASUV 6-MAVZE, 1-UY, 55-XONA
                </p>

                <h4 style={{ fontWeight: "bold" }}>Bizni kuzatib boring:</h4>
                <p
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
                </p>
              </div>

              <div className="col-lg-6 col-sm-6">
                <div>
                  <YMaps>
                    <Map
                      width={"100%"}
                      height={"65vh"}
                      defaultState={{
                        center: [41.327845, 69.285692],
                        zoom: 15,
                      }}
                    >
                      <Placemark geometry={[41.327845, 69.285692]} />
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

export default Aloqa;
