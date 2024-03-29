import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/sign-in",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
