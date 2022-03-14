import React, { Component } from "react";
import { CardBody, Col, Input, Label, Row } from "reactstrap";
import axios from "axios";

class Setting extends Component {
  state = {
    getPrice: [],

    bittaBosmaJunalNarxi: "",
    bittaSertifikatNarxi: "",
    doi: "",
    sahifaNarxi: "",
    chopEtishNarxi: "",
  };

  componentDidMount() {
    this.getPrise();
  }

  getPrise = async () => {
    try {
      await axios
        .get(`http://192.168.100.27:8080/api/prices/getPrice`)
        .then((res) => {
          console.log(res);
          this.setState({ getPrice: res.data });
        });
    } catch (error) {
      console.log(error);
    }
  };

  postPrise = async (e) => {
    try {
      await axios
        .post(`http://192.168.100.27:8080/api/prices/editPrice`, {
          bittaBosmaJunalNarxi: this.state.bittaBosmaJunalNarxi,
          bittaSertifikatNarxi: this.state.bittaSertifikatNarxi,
          doi: this.state.doi,
          sahifaNarxi: this.state.sahifaNarxi,
          chopEtishNarxi: this.state.chopEtishNarxi,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {}
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
                  <h3>Narxlarni o'zgartirish</h3>
                </div>
                <div className="card-body">
                  <Row className="align-items-center">
                    <table className="table p-3 ">
                      <div className="row mx-0 p-4">
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
                          Submit
                          <button
                            style={{ height: "30px", padding: "2px" }}
                            onClick={this.postPrise}
                            className="btn w-100  btn-info"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </table>
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

export default Setting;
