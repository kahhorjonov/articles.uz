import React from "react";
import NavbarHome from "./navbarHome";
import Mainpageshome from "./mainpagehome";
import Section from "./section";
import Mainhome2 from "./mainhome2";
import Foooter from "./foooter";
import Listhome from "./listhome";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <NavbarHome />

        <Mainpageshome />

        {/* gren Rrtecles */}

        <Section />

        {/* bg  */}

        <Mainhome2 />
        {/* list  */}
        <Listhome />

        {/* footer */}
        <Foooter />
      </>
    );
  }
}

export default HomePage;
