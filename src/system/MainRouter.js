import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Home from "../modules/home/Home";
import User from "../modules/user/User";
import SignUp from "../modules/sign-up/SignUp";
import SignIn from "../modules/sign-in/SignIn";
import Profile from "../modules/profile/Profile";
import EditProfile from "../modules/profile/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import auth from "./auth/auth-helper";

import { useGetUserInfo } from "./api/user";

const MainRouter = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    auth.isAuthenticated()
  );
  const { refetch } = useGetUserInfo();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated]);

  return (
    <Switch>
      {!isAuthenticated && <Route exact path="/" component={Home} />}

      {isAuthenticated && <Route exact path="/" component={User} />}
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />

      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/user/profile/:userId"
        Component={Profile}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/user/edit/:userId"
        Component={EditProfile}
      />
    </Switch>
  );
};

export default MainRouter;
