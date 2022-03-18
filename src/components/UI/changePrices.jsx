import React, { Component } from "react";
import { Row } from "reactstrap";
import { toast } from "react-toastify";
import { getPrices, changePrices } from "services/priceService";
import axios from "axios";

class ChangePrices extends Component {
  state = {
    getPrice: [],

    bittaBosmaJunalNarxi: "",
    bittaSertifikatNarxi: "",
    doi: "",
    sahifaNarxi: "",
    chopEtishNarxi: "",

    langeage: [],
    name: "",
    id: "",
  };

  componentDidMount() {
    this.getPrice();
    this.getLanguage();
  }

  changeEditLang = async (id, name) => {
    await axios
      .post(`http://192.168.100.27:8080/api/language/edit/${id}/${name}`, {
        id: this.state.id,
        name: this.state.name,
      })
      .then((res) => {
        console.log(res);
      });
  };

  getLanguage = async () => {
    try {
      await axios
        .get("http://192.168.100.27:8080/api/language/all")
        .then((res) => {
          this.setState({ langeage: res.data });
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

  langDelate = async (id) => {
    try {
      await axios
        .delete(`http://192.168.100.27:8080/api/language/delete/${id}`)
        .then((res) => {
          toast.info(res.data.message);
          this.getLanguage();
        });
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
    const { langeage } = this.state;
    const { name } = this.state;
    console.log(this.state.langeage);
    const { getPrice } = this.state;
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
                        Narxlarni o'zgartirish
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link p-3"
                        data-toggle="pill"
                        href="#home2"
                      >
                        Tilni Ozgartirish
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <Row className="align-items-center">
                    <div className="table p-3  row mx-0 p-4 tab-content">
                      <div className="tab-pane container active" id="home">
                        <div className="row">
                          <div className="col-lg-2 col-sm-4">
                            Jurnal narxi
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
                            Sertficat narxi
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
                            Saxifa narxi
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
                            Chop etish narxi
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
                            <button
                              style={{ height: "30px", padding: "2px" }}
                              onClick={this.handleChangePrices}
                              className="btn w-100  btn-info"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* ----------------------------------------- */}

                      <div id="home2" className="container tab-pane fade">
                        <table className="table table-hover">
                          <thead>
                            <tr className="col-lg-12">
                              <th className="col-lg-1">№</th>
                              <th className="col-lg-3">Name</th>
                              <th className="col-lg-3">Active</th>
                              <th className="col-lg-2">Delate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {langeage.map((article, index) => (
                              <tr key={article.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <input
                                    type="text"
                                    defaultValue={article.name}
                                    onChange={(e) => {
                                      this.setState({ name: e.target.value });
                                    }}
                                  />
                                </td>
                                <td>
                                  <label className="switch">
                                    <input
                                      defaultChecked={article.active}
                                      onChange={(e) =>
                                        this.handleChange(e.target.checked)
                                      }
                                      type="checkbox"
                                    />
                                    <span className="slider round"></span>
                                  </label>
                                </td>
                                <td>
                                  <button
                                    onClick={() => this.langDelate(article.id)}
                                    className="btn btn-danger mr-2"
                                  >
                                    delate
                                  </button>

                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                    onClick={(e) => this.changeEditLang()}
                                  >
                                    Submit
                                  </button>
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
