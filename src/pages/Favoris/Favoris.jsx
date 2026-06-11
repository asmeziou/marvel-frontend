import "./Favoris.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
            {data.favoritesCharacters.map((element) => {
              return <p key={element}>{element}</p>;
            })}

            <h1>Liste des Favoris Comics</h1>
            {data.favoritesComics.map((element) => {
              return <p key={element}>{element}</p>;
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favoris;
