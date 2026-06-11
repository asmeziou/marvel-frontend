import { Link, useLocation } from "react-router-dom";

import Logo from "../../assets/logo.png";
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
    <header>
      <div className="wrapper">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo MARVEL" />
          </Link>
        </div>
        <div>
          {location.pathname === "/personnages" && (
            <input
              type="text"
              name="character"
              placeholder="Votre personnage..."
              id="character"
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
            />
          )}
          {location.pathname === "/comics" && (
            <input
              type="text"
              placeholder="Votre comic ..."
              name="comic"
              id="comic"
              value={comic}
              onChange={(event) => setComic(event.target.value)}
            />
          )}
        </div>
        <nav>
          <Link to="/personnages">Personnages</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favoris">Favoris</Link>

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
              Se déconnecter
            </button>
          ) : (
            <div className="auth">
              <Link to="/signup" className="auth-button">
                S'inscrire
              </Link>
              <Link to="/login" className="auth-button">
                Se connecter
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default Header;
