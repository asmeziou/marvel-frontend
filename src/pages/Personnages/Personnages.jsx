import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

import "./Personnages.css";

const Personnages = ({ name, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const addCharacterFavori = async (character_id) => {
    try {
      const response = await axios.post(
        "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/favoris/character/add",
        {
          token: token,
          character_id,
        },
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const limit = 100;
  const pagesTab = [];
  let pageNumber = 1;
  if (data) {
    for (let i = 1; i < data.count; i = i + limit) {
      pagesTab.push(pageNumber);
      pageNumber++;
    }
  }

  let filters = `limit=${limit}&page=${page}`;
  if (name) {
    filters += `&name=${name}`;
  }

  useEffect(() => {
    setPage(1);
  }, [name]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/characters?${filters}`,
        );
        console.log(response.data); // OK
        setData(response.data); // envoi des data dans le state data
        setIsLoading(false); // on passe isLoading à false, car la data a été récupérée et stockée
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, name]);

  return (
    <main>
      <div className="wrapper">
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <Pagination
              setPage={setPage}
              limit={limit}
              pagesTab={pagesTab}
              data={data}
            />
            <section className="container-personnages">
              {data.results.map((element) => {
                return (
                  <article key={element._id}>
                    <Link to={`/personnage/${element._id}`}>
                      <img
                        src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                        alt={element.name}
                      />
                      <div>{element.name}</div>
                      <div>
                        <p>{element.description}</p>
                      </div>
                    </Link>
                    <button onClick={() => addCharacterFavori(element._id)}>
                      Ajouter aux favoris
                    </button>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </div>
    </main>
  );
};
export default Personnages;
