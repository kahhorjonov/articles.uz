import React, { Component } from "react";
import { Row } from "reactstrap";
import { toast } from "react-toastify";
import { getPrices, changePrices } from "services/priceService";
import {
  changeLanguage,
  getAllLanguages,
  deleteLanguage,
  changeActivity,
  createLanguage,
} from "services/languageService";
import ru from "translations/ru";

class ChangePrices extends Component {
  state = {
    getPrice: [],
    activeName: "",
    activeId: "",

    bittaBosmaJunalNarxi: "",
    bittaSertifikatNarxi: "",
    doi: "",
    sahifaNarxi: "",
    chopEtishNarxi: "",

    language: [],
    name: "",
    id: "",
    newName: "",

    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang });

    this.getPrice();
    this.getLanguages();
  }

  createLanguage = async () => {
    try {
      await createLanguage(this.state.newName).then((res) => {
        toast.success(res.data.message);
        this.getLanguages();
        this.setState({ name: "" });
        this.setState({ newName: "" });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  editLanguage = async (id, name) => {
    try {
      await changeLanguage(id, name).then((res) => {
        toast.success(res.data.message);
        this.getLanguages();
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getLanguages = async () => {
    try {
      await getAllLanguages().then((res) => {
        this.setState({ language: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  getPrice = async () => {
    try {
      await getPrices().then((res) => {
        this.setState({ getPrice: res.data });
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  deleteLanguage = async (id) => {
    try {
      await deleteLanguage(id)
      .then((res) => {
        toast.info(res.data.message);
        this.getLanguages();
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleChangeActivity = async (id, bool) => {
    try {
      await changeActivity(id, bool).then((res) =>
        toast.success(res.data.message)
      );
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  handleChangePrices = async (e) => {
    try {
      await changePrices({
        bittaBosmaJunalNarxi: this.state.bittaBosmaJunalNarxi,
        bittaSertifikatNarxi: this.state.bittaSertifikatNarxi,
        doi: this.state.doi,
        sahifaNarxi: this.state.sahifaNarxi,
        chopEtishNarxi: this.state.chopEtishNarxi,
      }).then((res) => {
        toast.success(res.data.message);
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  render() {
    const { language, getPrice, lang } = this.state;

    const {
      bittaBosmaJunalNarxi,
      bittaSertifikatNarxi,
      chopEtishNarxi,
      doi,
      sahifaNarxi,
    } = getPrice;

    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active p-3"
                        data-toggle="pill"
                        href="#home"
                      >
                        {lang === "ru"
                          ? ru.changePrice
                          : "Narxlarni o'zgartirish"}
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link p-3"
                        data-toggle="pill"
                        href="#home2"
                      >
                        {lang === "ru" ? ru.changeLang : "Tilni Ozgartirish"}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <Row className="align-items-center">
                    <div className="table p-3 col-md-12 col-sm-12 col-lg-12 row mx-0 p-4 tab-content">
                      <div
                        className="col-md-12 col-sm-12 col-lg-12 tab-pane container active"
                        id="home"
                      >
                        <div className="row">
                          <div className="col-lg-2 col-sm-4">
                            {lang === "ru" ? ru.magazinePrice : "Jurnal narxi"}
                            <div>
                              <input
                                defaultValue={bittaBosmaJunalNarxi}
                                onChange={(e) =>
                                  this.setState({
                                    bittaBosmaJunalNarxi: e.target.value,
                                  })
                                }
                                type="text"
                                className="form-control"
                                id="usr"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-4">
                            {lang === "ru"
                              ? ru.sertificatePrice
                              : "Sertfikat narxi"}
                            <div>
                              <input
                                type="text"
                                onChange={(e) =>
                                  this.setState({
                                    bittaSertifikatNarxi: e.target.value,
                                  })
                                }
                                defaultValue={bittaSertifikatNarxi}
                                className="form-control"
                                id="usr"
                              />
                            </div>
                          </div>

                          <div className="col-lg-2 col-sm-4">
                            Doi
                            <div>
                              <input
                                onChange={(e) =>
                                  this.setState({ doi: e.target.value })
                                }
                                type="text"
                                defaultValue={doi}
                                className="form-control"
                                id="usr"
                              />
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-4">
                            {lang === "ru" ? ru.pagePrice : "Saxifa narxi"}
                            <div>
                              <input
                                onChange={(e) =>
                                  this.setState({ sahifaNarxi: e.target.value })
                                }
                                type="text"
                                defaultValue={sahifaNarxi}
                                className="form-control"
                                id="usr"
                              />
                            </div>
                          </div>

                          <div className="col-lg-2 col-sm-4">
                            {lang === "ru" ? ru.printPrice : "Chop etish narxi"}
                            <div>
                              <input
                                onChange={(e) =>
                                  this.setState({
                                    chopEtishNarxi: e.target.value,
                                  })
                                }
                                type="text"
                                defaultValue={chopEtishNarxi}
                                className="form-control"
                                id="usr"
                              />
                            </div>
                          </div>

                          <div className="col-lg-2 col-sm-4">
                            {lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                            <div>
                              <button
                                style={{ height: "30px", padding: "2px" }}
                                onClick={this.handleChangePrices}
                                className="btn w-100  btn-info"
                              >
                                {lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ----------------------------------------- */}

                      <div
                        id="home2"
                        className="col-sm-12 col-md-12 col-lg-12 container tab-pane fade"
                      >
                        {/* modal */}
                        <div
                          style={{ display: "flex", justifyContent: "end" }}
                          className="row"
                        >
                          <button
                            data-toggle="modal"
                            data-target="#myModal2"
                            className="btn btn-success"
                          >
                            {lang === "ru" ? ru.addLang : "Til qo'shish"} +
                          </button>
                        </div>

                        <div className="modal" id="myModal2">
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h4 className="modal-title">
                                  {lang === "ru" ? ru.addLang : "Til qo'shish"}{" "}
                                  +
                                </h4>
                              </div>

                              <div className="modal-body">
                                <input
                                  type="text"
                                  onChange={(e) =>
                                    this.setState({
                                      newName: e.target.value,
                                    })
                                  }
                                  className="form-control"
                                />
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-success mr-4"
                                  data-dismiss="modal"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    this.createLanguage(e);
                                  }}
                                >
                                  {lang === "ru" ? ru.restore_3 : "Tasdiqlash"}
                                </button>
                                <button
                                  type="button"
                                  className="btn"
                                  data-dismiss="modal"
                                >
                                  {lang === "ru" ? ru.admin_close : "Yopish"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <table className="table table-hover">
                          <thead>
                            <tr className="col-lg-12">
                              <th className="col-lg-1">№</th>
                              <th className="col-lg-2">
                                {lang === "ru" ? ru.tillar : "Tillar"}
                              </th>
                              <th className="col-lg-4">
                                {lang === "ru"
                                  ? ru.admin_activate
                                  : "Aktivlashtirish"}
                              </th>
                              <th className="col-lg-2">
                                {lang === "ru" ? ru.admin_actions : "Amallar"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {language &&
                              language.map((lang, index) => (
                                <tr key={lang.id}>
                                  <td>{index + 1}</td>
                                  <td>{lang.name}</td>
                                  <td>
                                    <label className="switch">
                                      <input
                                        defaultChecked={lang.active}
                                        onChange={(e) =>
                                          this.handleChangeActivity(
                                            lang.id,
                                            e.target.checked
                                          )
                                        }
                                        type="checkbox"
                                      />
                                      <span className="slider round"></span>
                                    </label>
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-primary mr-2"
                                      data-toggle="modal"
                                      data-target="#myModal"
                                      onClick={(e) => {
                                        this.setState({ activeId: lang.id });
                                        this.setState({
                                          activeName: lang.name,
                                        });
                                      }}
                                    >
                                      {/* {lang === "ru"
                                        ? ru.admin_edit
                                        : "Tahrirlash"} */}

                                      {lang === "ru"
                                        ? ru.admin_actions
                                        : "Tahrirlash"}
                                    </button>

                                    <button
                                      onClick={() =>
                                        this.deleteLanguage(lang.id)
                                      }
                                      className="btn"
                                    >
                                      {lang === "ru"
                                        ? ru.admin_delete
                                        : "O'chirish"}
                                    </button>

                                    <div className="modal" id="myModal">
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h4 className="modal-title">
                                              {lang === "ru"
                                                ? ru.admin_edit
                                                : "Tilni O'zgartirish"}
                                            </h4>
                                          </div>

                                          <div className="modal-body">
                                            <input
                                              type="text"
                                              defaultValue={
                                                this.state.activeName
                                              }
                                              className="form-control"
                                              onChange={(e) => {
                                                this.setState({
                                                  name: e.target.value,
                                                });
                                              }}
                                            />
                                          </div>

                                          <div className="modal-footer">
                                            <button
                                              type="button"
                                              className="btn btn-success mr-3"
                                              data-dismiss="modal"
                                              onClick={(e) => {
                                                this.editLanguage(
                                                  this.state.activeId,
                                                  this.state.name
                                                );
                                              }}
                                            >
                                              {lang === "ru"
                                                ? ru.restore_3
                                                : "Tasdiqlash"}
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              data-dismiss="modal"
                                            >
                                              {lang === "ru"
                                                ? ru.restore_3
                                                : "Yopish"}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChangePrices;
