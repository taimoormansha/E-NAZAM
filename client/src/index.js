
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "./layouts/Admin.js";
import AuthProvider from "contexts/AuthState";

import AppRoute from "./routes/AppRoute";

//Import Components
import routes from "./routes/rotues";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        {/*  <Route path="/auth/user" render={(props) => <Verify {...props} />} />
        <Route path="/auth/signup" render={(props) => <SignUp {...props} />} />
        <Route path="/auth/signin" render={(props) => <SignIn {...props} />} /> */}

        {routes.map((route, idx) => (
            <AppRoute
                path={route.path}
                component={route.component}
                key={idx}
                exact
            />
        ))}

        <Redirect from="/" to="/admin/dashboard" />
        
      </Switch>
    </BrowserRouter>
  </AuthProvider>
);
