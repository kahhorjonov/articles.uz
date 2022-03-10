import React, { Component } from "react";
import img from "components/profile.png";
import { Link } from "react-router-dom";
import Foooter from "./foooter";

import "styles/jurnalarxive.css";

class JurnalArxive extends Component {
  render() {
    return (
      <>
        <div className="container jurnalArxive">
          <div>
            <Link to="" onClick={this.props.history.goBack}>
              <b>&#8592;</b> &#128513; ORTGA / “Tibbiyot va farmakologiya” ilmiy
              jurnali
            </Link>
          </div>
          <br />
          <h1>№ 9 (71) son</h1>

          <div className="row px-0 mx-0 ui">
            <div className="col-lg-4 pl-0">
              <img src={img} width="360px" alt="" />
              <p style={{ fontSize: "16px" }} className="text-muted tex">
                <b className="text-dark">Jurnal soni:</b> № 9 (71)
              </p>
              <p>
                <span style={{ fontSize: "16px" }} className="text-muted">
                  <b className="text-dark">Nashr etilgan sana:</b> 13.09.2020
                </span>
              </p>
              <button type="submit" className="btn btn-dark">
                Yuklab olish
              </button>
            </div>
            <div className="col-lg-8 ui2">
              <ul className="list-group list-group-flush">
                <li style={{ listStyle: "none", fontSize: "16px" }}>
                  JURNAL TARKIBI
                </li>
                {/* <hr /> */}
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> Kirish
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> 3. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li className="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-lg-12 ui3 px-0">
              <div className="arxive px-0">
                <h2>Jurnal arxivi</h2>

                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="pill"
                      href="#home"
                    >
                      2020
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#menu1">
                      2019
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="pill" href="#menu2">
                      2018
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane container active" id="home">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark"
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane container fade" id="menu1">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane container fade" id="menu2">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link
                          style={{ marginTop: "1rem" }}
                          className="text-dark "
                          to="#"
                        >
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Foooter /> */}
      </>
    );
  }
}

export default JurnalArxive;
