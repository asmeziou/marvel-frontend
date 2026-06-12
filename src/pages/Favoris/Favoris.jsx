import "./Favoris.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Personnage from "../Personnage/Personnage";

const Favoris = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/favoris",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(response.data); // OK
        setData(response.data); // envoi des data dans le state data
        setIsLoading(false); // on passe isLoading à false, car la data a été récupérée et stockée
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [token]);

  return (
    <main>
      <div className="wrapper">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <div>
            <h1>Liste des Favoris Personnages: </h1>

            {data.favoritesCharacters.map((element, count) => {
              return (
                <p key={element}>
                  <Link to={`/personnage/${element}`}>
                    {`Personnage ${count + 1}`}
                  </Link>
                </p>
              );
            })}
            <h1>Liste des Favoris Comics</h1>
            {data.favoritesComics.map((element, count) => {
              return (
                <p key={element}>
                  <Link to={`/personnage/${element}`}>
                    {`Comic ${count + 1}`}
                  </Link>
                </p>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favoris;
