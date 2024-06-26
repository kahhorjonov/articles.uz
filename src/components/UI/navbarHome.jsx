import React from "react";
import { Link, NavLink } from "react-router-dom";

import "styles/homePage.css";

class NavbarHome extends React.Component {
  render() {
    return (
      <>
        <div className="container home_pages p-0">
          <div className="col-md-12 rel"></div>

          <nav className="navbar homeNavbar navbar-expand-md">
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
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/">
                    Asosiy
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/listOfMagazines">
                    Jurnallar ro'yxati
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/login">
                    Maqola yuborish
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/termsOfPublication">
                    Nashr shartlari
                  </NavLink>
                </li>
                <li className="nav-item itemss ">
                  <NavLink className="nav-link links" to="/magazines">
                    Aloqa
                  </NavLink>
                </li>

                <li className="nav-item">
                  <Link
                    to="/login"
                    // onClick={() => {
                    //   window.location = "/login";
                    // }}
                  >
                    <button className="btn border btn-light buttons">
                      Tizimga kirish
                    </button>
                  </Link>
                </li>

                <li className="nav-item ">
                  <div className="d-flex pos">
                    <div>
                      <span className="text-muted pl-2">
                        anvark87@gmail.com
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className="text-muted pl-2">
                        <a href="#">(99) 833-24-11</a>
                      </span>
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
export default React.memo(NavbarHome);
