import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import socket from './socket';

import Home from '../modules/home/Home';
import User from '../modules/user/User';
import SignUp from '../modules/sign-up/SignUp';
import SignIn from '../modules/sign-in/SignIn';
import Profile from '../modules/profile/Profile';
import EditProfile from '../modules/profile/EditProfile';
import PrivateRoute from './auth/PrivateRoute';
import auth from './auth/auth-helper';

import * as actions from './store/auth/auth.actions';

export const history = createBrowserHistory();

const MainRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((store) => get(store, 'authReducer'));

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      const following = get(userInfo, 'following');
      const userId = get(userInfo, '_id');
      socket.emit('join-room', { userId });

      socket.on('connect', () => {
        console.log('On Connect');
        socket.emit('join-room', { userId });
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      dispatch(actions.fetchUserInfoStart());
    }
  }, [location, auth]);

  return (
    <Switch>
      {!auth.isAuthenticated() && <Route exact path='/' component={Home} />}

      {auth.isAuthenticated() && <Route exact path='/' component={User} />}
      <Route path='/sign-up' component={SignUp} />
      <Route path='/sign-in' component={SignIn} />

      <PrivateRoute path='/user/profile/:userId' Component={Profile} />
      <PrivateRoute path='/user/edit/:userId' Component={EditProfile} />
    </Switch>
  );
};

export default MainRouter;
