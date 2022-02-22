import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavbarHome from "./navbarHome";
import Asosiy from "./asosiy";
import JurnallarRoyxati from "./jurnallarRo'yhati";
import NashrShartlari from "components/UI/nashrShartlari";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";

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

            <Route
              path="/termsOfPublication"
              // exact
              component={(props) => <NashrShartlari {...props} />}
            />
          </Switch>
        </>
      </BrowserRouter>
    );
  }
}

export default HomePage;
