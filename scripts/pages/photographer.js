import { photographerTemplate } from "../templates/photographer.js";
import { MediaFactory } from "../utils/mediaFactory.js"; // Assurez-vous que MediaFactory est bien importé depuis son fichier
import { closeModal, displayModal } from "../utils/contactForm.js";
import { createLightbox, lightbox } from "../utils/lightBox.js";

// Fonction pour générer les médias à partir de la MediaFactory
export function mediaTemplate(data) {
  const media = MediaFactory.createMedia(data);
  return media.getMediaDOM(); // Retourne le DOM du média (image ou vidéo)
}

function closeBtn() {
  document.querySelector(".close").addEventListener("click", () => {
    closeModal();
  });
}

function openModal() {
  document.querySelector(".contact_button").addEventListener("click", () => {
    displayModal();
  });
}

/**
 * Mettre le code JavaScript lié à la page photographer.html
 * @param {number} id
 * @returns
 */
async function getPhotographers(id) {
  // On recherche le fichier JSON
  const url = "data/photographers.json";

  // On demande d'attendre la reponse
  const response = await fetch(url);
  // On récupère les datas
  const data = await response.json();
  // On récupère les photographes
  const { photographers } = data;
  // On filtre les photographes correspondant à l'id recherché
  const photographer = photographers.find(
    (photographer) => photographer.id === id
  );

  return {
    photographer: photographer,
  };
}

/**
 * Displays the photographer's data on the webpage.
 *
 * @param {object} photographer - The photographer's data to be displayed.
 * @return {void}
 */
async function displayData(photographer) {
  const photographersSection = document.querySelector(".photograph_header");

  // Afficher les informations du photographe dans la page
  const photographerModel = photographerTemplate(photographer);
  const { photographInfo, idPhoto } = photographerModel.getUserCardSolo();

  // Create contact button
  const contactButton = document.createElement("button");
  contactButton.className = "contact_button";
  contactButton.textContent = "Contactez-moi";
  const addNameOnTitle = document.createElement("h2");
  addNameOnTitle.textContent = `Contactez-moi ${photographer.name}`;
  document.querySelector(".contact_title").appendChild(addNameOnTitle);

  // Ajouter la carte du photographe à la page
  photographersSection.appendChild(photographInfo);
  photographersSection.appendChild(contactButton);
  photographersSection.appendChild(idPhoto);

  // Ajout de l'information du prix du photographe
  const bottomSection = document.querySelector(".bottom_info");

  const totalPrice = document.createElement("div");
  totalPrice.className = "total_price";
  totalPrice.textContent = `${photographer.price}€/jour`;
  bottomSection.appendChild(totalPrice);
}

/**
 * Retrieves media data from a JSON file based on a given photographer ID.
 *
 * @param {number} id - The ID of the photographer.
 * @return {Object} An object containing an array of media objects associated with the photographer.
 */
async function getMedias(id) {
  // On recherche le fichier JSON
  const url = "data/photographers.json";
  // On demande d'attendre la reponse
  const response = await fetch(url);
  // On récupère les datas
  const data = await response.json();
  // On récupère les medias
  const { media } = data;
  // On filtre les medias correspondant à l'id recherché
  const medias = media.filter((media) => media.photographerId === id);
  return {
    medias: medias,
  };
}

/**
 * Displays the media data in the gallery section of the page.
 *
 * @param {Object[]} medias - An array of media objects to be displayed.
 * @return {void}
 */
async function displayMediasData(medias) {
  const mediaSection = document.querySelector(".gallery");

  // Initialise le total des likes
  let totalLikes = 0;

  // Afficher les médias
  medias.forEach((media) => {
    const mediaDOM = mediaTemplate(media);
    mediaSection.appendChild(mediaDOM);

    // Mettre à jour le total des likes initial
    totalLikes += media.likes;
  });

  // Ajouter le total des likes dans le bas de page
  const bottomSection = document.querySelector(".bottom_info");

  // Créer un élément pour afficher le total des likes
  const totalLikesElement = document.createElement("div");
  totalLikesElement.className = "total_likes";

  const totalLikesSpan = document.createElement("span");
  totalLikesSpan.textContent = `${totalLikes}`;
  totalLikesSpan.className = "total-likes";

  totalLikesElement.appendChild(totalLikesSpan);

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-heart";
  icon.setAttribute("aria-label", "Ajouter aux favoris");
  totalLikesElement.appendChild(icon);

  bottomSection.appendChild(totalLikesElement);

  // Mettre à jour le compteur total lorsqu'on clique sur les likes individuels
  document.querySelectorAll(".fa-heart").forEach((heartIcon, index) => {
    heartIcon.addEventListener("click", () => {
      // Récupérer le nombre de likes de l'élément cliqué
      const mediaLikesElement = medias[index].likes;

      if (!heartIcon.classList.contains("liked")) {
        totalLikes--;
        heartIcon.classList.remove("liked");
      } else {
        totalLikes++;
        heartIcon.classList.add("liked");
      }

      // Mettre à jour le texte du total des likes en bas de page
      totalLikesSpan.textContent = `${totalLikes}`;
    });
  });
}

/**
 * Retrieves the photographer's ID from the URL.
 *
 * @return {number} The ID of the photographer as an integer.
 */
function getPhotographersIdFromUrl() {
  const url = new URLSearchParams(window.location.search);
  return parseInt(url.get("id")); // Retourne l'ID en tant q'entier
}

/**
 * Sorts an array of media items based on the specified criteria.
 *
 * @param {Array} items - The array of media items to be sorted.
 * @param {string} sortBy - The criteria to sort the media items by. Can be "popularity", "date", or "title".
 * @return {Array} The sorted array of media items.
 */

function filterMedia(items, sortBy) {
  items.sort((a, b) => {
    if (sortBy === "popularity") {
      return (
        parseInt(b.getAttribute("likes")) - parseInt(a.getAttribute("likes"))
      );
    } else if (sortBy === "date") {
      return (
        new Date(b.getAttribute("date")) - new Date(a.getAttribute("date"))
      );
    } else if (sortBy === "title") {
      return a
        .getAttribute("title")
        .localeCompare(b.getAttribute("title"), "fr", { sensitivity: "base" }); // ignore upper and lowercase
    }
  });

  return items;
}

document.getElementById("sortMedia").addEventListener("change", function () {
  // Use for collect the value
  // 'this' is the select element
  const sortBy = this.value;
  // choose gallery
  const gallery = document.querySelector(".gallery");
  // create an array
  const items = Array.from(gallery.children);

  let orderItems = filterMedia(items, sortBy);
  orderItems.forEach((item) => gallery.appendChild(item));
});

/**
 * Initializes the function by retrieving the photographer's ID from the URL,
 * fetching the photographer's information using the ID, and displaying the
 * photographer's data.
 *
 * @return {Promise<void>} A Promise that resolves when the function completes.
 */
async function init() {
  // On récupère l'id du photographe depuis l'url
  const photographerId = getPhotographersIdFromUrl();
  // On récupère les informations du photographe par son ID
  const { photographer } = await getPhotographers(photographerId);
  // On affiche les informations du photographe
  displayData(photographer);

  const { medias } = await getMedias(photographerId);
  displayMediasData(medias);

  openModal();
  closeBtn();
  createLightbox();
  lightbox();
}

init();
