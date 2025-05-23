import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaEnvelope, FaCartPlus, FaSignInAlt } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleNavbar}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </button>

      <nav className={`navbar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="navbar-brand">Mell's Shopping</div>
        <ul className="navbar-links">
          <li><a href="/home"><FaHome /> {!isCollapsed && "Home"}</a></li>
          <li><a href="/cart"><FaCartPlus /> {!isCollapsed && "Cart"}</a></li>
          <li><a href="/signin"><FaSignInAlt /> {!isCollapsed && "Sign In"}</a></li>
          <li><a href="/contact"><FaEnvelope /> {!isCollapsed && "Contact"}</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;