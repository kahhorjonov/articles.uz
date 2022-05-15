import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Switch, useLocation } from "react-router-dom";

import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar.js";
import ProtectedRoute from "components/protectedRoute";

import adminRoutes from "routes/routes";

function Dashboard(props) {
  let ps;

  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={adminRoutes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <Switch>
          {adminRoutes.map((prop, key) => {
            return (
              <ProtectedRoute
                path={prop.layout + prop.path}
                // render={(props) => <prop.component {...props} />}
                component={prop.component}
                key={key}
              />
            );
          })}
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
}

export default Dashboard;
