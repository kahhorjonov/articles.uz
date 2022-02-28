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
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  (71) 224-20-30
                </p>

                <h4 style={{ fontWeight: "bold" }}>Email:</h4>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  ost.info10@gmail.com
                </p>

                <h4 style={{ fontWeight: "bold" }}>Manzil:</h4>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  Toshkent sh., Yunusobod t. 4-10-20 10001010
                </p>

                <h4 style={{ fontWeight: "bold" }}>Bizni kuzatib boring:</h4>
                <p
                  style={{ fontSize: "2rem" }}
                  className="col-md-7 col-lg-7 col-sm-7 p-0"
                >
                  <a style={{ color: "#5A5A5A" }} href="">
                    Telegram
                  </a>{" "}
                  <a style={{ color: "#5A5A5A" }} href="">
                    Facebook
                  </a>{" "}
                  <a style={{ color: "#5A5A5A" }} href="">
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
