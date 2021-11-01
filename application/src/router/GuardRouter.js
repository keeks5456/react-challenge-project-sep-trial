import React from "react";
import { Route, Redirect } from "react-router";
import { useSelector } from "react-redux";

export const GuardRouter = ({ component: Component, ...rest }) => {
  const userToken = useSelector((state) => state.auth.token);

  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          userToken ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </div>
  );
};

