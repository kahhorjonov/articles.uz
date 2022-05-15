import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import notificationServices from "services/notificationService";
import HomeRoutes from "homeRoutes";
import { toast } from "react-toastify";
import { getCurrentUser } from "services/authService";
import LanguageSelect from "components/Navbars/languageSelect";
import ru from "translations/ru";

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

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState();
  const [color, setColor] = useState("white");
  const sidebarToggle = useRef();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const language = localStorage.getItem("lang");

  const getNotifications = async () => {
    try {
      await notificationServices
        .getNotifications()
        .then((res) => setNotifications(res.data));
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  useEffect(() => {
    const user = getCurrentUser() && getCurrentUser().roles[0].id;
    setUser(user);

    token && getNotifications();
  }, []);

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

  useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  const handleDeleteNotification = async (id) => {
    try {
      {
        await notificationServices.deleteNotification(id);
        getNotifications();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
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
              <NavbarBrand href="/">"NDT TEAM"</NavbarBrand>
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
                <Dropdown
                  nav
                  isOpen={dropdownOpen}
                  toggle={(e) => dropdownToggle(e)}
                >
                  <DropdownToggle caret nav>
                    <i className="nc-icon nc-bell-55" />
                    <span
                      className="badge badge-info"
                      style={{
                        position: "absolute",
                        top: "3px",
                        left: "23px",
                        borderRadius: "50%",
                        padding: "0.3rem 0.6rem",
                      }}
                    >
                      {notifications.length}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu end style={{ margin: 0 }}>
                    {notifications &&
                      notifications.map((notification) => (
                        <DropdownItem
                          key={notification.id}
                          tag="a"
                          onClick={() => {
                            handleDeleteNotification(notification.id);
                          }}
                        >
                          {notification.notificationName}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
                <NavItem>
                  <Link
                    to={
                      user === 1
                        ? "/admin/user-page"
                        : user === 2
                        ? "/reductor/user-page"
                        : user === 3
                        ? "/reviewer/user-page"
                        : "/user/user-page"
                    }
                    className="nav-link btn-rotate"
                  >
                    <i className="nc-icon nc-settings-gear-65" />
                  </Link>
                </NavItem>

                <LanguageSelect />
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  } else
    return (
      <>
        <div
          className="home_pages"
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "1rem 1rem 0 0",
          }}
        >
          <LanguageSelect />
        </div>

        <div className="container home_pages p-0">
          {/* <div className="col-sm-3 col-md-2 col-lg-1 rel">
            <LanguageSelect />
          </div> */}
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

                {/* <li className="nav-item">
                  <LanguageSelect />
                </li> */}

                <li className="nav-item">
                  <Link to="/login">
                    <button className="btn border btn-light buttons">
                      {language === "ru" ? ru.nav_kirish : "Tizimga kirish"}
                    </button>
                  </Link>
                </li>

                {/* <li className="nav-item ">
                  <div className="d-flex pos">
                    <div>
                      <span className="text-muted pl-2">
                        <a href="mailto:anvark87@gmail.com">
                          anvark87@gmail.com
                        </a>
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className="text-muted pl-2 text-center">
                        <a href="tel:+998998332411">+(998) (99)-833-24-11</a>
                      </span>
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
          </nav>
          <hr className="hrr" />
        </div>
      </>
    );
}

export default Header;
