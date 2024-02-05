import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as routes from '../Constants/routes';
import * as userAction from '../Actions/userAction';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAction.Logout());
  }, [dispatch]);

  return <Redirect to={routes.HOME} />;
};

export default Logout;
