import React, { Component } from "react";
import { axios } from "axios";
import img from "../../components/profile.png";
import { Link } from 'react-router-dom';


class Jurnallar extends Component {
  state = {
    jurnallar: [],
  };




  componentDidMount = () => {
    try {
      axios.get("");
    } catch (erorr) {}
  };

  render() {
    return (
      <>
        <div className="content">
          <div className="row mx-0">
            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top" src={img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a href="#" className="btn btn-primary">
                    See Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top" src={img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <Link to='#   ' className="btn btn-primary">
                 Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4" >
              <div className="card">
                <img className="card-img-top" src={img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a href="#" className="btn btn-primary">
                    See Profile
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top" src={img} alt="Card image" />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <p className="card-text">Some example text.</p>
                  <a href="#" className="btn btn-primary">
                    See Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Jurnallar;
