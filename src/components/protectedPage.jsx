import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedPage = ({ path, component: Component, render, ...rest }) => {
  const resetToken = localStorage.getItem("resetToken");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!resetToken)
          return (
            <Redirect
              to={{
                pathname: "/restorePassword",
                state: { from: props.location },
              }}
            />
          );
        else {
          if (Component) {
            return <Component {...props} />;
          } else render(props);
        }
      }}
    />
  );
};

export default React.memo(ProtectedPage);
