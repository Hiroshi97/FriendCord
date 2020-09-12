import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthRoute({component: Component, isLoggedIn, ...rest}) {
  return (
    <Route {...rest}
    render={(props) => isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

AuthRoute.propTypes = {
  component: PropTypes.elementType,
  isLoggedIn: PropTypes.bool,
  location: PropTypes.object
};