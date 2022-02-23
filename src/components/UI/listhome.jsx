import React from "react";

import "../../styles/homePage.css";

class Listhome extends React.Component {
  render() {
    return (
      <>
        <div className="mualif container">
          <div className="row ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 ml-0 mr-0">
            <h2>
              Biz mualliflarga eng qulay ish sharoitlarini <br />
              taqdim etishga intilamiz:
            </h2>
            <ul className="list-group w-100 list-group-flush">
              <li className="list-group-item"></li>
              <li className="list-group-item">
                Ko'rib chiqish muddati (10 kun)
              </li>
              <li className="list-group-item">
                Jurnalning bosma versiyasini 20 kun ichida yuborish
              </li>
              <li className="list-group-item">Qulay narxlar</li>
              <li className="list-group-item">
                Jurnallar ilmiy bazalarda indekslanadi: Ulrichning Periodicals
                Directory, Cyberlinka, GoogleScholar
              </li>
              <li className="list-group-item"></li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
export default Listhome;
