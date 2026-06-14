import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import "./Personnage.css";

const Personnage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--exo-marvel-bakend--qzq5cmkqjv9w.code.run/comics/${characterId}`,
        );
        console.log(response.data); // OK
        setData(response.data); // envoi des data dans le state data
        setIsLoading(false); // on passe isLoading à false, car la data a été récupérée et stockée
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <main className="main-personnage">
      <div className="wrapper">
        {isLoading ? (
          <span>
            <Audio
              height="80"
              width="80"
              color="#ed1d24"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </span>
        ) : (
          <div className="container-personnage">
            <div>
              <img
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt={data.name}
              />
              <p>{data.description}</p>
            </div>

            <div className="personnages-commics">
              <h1>{data.name}</h1>
              <section>
                {data.comics.map((comic) => (
                  <div key={comic._id}>
                    <p>{comic.title}</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Personnage;
