import React, { Component } from "react";
import { CardBody, Col, Input, Label, Row } from "reactstrap";
import axios from "axios";

class Setting extends Component {
  state = {
    getPrice: [],
    jurnalNarxi: "",
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
          this.setState({ getPrise: res.data });
        });
    } catch (error) {
      console.log(error);
    }
  };


  handleChange = (e) => {
    // this.setState({[e.target.name]: })
  }

  render() {
    const { getPrice } = this.state;

    return (
      <>
        <div className="content">
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
                  onChange={(e) =>
                    this.setState({ jurnalNarxi: e.target.value })
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
                <input type="text" className="form-control" id="usr" />
              </div>
            </div>
            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">doi:</label>
                <input type="text" className="form-control" id="usr" />
              </div>
            </div>
            <div id="demo" className="col-lg-2 collapse">
              <div className="d-flex algin-items-center">
                <label className="pr-2">Sahifa Narhi:</label>
                <input type="text" className="form-control" id="usr" />
              </div>
            </div>

            <div id="demo" className="col-lg-2 collapse">
              <button className="btn btn-info">Submit</button>
            </div>
          </Row>
        </div>
      </>
    );
  }
}

export default Setting;
