import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/chopetilgan.css";

class Radetish extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="m-0">Rad etilgan maqolalarim</h2>
                </div>
                <div className="card-body">
                  <div className="divs mt-5">
                    <div id="accordion">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item  border-0">
                          <div>
                            <span>#</span>
                            <span className="pl-4 text-muted">Maqola Nomi</span>
                          </div>
                        </li>
                        <hr />
                      </ul>

                      <ul
                        className="list-group list-group-flush"
                        data-toggle="collapse"
                        href="#collapse1"
                      >
                        <li className="list-group-item border-0">
                          <div className="d-flex  justify-content-between">
                            <div className="d-flex">
                              <div className="num">1</div>
                              <div className="pl-4">
                                Covid-19 vaksinasini yaratishda tavsiya
                                etiladigan kimyoviy <br /> birikmalar ro’yxati
                              </div>
                            </div>
                            <i className="nc-icon nc-minimal-right" />
                          </div>
                          <div
                            id="collapse1"
                            className="collapse"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              <h6>
                                Yo’nalish: <span>Tibbiyot va farmasevtika</span>
                              </h6>
                              <h6>
                                Jurnal:{" "}
                                <span>
                                  “ARTICLES.UZ: Tibbiyot va farmasevtika” - № 9
                                  (71){" "}
                                </span>
                              </h6>
                              <h6>
                                Nashr etilgan sana:<span>13.09.2020</span>
                              </h6>
                              <h5>
                                <Link to="/user/articleInfo/:id">
                                  Maqolani ko’rish
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </li>
                        <hr />
                      </ul>

                      <ul
                        className="list-group list-group-flush"
                        data-toggle="collapse"
                        href="#collapse2"
                      >
                        <li className="list-group-item  border-0">
                          <div className="d-flex  justify-content-between">
                            <div className="d-flex">
                              <div className="num">2</div>
                              <div className="pl-4">
                                Zamonaviy tibbiyotda xalq tabobatining o’rni
                              </div>
                            </div>
                            <i className="nc-icon nc-minimal-right" />
                          </div>
                          <div
                            id="collapse2"
                            className="collapse"
                            data-parent="#accordion"
                          >
                            <div className="card-body">Lorem ipsum..</div>
                          </div>
                        </li>
                        <hr />
                      </ul>

                      <ul
                        className="list-group list-group-flush"
                        data-toggle="collapse"
                        href="#collapse3"
                      >
                        <li className="list-group-item  border-0">
                          <div className="d-flex  justify-content-between">
                            <div className="d-flex">
                              <div className="num">3</div>
                              <div className="pl-4">
                                Zamonaviy tibbiyotda xalq tabobatining o’rni
                              </div>
                            </div>
                            <i className="nc-icon nc-minimal-right" />
                          </div>
                          <div
                            id="collapse3"
                            className="collapse"
                            data-parent="#accordion"
                          >
                            <div className="card-body">Lorem ipsum..</div>
                          </div>
                        </li>
                        <hr />
                      </ul>

                      <ul
                        className="list-group list-group-flush"
                        data-toggle="collapse"
                        href="#collapse3"
                      >
                        <li className="list-group-item  border-0">
                          <div className="d-flex  justify-content-between">
                            <div className="d-flex">
                              <div className="num">3</div>
                              <div className="pl-4">
                                Zamonaviy tibbiyotda xalq tabobatining o’rni
                              </div>
                            </div>
                            <i className="nc-icon nc-minimal-right" />
                          </div>
                          <div
                            id="collapse3"
                            className="collapse"
                            data-parent="#accordion"
                          >
                            <div className="card-body">Lorem ipsum..</div>
                          </div>
                        </li>
                        <hr />
                      </ul>
                    </div>

                    <div className="d-flex yanakorish justify-content-center">
                      <button type="button" className="btn  btn-outline-dark">
                        Yana maqolalarni yuklash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Radetish;
