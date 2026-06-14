import "./Login.css";
import handleChange from "../../assets/utils/handleChange";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location =>", location.state.from);

  return !token ? (
    <main className="auth-form">
      <div className="container">
        <h1>Se connecter</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // console.log(email, password);
            try {
              const response = await axios.post(
                "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/user/login",
                {
                  email: email,
                  password: password,
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
          <p>
            Pas encore de compte ?{" "}
            <Link
              to="/signup"
              state={location.state ? { from: location.state.from } : null}
            >
              S'inscrire
            </Link>
          </p>
          <button className="btn-marvel">
            <span>Se connecter</span>
          </button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to={location.state ? location.state.from : "/"} />
  );
};

export default Login;
