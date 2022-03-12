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
        .post(
          `http://192.168.100.27:8080/api/prices/editPrice
        `,
          {
            bittaBosmaJunalNarxi: this.state.bittaBosmaJunalNarxi,
            bittaSertifikatNarxi: this.state.bittaSertifikatNarxi,
            doi: this.state.doi,
            sahifaNarxi: this.state.sahifaNarxi,
          }
        )
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
    const { bittaBosmaJunalNarxi, bittaSertifikatNarxi, doi, sahifaNarxi } =
      getPrice;

    console.log(this.state.sertificatNarxi);

    return (
      <>
        <div className="content">
          {/* {getPrice.map((price) => ( */}
          <Row className="align-items-center">
            <div className="col-lg-2">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="collapse"
                data-target="#demo"
              >
                Narxi
              </button>
            </div>

            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">Jurnal Narxi:</label>
                <input
                  defaultValue={bittaBosmaJunalNarxi}
                  onChange={(e) =>
                    this.setState({ bittaBosmaJunalNarxi: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  id="usr"
                />
              </div>
            </div>
            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">Sertifikat narxi:</label>
                <input
                  type="text"
                  onChange={(e) =>
                    this.setState({ bittaSertifikatNarxi: e.target.value })
                  }
                  defaultValue={bittaSertifikatNarxi}
                  className="form-control"
                  id="usr"
                />
              </div>
            </div>
            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">doi:</label>
                <input
                  onChange={(e) => this.setState({ doi: e.target.value })}
                  type="text"
                  defaultValue={doi}
                  className="form-control"
                  id="usr"
                />
              </div>
            </div>
            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">Sahifa Narhi:</label>
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

            <div id="demo" className="col-lg-2 collapse">
              <button onClick={this.postPrise} className="btn btn-info">
                Submit
              </button>
            </div>
          </Row>
          {/* ))} */}
        </div>
      </>
    );
  }
}

export default Setting;
