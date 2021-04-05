import React from "react";
import { Route, Redirect } from "react-router-dom";
import { LOGGED_USER } from "../constants/localStorageKeyConstants";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem(LOGGED_USER) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
