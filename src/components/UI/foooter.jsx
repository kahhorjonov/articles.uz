import React from "react";

import "../../styles/homePage.css";

class Foooter extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="container p-0">
            <h1>Biz bilan bog’lanish</h1>
            <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <p>Toshkent sh., Yunusobod t. 4-10-20</p>
                <p className="pt-0">10001010</p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Aloqa:</h5>
                <p>ost.info10@gmail.com</p>
                <p className="pt-0">(71) 224-20-30</p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <div className="d-classNameflex">
                  <a href="">Telegram</a>
                  <a href="" className="px-5">
                    Facebook
                  </a>
                  <a href="">Instagram</a>
                </div>
              </div>

              <div className="queres">
                <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
                  <div className="col-md-4">
                    <h1>Savollar qoldimi?</h1>
                    <a href="">
                      <button type="button" className="btn btn-dark">
                        Xabar qoldirish
                      </button>
                    </a>
                  </div>

                  <div className="col-md-8">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Asosiy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Jurnallar ro’yxati
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Nashr shartlari
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Biz bilan bog’lanish
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="">
                          Tizimga kirish
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hr2">
                <hr />
              </div>

              <div className="foo_nex justify-content-between row">
                <div className="yerss col-lg-6">
                  <p>© Articles.uz 2020</p>
                </div>

                <div className="col-lg-6 endd">
                  <p className="">OST Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Foooter;
