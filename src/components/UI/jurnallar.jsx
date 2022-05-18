import React, { Component } from "react";
import {
  getParentMagazines,
  getMagazinesById,
  getActiveMagazines,
  getDeadlinedMagazines,
} from "services/magazineService";
import auth from "services/authService";

import GetImages from "utils/getImages";
import { getParentCategories } from "services/getCategories";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Input, Row } from "reactstrap";
import ru from "translations/ru";

import "styles/homePage.css";

class Jurnallar extends Component {
  state = {
    magazineCategories: [],
    magazines: [],

    user: "",
    lang: "",
  };

  componentDidMount = async () => {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    const user = auth.getCurrentUser() && auth.getCurrentUser().roles[0];

    this.setState({ user: user.id });

    await this.getCategory();

    this.state.magazineCategories &&
      (await this.getMagazinesById(this.state.magazineCategories[0].id));
  };

  getCategory = async () => {
    try {
      await getParentCategories().then((res) => {
        this.setState({ magazineCategories: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getMagazinesById = async (id) => {
    try {
      await getMagazinesById(id).then((res) => {
        this.setState({ magazines: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getMagazinesBySelect = async (option) => {
    try {
      option == 1
        ? await getParentMagazines().then((res) => {
            this.setState({ magazines: res.data });
          })
        : option == 2
        ? await getActiveMagazines().then((res) => {
            this.setState({ magazines: res.data });
          })
        : await getDeadlinedMagazines().then((res) => {
            this.setState({ magazines: res.data });
          });
    } catch (error) {
      toast.error(error);
    }
  };

  render() {
    const { magazineCategories, magazines, lang } = this.state;

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <Row>
                  <Col sm="6" md="6" lg="6">
                    <div className="card-header">
                      <h3>
                        {lang === "ru" ? ru.jurnallar_h1 : "Barcha jurnallar"}
                      </h3>
                    </div>
                  </Col>

                  <Col
                    sm="6"
                    md="6"
                    lg="6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                    }}
                  >
                    <div style={{ display: "block", paddingRight: "1.5rem" }}>
                      <Input
                        style={{ height: "unset" }}
                        type="select"
                        className="form-control"
                        onChange={(e) =>
                          this.getMagazinesBySelect(e.target.value)
                        }
                      >
                        <option value={1}>
                          {lang === "ru" ? ru.jurnallar_h1 : "Barcha jurnallar"}
                        </option>

                        <option value={2}>
                          {lang === "ru"
                            ? ru.jurnallar_option
                            : "Maqola qabul qilayotkan jurnallar"}
                        </option>

                        <option value={3}>
                          {lang === "ru"
                            ? ru.jurnallar_option1
                            : "Nashr jarayonidagi jurnallar"}
                        </option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <div className="card-body">
                  <div className="row mx-0">
                    {magazineCategories.length ? (
                      magazineCategories.map((category) => (
                        <ul key={category.id} className="nav">
                          <li className="nav-item">
                            <a
                              style={{
                                cursor: "pointer",
                                color: "black",
                                fontSize: "15px",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                this.getMagazinesById(category.id);
                              }}
                              className="nav-link text-black"
                            >
                              {category.name}
                            </a>
                          </li>
                        </ul>
                      ))
                    ) : (
                      <h1 className="text-center">Jurnallar Yo'q</h1>
                    )}
                  </div>

                  <div className="row ">
                    <div className="mainPages w-100">
                      <div className="container p-0">
                        <div className="col-md-10 pl-0  maqola_nashir"></div>

                        <div className="article_rows row mx-0 mx-xl-0 mb-3 pl-0">
                          {magazines &&
                            magazines.map((magazine) => (
                              <div
                                key={magazine.id}
                                className="col-md-4  card-articles"
                              >
                                <div className="border-0">
                                  <div className="testDiv">
                                    <Link
                                      to={`/${
                                        this.state.user === 1
                                          ? "admin"
                                          : this.state.user === 2
                                          ? "reductor"
                                          : this.state.user === 3
                                          ? "reviewer"
                                          : this.state.user === 4
                                          ? "user"
                                          : null
                                      }/magazineInformation/:${magazine.id}`}
                                    >
                                      <div className="boxShadow">
                                        <GetImages url={magazine.cover.id} />
                                      </div>
                                    </Link>
                                  </div>
                                  <div className="card-body p-0">
                                    <h4 className="card_title p-0">
                                      <Link
                                        to={`/${
                                          this.state.user === 1
                                            ? "admin"
                                            : this.state.user === 2
                                            ? "reductor"
                                            : this.state.user === 3
                                            ? "reviewer"
                                            : this.state.user === 4
                                            ? "user"
                                            : null
                                        }/magazineInformation/:${magazine.id}`}
                                        style={{ cursor: "pointer" }}
                                      >
                                        {magazine.title}
                                      </Link>
                                    </h4>

                                    <p className="card_text text-muted">
                                      {/* Maqolalar <br /> */}

                                      {this.state.lang === "ru" ? (
                                        <span>
                                          Выходит с{" "}
                                          {magazine &&
                                            new Date(
                                              magazine.deadline
                                            ).toLocaleDateString()}
                                        </span>
                                      ) : (
                                        <span>
                                          {magazine &&
                                            new Date(
                                              magazine.deadline
                                            ).toLocaleDateString()}{" "}
                                          dan buyon chiqadi
                                        </span>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* buttons */}
                      {/* <div className="buut-ons justify-content-center d-flex">
                        <a href="">
                          <button
                            type="button"
                            className="btn btn-dark btn-sm btn-outline-dark "
                          >
                            Barchasini ko’rish
                          </button>
                        </a>
                      </div> */}
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

export default React.memo(Jurnallar);
