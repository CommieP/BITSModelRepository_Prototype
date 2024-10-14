import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to check if a page is active
  const isActive = (path) => {
    // Set "About" as active if the current path is "/" or "/about"
    return location.pathname === path || (path === "/about" && location.pathname === "/")
      ? "active"
      : "";
  };

  const handleLinkClick = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

  return (
    <div className="navBar">
      <div className="navBarBranding">
        <div className="navBarLogoCont"></div>
        <div className="navBarLogoText">BITS Design 3D Model Repository</div>
      </div>
      
      <button className="hamburgerButton" onClick={toggleMenu}>
        &#9776;
      </button>
      
      <div className={`navBarButtonsCont ${menuOpen ? "open" : ""}`}>
        <Link to="/about" className={`navBarButton ${isActive("/about")}`} onClick={handleLinkClick}>
          About
        </Link>
        <Link to="/gallery" className={`navBarButton ${isActive("/gallery")}`} onClick={handleLinkClick}>
          Gallery
        </Link>
        <Link to="/login" className={`navBarButton ${isActive("/login")}`} onClick={handleLinkClick}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
