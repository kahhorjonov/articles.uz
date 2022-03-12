import React, { Component } from "react";
import { CardBody, Col, Input, Label, Row } from "reactstrap";

class Setting extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content">
          <Row>
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
                <label for="usr">Name:</label>
                <input type="text" class="form-control" id="usr" />
              </div>
              <div id="demo" className="col-lg-2 collapse">
                <label for="usr">Name:</label>
                <input type="text" class="form-control" id="usr" />
              </div>
              <div id="demo" className="col-lg-2 collapse">
                <label for="usr">Name:</label>
                <input type="text" class="form-control" id="usr" />
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
