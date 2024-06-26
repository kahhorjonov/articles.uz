import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "../../logo.svg";
// import AticleLogo from "assets/img/Logo 3.png";
import ArticlesLogo from "assets/img/Logo 5.png";

function Sidebar(props) {
  let ps;

  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="logo-img"
        >
          <img
            style={{ maxWidth: "50%" }}
            src={ArticlesLogo}
            alt="react-logo"
          />
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              // <li
              //   className={
              //     activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
              //   }
              //   key={key}
              // >
              //   <NavLink
              //     to={prop.layout + prop.path}
              //     className="nav-link"
              //     activeClassName="active"
              //   >
              //     <i className={prop.icon.toString()} />
              //     <p>{prop.name}</p>
              //   </NavLink>
              // </li>

              <li
                style={{ display: prop.visible ? "auto" : "none" }}
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon.toString()} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
