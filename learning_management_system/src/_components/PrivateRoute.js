import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationService } from "../_services/authentication.service";

export const PrivateRoute = ({
  component: Component,
  roles,
  user,
  ...rest
}) => {
  const currentUser = authenticationService.currentUserValue;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }
        console.log("let me redirect you now");
        // authorised so return component
        return <Component user={user} {...props} />;
      }}
    />
  );
};
