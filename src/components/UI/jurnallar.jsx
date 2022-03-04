import React, { Component } from "react";
import axios from "axios";
import img from "../../components/profile.png";
import { Link } from "react-router-dom";
import "../../styles/homePage.css";

class Jurnallar extends Component {
  state = {
    jurnallar: [],
    jurnalsActivate: [],
  };

  componentDidMount = () => {
    this.getCategory();
  };

  getCategory = async () => {
    try {
      await axios
        .get("http://192.168.100.27:8080/api/category/allParentCategory")
        .then((respons) => {
          console.log(respons);
          this.setState({ jurnallar: respons.data });
        });
    } catch (erorr) {
      console.log(erorr);
    }
  };



  // getArticleJurnals = ()

  render() {
    const { jurnallar } = this.state;
    return (
      <>
        <div className="content">
          <div className="row mx-0">
            {jurnallar.length ? (
              jurnallar.map((articles) => (
                <ul key={articles.id} className="nav">
                  <li className="nav-item">
                    <a className="nav-link text-black" href="#">
                      {articles.name}
                    </a>
                  </li>
                </ul>
              ))
            ) : (
              <h1>Eroor chiqdi</h1>
            )}

              <div className="row mx-0">
                <div className="mainPages">
                  <div className="container p-0">
                    <div className="col-md-10 pl-0  maqola_nashir">
                      {/* <h1>
                        Maqolalar nashr qilish uchun <br />
                        Articles.uz ilmiy onlayn jurnallari
                      </h1>
                      <p>
                        Quyida maqolalar qabul qilinayotgan jurnallar ro’yxati
                      </p> */}
                    </div>

                    <div className="article_rows row mx-0 mx-xl-0 pl-0">

                      <div className="col-md-4 card-articles">
                        <div className="border-0">
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
                      </div>

                     

                 
                      <div className="col-md-4 card-articles">
                        <div className="border-0">
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
              </div>
            </div>
          </div>
 
      </>
    );
  }
}

export default Jurnallar;
