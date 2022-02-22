import React from "react";
import { Route, Switch } from "react-router-dom";
import NavbarHome from "./navbarHome";
import Asosiy from "./asosiy";
import JurnallarRoyxati from "./jurnallarRo'yhati";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <NavbarHome />
        <Switch>
          <Route
            path="/main"
            // exact
            component={(props) => <Asosiy {...props} />}
          />
          <Route
            path="/listOfMagazines"
            // exact
            component={(props) => <JurnallarRoyxati {...props} />}
          />
        </Switch>
      </>
    );
  }
}

export default HomePage;
