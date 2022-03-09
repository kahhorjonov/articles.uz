import React from "react";
import Section from "./section";
import Mainhome2 from "./mainhome2";
import Listhome from "./listhome";
import Foooter from "./foooter";
import { Link } from "react-router-dom";

import img from "../profile.png";

import "../../styles/homePage.css";

class Asosiy extends React.Component {
  render() {
    return (
      <>
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
                    <h4 className="card_title">
                      <Link to="/arxive">Tibbiyot va farmakologiya</Link>
                    </h4>
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
                    <h4 className="card_title">
                      <Link to="#">Tibbiyot va farmakologiya</Link>
                    </h4>
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
                    <h4 className="card_title">
                      <Link to="#">Tibbiyot va farmakologiya</Link>
                    </h4>
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
                    <h4 className="card_title">
                      <Link to="#">Tibbiyot va farmakologiya</Link>
                    </h4>
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
                    <h4 className="card_title">
                      <Link to="#">Tibbiyot va farmakologiya</Link>
                    </h4>
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
                    <h4 className="card_title">
                      <Link to="#">Tibbiyot va farmakologiya</Link>
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
        <Section />
        <Mainhome2 />
        <Listhome />
        <Foooter />
      </>
    );
  }
}
export default Asosiy;
