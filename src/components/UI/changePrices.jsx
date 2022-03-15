import React, { Component } from "react";
import { Row } from "reactstrap";
import { toast } from "react-toastify";
import { getPrices, changePrices } from "services/priceService";

class ChangePrices extends Component {
  state = {
    getPrice: [],

    bittaBosmaJunalNarxi: "",
    bittaSertifikatNarxi: "",
    doi: "",
    sahifaNarxi: "",
    chopEtishNarxi: "",
  };

  componentDidMount() {
    this.getPrice();
  }

  getPrice = async () => {
    try {
      await getPrices().then((res) => {
        this.setState({ getPrice: res.data });
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
                    <div className="table p-3  row mx-0 p-4">
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
                          onClick={this.handleChangePrices}
                          className="btn w-100  btn-info"
                        >
                          Submit
                        </button>
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
