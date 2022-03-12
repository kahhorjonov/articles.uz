import React, { Component } from "react";

import img from "components/profile.png";
import "../../styles/aloqa.css";

class Aloqa extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="aloqa">
          <div className="container">
            <div className="row ml-0 mr-0">
              <div className="col-lg-12 col-md-12 col-sm-12 px-0">
                <h1 style={{ fontWeight: "bold" }}>Biz bilan bog'lanish</h1>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  Savollaringiz yoki takliflaringiz bormi? Muammolar bormi? Biz
                  har qanday vaziyatda muloqot qilishdan mamnunmiz!
                </p>

                <h4 style={{ fontWeight: "bold" }}>Telefon:</h4>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="tel:+998998332411"
                >
                  <p
                    style={{ fontSize: "2rem" }}
                    className="col-md-7 col-lg-7 col-sm-7 p-0"
                  >
                    (99) 833-24-11
                  </p>
                </a>

                <h4 style={{ fontWeight: "bold" }}>Email:</h4>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="mailto:anvark87@gmail.com"
                ></a>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  anvark87@gmail.com
                </p>

                <h4 style={{ fontWeight: "bold" }}>Manzil:</h4>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  Toshkent shahri, Mirzo Ulug'bek tumani, Ulug'bek shaharchasi,
                  QORASUV 6-MAVZE, 1-UY, 55-XONA
                </p>

                <h4 style={{ fontWeight: "bold" }}>Bizni kuzatib boring:</h4>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  <a style={{ color: "#5A5A5A" }} href="https://telegram.me/Uzb1511">
                    Telegram
                  </a>{" "}
                  <a style={{ color: "#5A5A5A" }} href="">
                    Facebook
                  </a>{" "}
                  <a style={{ color: "#5A5A5A" }} href="https://www.instagram.com/avto.intalim.uz/">
                    Instagram
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Aloqa;
