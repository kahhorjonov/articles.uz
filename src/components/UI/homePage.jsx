import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarHome from "./navbarHome";
import Asosiy from "./asosiy";
import JurnallarRoyxati from "./jurnallarRo'yhati";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";
import BrowserRouter from "react-router-dom/BrowserRouter";

class HomePage extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <NavbarHome />

          <Switch>
            <Route
              path="/"
              exact
              component={(props) => <Asosiy {...props} />}
            />

            <Route
              path="/listOfMagazines"
              // exact
              component={(props) => <JurnallarRoyxati {...props} />}
            />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default HomePage;
