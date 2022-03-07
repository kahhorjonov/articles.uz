import React, { Component } from "react";
import "../../styles/jurnalarxive.css";
import img from "../../components/profile.png";
import { Link } from "react-router-dom";
import Foooter from "./foooter";
class JurnalArxive extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content jurnalArxive">
          <div>
            <a href="#">
              <b>&#8592;</b> &#128513; ORTGA / “Tibbiyot va farmakologiya” ilmiy
              jurnali
            </a>
          </div>
          <br />
          <h1>№ 9 (71) son</h1>

          <div className="row mx-0 ui">
            <div className="col-lg-4 pl-0">
              <img src={img} width="360px" alt="" />
              <p className="text-muted tex">
                <b className="text-dark">Jurnal soni:</b> № 9 (71)
              </p>
              <p>
                <p className="text-muted">
                  <b className="text-dark">Nashr etilgan sana:</b> 13.09.2020
                </p>
              </p>
              <button type="submit" className="btn btn-dark">
                Yuklab olish
              </button>
            </div>
            <div className="col-lg-8 ui2">
              <ul class="list-group list-group-flush">
                <li style={{ listStyle: "none" }}>JURNAL TARKIBI</li>
                <hr />
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> Kirish
                  </li>
                </Link>
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> 3. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
                <Link to="#">
                  <li class="list-group-item">
                    <span>1.</span> 4. Covid-19 vaksinasini yaratishda tavsiya
                    etiladigan kimyoviy birikmalar ro’yxati
                  </li>
                </Link>
              </ul>
            </div>

            <div className="col-lg-12 ui3">
              <div className="arxive ">
                <h2>Jurnal arxivi</h2>

                <ul class="nav nav-pills">
                  <li class="nav-item">
                    <a class="nav-link active" data-toggle="pill" href="#home">
                      2020
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#menu1">
                      2019
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#menu2">
                      2018
                    </a>
                  </li>
                </ul>

                <div class="tab-content">
                  <div class="tab-pane container active" id="home">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane container fade" id="menu1">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>

                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
                          № 9 (71) <span className="text-muted">/ 2020</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane container fade" id="menu2">
                    <div className="row">
                      <div className="col-lg-3">
                        <img src={img} width="270px" alt="" />
                        <Link className="text-dark" to="#">
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
        <Foooter/>
      </>
    );
  }
}

export default JurnalArxive;
