
import React, { Component, useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";

import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";
import AuthContext from "contexts/AuthContext";

function Sidebar({ color, image, routes }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://github.com/taimoormansha"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="https://github.com/taimoormansha">
            E-NAZAM
          </a>
        </div>
       
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              if (prop.role !== 'NA') //not read NA role routes
                if (prop.role !== "Super-Admin" || (prop.role === "Super-Admin" && user?.role === "Super-Admin")) {
                  return (
                    <li
                      className={
                        prop.upgrade
                          ? "active active-pro"
                          : activeRoute(prop.layout + prop.path)
                      }
                      key={key}
                    >
                      <NavLink
                        to={prop.layout + prop.path}
                        className="nav-link"
                        activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>

                      </NavLink>
                    </li>
                  );
                }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
