import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../stylesheets/photographer.css";

function Photographer() {
  const location = useLocation();
  const { data } = location.state;
  const { name, id, city, country, tagline, portrait, price } = data;
  const [mediaList, setMediaList] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    // Get photographer's media
    function getMedia() {
      const raw = require("../data/photographers.json");
      const allPhotos = raw.media;
      let selectedMedia = allPhotos.filter((medium) => medium.photographerId === id);
      return selectedMedia;
    }
    setMediaList(getMedia());

    // Total likes
    function likesCounter() {
      let counter = 0;
      getMedia().forEach((medium) => {
        counter += medium.likes;
      });
      setTotalLikes(counter);
    }
    likesCounter();
  }, [id]);

  // Modal events
  function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }

  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }

  return (
    <div className="h-full flex flex-col">
      <header>
        <Link to="/">
          <img src="assets/images/logo.png" alt="Fisheye logo" className="logo" />
        </Link>
      </header>

      <main id="main" className="flex flex-col">
        <div className="photograph-header">
          <div className="pl-4">
            <h2 className="text-[#D3573C]">{name}</h2>
            <h5 className="mb-4">{`${city}, ${country}`}</h5>
            <h6>{tagline}</h6>
          </div>
          <button className="contact_button" onClick={() => displayModal()}>
            Contactez-moi
          </button>
          <img src={`assets/photographers/photographers_ID/${portrait}`} alt={`${name}`} className="id-photog" />
        </div>

        {/* Mosaïque photo */}
        <section className="flex flex-col">
          <div className="ml-[100px] mt-5 mb-14 text-lg font-bold space-x-6">
            <span className="">Trier par</span>
            <select name="filters" id="filter-select">
              <option value="popularité">Popularité</option>
              <option value="date">Date</option>
              <option value="titre">Titre</option>
            </select>
          </div>
          <div className="photos-container">
            {mediaList.map((medium, i) => {
              let photogFirstName = name.split(" ");
              photogFirstName = photogFirstName[0];

              let contentType = medium.image ? (
                <img
                  className="min-w-full min-h-full object-cover rounded-[5px]"
                  src={`assets/photographers/${photogFirstName}/${medium.image}`}
                  alt={`${name} - ${medium.title}`}
                ></img>
              ) : (
                <video
                  className="min-w-full min-h-full object-cover rounded-[5px]"
                  controls
                  src={`assets/photographers/${photogFirstName}/${medium.video}`}
                ></video>
              );

              return (
                <div className="flex flex-col w-[350px] h-[300px]">
                  {contentType}
                  <div className="flex w-full justify-between pt-2">
                    <h5 className="max-w-[80%] flex-wrap">{medium.title}</h5>
                    <h5>{medium.likes} &#9829;</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Corner tag */}
      <div className="photog-info-tag">
        <span>{totalLikes} &#9829;</span>
        <span>{price}€ / jour</span>
      </div>

      {/* Modal */}
      <div id="contact_modal">
        <div className="modal">
          <header>
            <div>
              <h2>
                Contactez-moi
                <br />
                {name}
              </h2>
            </div>
            <img src="assets/icons/close.svg" alt="" onClick={() => closeModal()} />
          </header>
          <form>
            <div>
              <label>Prénom</label>
              <input />
              <label>Nom</label>
              <input />
              <label>Email</label>
              <input />
              <label>Votre message</label>
              <textarea rows="5" className="w-full" />
            </div>
            <button className="contact_button">Envoyer</button>
          </form>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default Photographer;
