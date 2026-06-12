import { Link, useLocation } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import Logo from "../../assets/logo.png";
import Swiperhome from "../Swiperhome/Swiperhome";
import "./Header.css";
const Header = ({
  character,
  setCharacter,
  comic,
  setComic,
  token,
  setToken,
}) => {
  const location = useLocation();
  return (
    <header className="header-main">
      <div className="header-main-top">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo MARVEL" />
          </Link>
        </div>

        {location.pathname === "/personnages" && (
          <div className="searchtext">
            <input
              type="text"
              name="character"
              placeholder="Votre personnage..."
              id="character"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
            />
          </div>
        )}
        {location.pathname === "/comics" && (
          <div className="searchtext">
            <input
              type="text"
              placeholder="Votre comic ..."
              name="comic"
              id="comic"
              value={comic}
              onChange={(event) => setComic(event.target.value)}
            />{" "}
          </div>
        )}

        <div className="header-user-account">
          <a href="/">
            <MdHome /> Home
          </a>
          {token ? (
            <button
              className="deco-button"
              onClick={() => {
                // retirer le token du state
                setToken(null);
                // retirer le token des cookies
                Cookies.remove("vinted-auth-cookie");
              }}
            >
              Déconnection
            </button>
          ) : (
            <div className="auth">
              {/* <Link to="/signup" className="auth-button">
                S'inscrire
              </Link> */}
              <Link to="/login" className="auth-button">
                <VscAccount /> Connexion
              </Link>
            </div>
          )}
        </div>
      </div>
      <nav className="header-main-bottom ">
        <ul>
          <li>
            <Link to="/personnages">Personnages</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/favoris">Favoris</Link>
          </li>
        </ul>
        <div className="fond-home">
          <Swiperhome />;
        </div>
      </nav>
    </header>
  );
};
export default Header;
