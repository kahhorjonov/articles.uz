import React from "react";

import "styles/homePage.css";

class Foooter extends React.Component {
  render() {
    return (
      <>
        <div className="footer">
          <div className="container">
            <h1>Biz bilan bog’lanish</h1>
            <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <p>Toshkent shahri, Mirzo Ulug'bek tumani, Ulug'bek shaharchasi, QORASUV 6-MAVZE, 1-UY, 55-XONA</p>
               
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Aloqa:</h5>
                <p>
                   
                  <a href="mailto:anvark87@gmail.com">anvark87@gmail.com</a>
                </p>
                <p className="pt-0">
                  <a href="tel:+9989998332411">(99) 833-24-11</a>
                 
                </p>
              </div>

              <div className="col-md-4">
                <hr className="hr1" />
                <h5>Manzil:</h5>
                <div className="d-flex">
                  <a href="https://telegram.me/Uzb1511">
                    Telegram
                  </a>
                  <a href="#" className="px-5">
                    Facebook
                  </a>
                  <a href="https://www.instagram.com/avto.intalim.uz/">Instagram</a>
                </div>
              </div>

              <div className="queres">
                <div className="row ml-0 mr-0 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0">
                  <div className="col-md-4">
                    <h1>Savollar qoldimi?</h1>
                    <a href="">
                      {/* <button type="button" className="btn btn-dark">
                        Xabar qoldirish
                      </button> */}
                    </a>
                  </div>

                  <div className="col-md-8 pr-0">
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
                  <p>© Articles.uz {new Date().getFullYear()}</p>
                </div>

                <div className="col-lg-6 endd">
                  <p className="">NDT Team</p>
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
