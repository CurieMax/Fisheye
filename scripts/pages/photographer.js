import { photographerTemplate } from "../templates/photographer.js";
import { closeModal, displayModal } from "../utils/contactForm.js";


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
  const { photographInfo, idPhoto} = photographerModel.getUserCardSolo();

  // Create contact button
  const contactButton = document.createElement("button");
  contactButton.className = "contact_button";
  contactButton.textContent = "Contactez-moi";
  const addNameOnTitle = document.createElement('h2');
  addNameOnTitle.textContent = `Contactez-moi ${photographer.name}`;
  document.querySelector('.contact_title').appendChild(addNameOnTitle);


  // Ajouter la carte du photographe à la page
  photographersSection.appendChild(photographInfo);
  photographersSection.appendChild(contactButton);
  photographersSection.appendChild(idPhoto);
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

  openModal();
  closeBtn();
  
}

init();
