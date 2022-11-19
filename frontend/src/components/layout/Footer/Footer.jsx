import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD our APP</h4>
          <p>Download our app for Android and IOS mobiles</p>
          <img src={playStore} alt="Play Store" />
          <img src={appStore} alt="App Store" />
        </div>
        <div className="midFooter">
          <h1>Ecommerce .</h1>
          <p>High quality is our first priority</p>
          <p>Copyrights 2022 &copy; Udaya Kiran</p>
        </div>
        <div className="rightFooter">
          <h4>Follow us</h4>
          <a href="/">
            <AiFillInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
