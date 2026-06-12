import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { MdOutlineFavoriteBorder } from "react-icons/md";

import Pagination from "../../components/Pagination/Pagination";

import "./Personnages.css";

const Personnages = ({ name, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const addCharacterFavori = async (character_id) => {
    if (!token) {
      navigate("/signup");
    }
    try {
      const response = await axios.post(
        "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/favoris/character/add",
        {
          token: token,
          character_id,
        },
      );
      alert("Ajouté aux favoris ❤️");
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
              page={page}
            />
            <section className="container-marvel">
              {data.results.map((element) => {
                return (
                  <article key={element._id}>
                    <div>
                      <Link to={`/personnage/${element._id}`}>
                        <img
                          src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                          alt={element.name}
                        />
                      </Link>
                    </div>
                    <div className="infos">
                      <p>{element.name}</p>

                      <p>{element.description.slice(0, 100) + "..."}</p>
                    </div>

                    <div
                      onClick={() => addCharacterFavori(element._id)}
                      className="favoris"
                    >
                      <MdOutlineFavoriteBorder />
                    </div>
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
