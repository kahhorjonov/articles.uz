import React, { Component } from "react";

import img from "components/profile.png";
import "../../styles/aloqa.css";

class Aloqa extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="aloqa">
          <div className="container">
            <div className="row ml-0 mr-0">
              <div className="col-lg-4">
                  <div className="d-flex">
                       <img src={img} width='100px' height='100px' alt="" />
                       <div className="ml-4 mt-4">
                        <h5>Mardonov Abdulaziz</h5>
                        <p className="p-0 m-0 text-muted">Muallif</p>
                       </div>
                  </div>
                  <div className="row ml-0 mr-0 ">
                      <button  className="btn w-100 mt-5  btn-dark d-block">
                          Maqola Yuborish
                      </button>
                  </div>
               
              </div>
              <div className="col-lg-8"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Aloqa;
