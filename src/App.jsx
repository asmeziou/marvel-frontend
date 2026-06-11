import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Personnages from "./pages/Personnages/Personnages";
import Comics from "./pages/Comics/Comics";
import Favoris from "./pages/Favoris/Favoris";
import Personnage from "./pages/Personnage/Personnage";
import Signup from "./pages/Signup/Signup";
import Login from "./Login/Login";

const App = () => {
  const [character, setCharacter] = useState();
  const [comic, setComic] = useState();
  const [token, setToken] = useState(Cookies.get("marvel-auth-cookie") || null);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        character={character}
        setCharacter={setCharacter}
        comic={comic}
        setComic={setComic}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/personnages"
          element={<Personnages name={character} token={token} />}
        />
        <Route
          path="/comics"
          element={<Comics title={comic} token={token} />}
        />
        <Route path="/personnage/:characterId" element={<Personnage />} />
        <Route path="/favoris" element={<Favoris token={token} />} />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
