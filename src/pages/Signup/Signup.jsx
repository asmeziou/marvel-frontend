import "./Signup.css";
import { useState } from "react";
import handleChange from "../../assets/utils/handleChange";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return token ? (
    <Navigate to={location.state ? location.state.from : "/"} />
  ) : (
    <main className="auth-form">
      <div className="container">
        <h1>S'incrire</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // console.log(username, email, password);
            try {
              const response = await axios.post(
                "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                  newsletter: true,
                },
              );

              // il, va falloir un state pour y stocker le token
              setToken(response.data.token);
              // il va falloir envoyer le token dans les cookies
              Cookies.set("marvel-auth-cookie", response.data.token);
              // il va falloir rediriger notre utilisateur vers la page Home ou une autre page le cas échéant :
              location.state ? navigate(location.state.from) : navigate("/");
            } catch (error) {
              console.log(error.message);
            }
          }}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              handleChange(event, setUsername);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
          />
          <div className="newsletter">
            <input type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            Déjà un compte ?
            <Link
              to="/login"
              state={location.state ? { from: location.state.from } : null}
            >
              Se connecter
            </Link>
          </p>
          <button className="btn-marvel">
            <span>S'inscrire</span>
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
