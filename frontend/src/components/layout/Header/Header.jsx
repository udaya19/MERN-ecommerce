import React from "react";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import "./Header.css";

const Header = ({ isAuthenticated = false }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(true);
  };
  return (
    <div className="header">
      <nav>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            {isAuthenticated && (
              <Link to="/cart">
                <AiOutlineShoppingCart />
              </Link>
            )}
          </li>
          <li>
            {isAuthenticated && (
              <Link to="/search">
                <AiOutlineSearch />
              </Link>
            )}
          </li>
          <li>
            {isAuthenticated ? (
              <Link to="/" onClick={handleLogout}>
                <AiOutlineLogout />
              </Link>
            ) : (
              <Link to="/signup">
                <AiOutlineLogin />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
