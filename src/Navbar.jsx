import React from "react";
import "./Navbar.css";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="navbar-logo" src={logo} alt="" />
      </Link>
      <ul className="nav-links">
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/view">
          <li>View Saved Stocks</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
