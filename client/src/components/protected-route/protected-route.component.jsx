import React from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../../utils/auth";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  admin,
  customer,
  ...otherProps
}) => {
  return (
    <Route
      {...otherProps}
      render={props => {
        if (admin) {
          if (!auth.getCurrentAdmin())
            return (
              <React.Fragment>
                <Redirect
                  to={{
                    pathname: "/admin/login",
                    state: { from: props.location }
                  }}
                />
              </React.Fragment>
            );
        }

        if (customer) {
          if (!auth.getCurrentCustomer())
            return (
              <React.Fragment>
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: props.location }
                  }}
                />
              </React.Fragment>
            );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
