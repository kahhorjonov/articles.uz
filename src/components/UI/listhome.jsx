import React from "react";
import ru from "translations/ru";

import "styles/homePage.css";

class Listhome extends React.Component {
  state = {
    lang: "",
  };

  componentDidMount() {
    const lang = localStorage.getItem("lang");
    this.setState({ lang: lang });
  }

  render() {
    return (
      <>
        <div className="mualif container">
          <div className="row ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 mr-md-0 ml-md-0 ml-0 mr-0">
            <h2 className="col-sm-6 col-md-6 col-lg-6">
              {this.state.lang === "ru"
                ? ru.main_maqsadimiz3
                : "Biz mualliflarga eng qulay ish sharoitlarini taqdim etishga intilamiz:"}
            </h2>
            <ul className="list-group w-100 list-group-flush">
              <li className="list-group-item"></li>
              <li className="list-group-item">
                {this.state.lang === "ru"
                  ? ru.main_tekshirish
                  : "main_tekshirish"}
              </li>
              <li className="list-group-item">
                {this.state.lang === "ru"
                  ? ru.main_jonatish
                  : "Jurnalning bosma versiyasini 20 kun ichida yuborish"}
              </li>
              <li className="list-group-item">
                {this.state.lang === "ru" ? ru.main_narxlar : "Qulay narxlar"}
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
