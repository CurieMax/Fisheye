//Mettre le code JavaScript lié à la page photographer.html
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
    const photographer = photographers.find((photographer) => photographer.id === id);
    
    return {
      photographer: photographer
      
    };
  }

  async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
  
    // Afficher les informations du photographe dans la page
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    // Ajouter la carte du photographe à la page
    photographersSection.appendChild(userCardDOM);
  }

  // Fonction pour récupérer l'id du photographe depuis l'url
  function getPhotographersIdFromUrl() {
      const url = new URLSearchParams(window.location.search);
      return parseInt(url.get("id")); // Retourne l'ID en tant q'entier
  }
  async function init() {
    // On récupère l'id du photographe depuis l'url
    const photographerId = getPhotographersIdFromUrl();
    // On récupère les informations du photographe par son ID
    const { photographer } = await getPhotographers(photographerId);
    // On affiche les informations du photographe
    displayData(photographer);
    
  }

  init();
  