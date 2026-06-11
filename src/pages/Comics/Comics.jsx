import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import "./comics.css";
const Comics = ({ title, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const addComicFavori = async (comic_id) => {
    try {
      const response = await axios.post(
        "https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/favoris/comic/add",
        {
          token: token,
          comic_id,
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
  if (title) {
    filters += `&title=${title}`;
  }

  useEffect(() => {
    setPage(1);
  }, [title]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/comics?${filters}`,
        );
        console.log(response.data); // OK
        setData(response.data); // envoi des data dans le state data
        setIsLoading(false); // on passe isLoading à false, car la data a été récupérée et stockée
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, title]);

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
            <section className="container-comics">
              {data.results.map((element) => {
                return (
                  <article key={element._id}>
                    <Link to="">
                      <img
                        src={
                          element.thumbnail.path +
                          "." +
                          element.thumbnail.extension
                        }
                        alt="image personnage"
                      />
                      <div>{element.title}</div>
                      <div>
                        <p>{element.description}</p>
                      </div>
                    </Link>
                    <button onClick={() => addComicFavori(element._id)}>
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

export default Comics;
