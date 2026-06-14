import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../../assets/logo-footer.png";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container wrapper">
        <div className="footer-top">
          <div>
            <img src={Logo} alt="Logo Marvel"></img>
          </div>
          <div>
            <ul className="footer-menu-1">
              <li>About Marvel</li>
              <li>Help/FAQs</li>
              <li>Careers</li>
              <li>Internships</li>
            </ul>
          </div>
          <div>
            <ul className="footer-menu-2">
              <li>Advertising</li>
              <li>Disney+</li>
              <li>Marvelhq.com</li>
              <li>Redeem Digital Comics</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Interest-Based Ads</li>
            <li>EU Privacy Rights</li>
            <li>Cookie Policy</li>
            <li>License Agreement</li>
            <li>Manage Privacy Preferences</li>
            <li>©2026 MARVEL</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
