import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser() && auth.getCurrentUser().roles[0];

  return (
    <Route
      {...rest}
      render={(props) => {
        const userPath = props.location.pathname.split("/")[1];

        if (!user)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        else {
          if (Component) {
            if (user.id === 1 && userPath === "admin")
              return <Component {...props} />;

            if (user.id === 2 && userPath === "reductor")
              return <Component {...props} />;

            if (user.id === 3 && userPath === "reviewer")
              return <Component {...props} />;

            if (user.id === 4 && userPath === "user")
              return <Component {...props} />;
          } else render(props);
        }
      }}
    />
  );
};

export default ProtectedRoute;
