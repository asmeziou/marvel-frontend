import "./Home.css";
import fondavert from "../../assets/avertissement.jpg";
import fondactus from "../../assets/pub.webp";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";

const Home = () => {
  return (
    <main className="home">
      <section className="section-home-avertissement">
        <article className="home-avertissement wrapper">
          <div className="home-follow-marvel">
            <span>
              <CiFacebook />
            </span>
            <span>
              <CiInstagram />
            </span>
            <span>
              <CiYoutube />
            </span>
          </div>
          <img src={fondavert} alt="image avertissement" />
        </article>
      </section>

      <section className="section-home-marvel">
        <article className="home-marvel wrapper">
          <div>
            <img src={fondactus} alt="image Actualités" />
          </div>
          <div className="home-marvel-description">
            <h2>Marvel Unlimited</h2>
            <h3>Unlock the Universe</h3>
            <p>
              Get instant access to 30,000+ digital comics on the web mobile
              devices, exclusive deals, and more member-only benefits with
              Marvel Unlimited!
            </p>
            <div>
              <button className="btn-marvel">
                <span>Get Marvel Unlimited</span>
              </button>
            </div>
            <p>
              Auto-renewal and other terms apply. See marvel.com/unlimited for
              additional details.
            </p>
          </div>
        </article>
        <article></article>
      </section>
    </main>
  );
};

export default Home;
