import React, { useState } from "react";
import Link from "next/link";
import NProgress from "nprogress";
import Router from "next/router";
import { isAuth, logout } from "../helpers/auth";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Layout = ({ children }) => {
  const nav = () => (
    <>
      <ul className="nav nav-tabs bg-primary variant-dark non-mobile-nav">
        <li className="nav-item">
          <Link href="/">
            <a className="nav-link text-light">Home</a>
          </Link>
        </li>
        <li className="nav-item submitLinkNav">
          <Link href="/user/link/create">
            <a className="nav-link text-light btn btn-success">Submit a Link</a>
          </Link>
        </li>
        {!isAuth() && (
          <>
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link text-light">Login</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register">
                <a className="nav-link text-light">Register</a>
              </Link>
            </li>
          </>
        )}
        {process.browser && isAuth() && isAuth().role === "admin" && (
          <li className="nav-item ms-auto">
            <Link href="/admin">
              <a className="nav-link text-light">{isAuth().name}</a>
            </Link>
          </li>
        )}
        {process.browser && isAuth() && isAuth().role === "subscriber" && (
          <li className="nav-item ms-auto">
            <Link href="/user">
              <a className="nav-link text-light">{isAuth().name}</a>
            </Link>
          </li>
        )}
        {process.browser && isAuth() && (
          <li className="nav-item">
            <a onClick={logout} className="nav-link text-light">
              Logout
            </a>
          </li>
        )}
        <li className="nav-item spinner-space"></li>
      </ul>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mobile-nav">
        <div className="container-fluid">
          <h4 className="navbar-brand">IT Learning Resources</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link text-light">Home</a>
                </Link>
              </li>
              {!isAuth() && (
                <>
                  <li className="nav-item">
                    <Link href="/login">
                      <a className="nav-link text-light">Login</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/register">
                      <a className="nav-link text-light">Register</a>
                    </Link>
                  </li>
                </>
              )}
              {process.browser && isAuth() && isAuth().role === "admin" && (
                <li className="nav-item ms-auto">
                  <Link href="/admin">
                    <a className="nav-link text-light">{isAuth().name}</a>
                  </Link>
                </li>
              )}
              {process.browser && isAuth() && isAuth().role === "subscriber" && (
                <li className="nav-item ms-auto">
                  <Link href="/user">
                    <a className="nav-link text-light">{isAuth().name}</a>
                  </Link>
                </li>
              )}
              {process.browser && isAuth() && (
                <li className="nav-item">
                  <a onClick={logout} className="nav-link text-light">
                    Logout
                  </a>
                </li>
              )}
              <li
                className="nav-item submitLinkNav"
                style={{ borderRadius: "1em" }}
              >
                <Link href="/user/link/create">
                  <a
                    className="nav-link text-light btn btn-success"
                    style={{ borderRadius: "1em", backgroundColor: "#02b488" }}
                  >
                    Submit a Link
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <React.Fragment>
      {nav()} <div className="container pt-5 pb-5">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
