import React from "react";
import NavbarHome from "./navbarHome";
import img from "../profile.png";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../../styles/homePage.css";
import Mainpageshome from "./mainpagehome";
import Section from "./section";
import mainhome2 from "./mainhome2";
import Mainhome2 from "./mainhome2";
import Foooter from "./foooter";
import listhome from "./listhome";
import Listhome from "./listhome";

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
