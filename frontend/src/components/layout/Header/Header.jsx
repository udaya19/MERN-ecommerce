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
  return (
    <div className="header">
      <nav>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/product">Product</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            {isAuthenticated && (
              <Link href="/cart">
                <AiOutlineShoppingCart />
              </Link>
            )}
          </li>
          <li>
            <Link href="/">
              <AiOutlineSearch />
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <Link href="/">
                <AiOutlineLogout />
              </Link>
            ) : (
              <Link href="/signup">
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
