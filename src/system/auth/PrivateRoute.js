import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

const PrivateRoute = ({ Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated ? (
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
