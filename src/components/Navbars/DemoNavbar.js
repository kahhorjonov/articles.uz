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

import HomeRoutes from "homeRoutes";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("white");
  const sidebarToggle = React.useRef();
  const location = useLocation();

  const toggle = () => {
    if (isOpen) {
      setColor("white");
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
      setColor("white");
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

  if (
    window.location.pathname.slice(0, 6) === "/admin" ||
    window.location.pathname.slice(0, 9) === "/reductor" ||
    window.location.pathname.slice(0, 9) === "/reviewer" ||
    window.location.pathname.slice(0, 5) === "/user"
  ) {


    
    return (
      <>
        <Navbar
          color="white"
          // style={{ color: "#616161" }}
          // color={
          //   props.location &&
          //   props.location.pathname.indexOf("full-screen-maps") !== -1
          //     ? "dark"
          //     : color
          // }
          expand="lg"
          className={
            props.location &&
            props.location.pathname.indexOf("full-screen-maps") !== -1
              ? "navbar-absolute fixed-top"
              : "navbar-absolute fixed-top "
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
              <NavbarBrand href="/">{"NDT TEAM"}</NavbarBrand>
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
                  {/* <InputGroupAddon addonType="append"> */}
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                  {/* </InputGroupAddon> */}
                </InputGroup>
              </form>
              <Nav navbar>
                {/* <NavItem>
                  <Link to="" className="nav-link btn-magnify">
                    <i className="nc-icon nc-layout-11" />
                    <p>
                      <span className="d-lg-none d-md-block">Stats</span>
                    </p>
                  </Link>
                </NavItem> */}
                <Dropdown
                  nav
                  isOpen={dropdownOpen}
                  toggle={(e) => dropdownToggle(e)}
                >
                  <DropdownToggle caret nav>
                    <i className="nc-icon nc-bell-55" />
                    <span className="badge badge-info"
                    
                    style={{position: 'absolute', top: '3px', left: '23px', borderRadius: '50%', padding: '3px'}}
                    >12</span>
                    {/* <p>
                      <span className="d-lg-none d-md-block">Some Actions</span>
                    </p> */}
                  </DropdownToggle>
                  <DropdownMenu end style={{ margin: 0 }}>
                    <DropdownItem tag="a">Action </DropdownItem>
                    <DropdownItem tag="a">Another Action</DropdownItem>
                    <DropdownItem tag="a">Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <Link to="" className="nav-link btn-rotate">
                    <i className="nc-icon nc-settings-gear-65" />
                    {/* <p>
                      <span className="d-lg-none d-md-block">Account</span>
                    </p> */}
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
              <h1
                style={{ fontSize: "2.5rem", margin: "1rem" }}
                className="text-dark "
              >
                ARTICLES.UZ
              </h1>
            </NavLink>

            <button
              style={{ fontSize: "2.5rem", margin: "1rem" }}
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
