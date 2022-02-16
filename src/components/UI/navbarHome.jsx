import React from "react";
import { NavLink, Link } from "react-router-dom";

import "../../styles/homePage.css";

class NavbarHome extends React.Component {
  render() {
    return (
      <>
        <div className="container home_pages p-0">
          <div className="col-md-12 rel"></div>

          <nav className="navbar navbar-expand-md">
            <NavLink className="navbar-brand brands" to="/">
              <h1 className="text-dark mb-0">ARTICLES.UZ</h1>
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapsibleNavbar"
            >
              <i className="nc-icon nc-bullet-list-67" />
              {/* <FontAwesomeIcon
                icon={faAlignRight}
                style={({ color: "#C0F6F7" }, { fontSize: "20px" })}
              /> */}
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/main">
                    Asosiy
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/magazines">
                    Jurnallar ro'yxati
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/magazines">
                    Maqola yuborish
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/magazines">
                    Nashr shartlari
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/magazines">
                    Aloqa
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Link to="/login">
                    <button className="btn border btn-light buttons">
                      Tizimga kirish
                    </button>
                  </Link>
                </li>

                <li className="nav-item ">
                  <div className="d-flex pos">
                    <div>
                      {/* <FontAwesomeIcon
                        icon={faEnvelope}
                        style={({ color: "#4f4f4f" }, { fontSize: "16px" })}
                        className="sms"
                      /> */}
                      <span className="text-muted pl-2">
                        ost.info10@gmail.com
                      </span>
                    </div>
                    <div className="ml-4">
                      {/* <FontAwesomeIcon
                        icon={faPhone}
                        style={({ color: "white" }, { fontSize: "16px" })}
                        className="phone"
                      /> */}
                      <span className="text-muted pl-2">(71) 224-20-30</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <hr className="hrr" />
        </div>
      </>
    );
  }
}
export default NavbarHome;
