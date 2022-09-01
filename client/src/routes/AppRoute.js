import AuthContext from "contexts/AuthContext";
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({ component: Component, isAuthProtected, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) return <Redirect to="/admin/dashboard" />;

        return <Component {...props} />;
      }}
    />
  );
};

export default AppRoute;
