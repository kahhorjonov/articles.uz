import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import NavbarHome from "./navbarHome";
import Asosiy from "./asosiy";
import JurnallarRoyxati from "./jurnallarRo'yhati";
import NashrShartlari from "components/UI/nashrShartlari";

import "../../styles/homePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Asosiy />
        </BrowserRouter>
      </>
    );
  }
}

export default HomePage;
