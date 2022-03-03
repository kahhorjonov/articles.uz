import React, { Component } from "react";
import Jurnallar from "./jurnallar";

class AdminJurnallar extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3>Barcha maqolalar</h3>
                </div>
                <div className="card-body">
                  <Jurnallar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminJurnallar;
