import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

import routes from "routes";
import HomeRoutes from "homeRoutes";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "NDT TEAM";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  // console.log(window.location.pathname.slice(0, 9));

  if (
    window.location.pathname.slice(0, 6) === "/admin" ||
    window.location.pathname.slice(0, 9) === "/reductor" ||
    window.location.pathname.slice(0, 9) === "/reviewer" ||
    window.location.pathname.slice(0, 5) === "/user"
  ) {
    return (
      <>
        <Navbar
          color={
            props.location &&
            props.location.pathname.indexOf("full-screen-maps") !== -1
              ? "dark"
              : color
          }
          expand="lg"
          className={
            props.location &&
            props.location.pathname.indexOf("full-screen-maps") !== -1
              ? "navbar-absolute fixed-top"
              : "navbar-absolute fixed-top " +
                (color === "transparent" ? "navbar-transparent " : "")
          }
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button
                  type="button"
                  ref={sidebarToggle}
                  className="navbar-toggler"
                  onClick={() => openSidebar()}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/">{getBrand()}</NavbarBrand>
            </div>
            <NavbarToggler onClick={toggle}>
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar className="justify-content-end">
              <form>
                <InputGroup className="no-border">
                  <Input placeholder="Search..." />
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroup>
              </form>
              <Nav navbar>
                <NavItem>
                  <Link to="" className="nav-link btn-magnify">
                    <i className="nc-icon nc-layout-11" />
                    <p>
                      <span className="d-lg-none d-md-block">Stats</span>
                    </p>
                  </Link>
                </NavItem>
                <Dropdown
                  nav
                  isOpen={dropdownOpen}
                  toggle={(e) => dropdownToggle(e)}
                >
                  <DropdownToggle caret nav>
                    <i className="nc-icon nc-bell-55" />
                    <p>
                      <span className="d-lg-none d-md-block">Some Actions</span>
                    </p>
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem tag="a">Action</DropdownItem>
                    <DropdownItem tag="a">Another Action</DropdownItem>
                    <DropdownItem tag="a">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <Link to="" className="nav-link btn-rotate">
                    <i className="nc-icon nc-settings-gear-65" />
                    <p>
                      <span className="d-lg-none d-md-block">Account</span>
                    </p>
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else
    return (
      <>
        <div className="container home_pages p-0">
          <div className="col-md-12 rel"></div>
          <nav className="navbar navbar-expand-md mb-0">
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
                {HomeRoutes.map((route, key) => {
                  return (
                    <li key={key} className="nav-item itemss ">
                      <NavLink className="nav-link links" to={route.path}>
                        {route.name}
                      </NavLink>
                    </li>
                  );
                })}

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
                      <span className="text-muted pl-2">
                        ost.info10@gmail.com
                      </span>
                    </div>
                    <div className="ml-4">
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

export default Header;
