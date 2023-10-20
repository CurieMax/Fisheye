import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
  //récupération des photographes
  const photographersResponse = await fetch("data/photographers.json");
  const photographersData = await photographersResponse.json();

  return photographersData;
}

async function displayPhotographerData(photographersData) {
  console.log("photographersArray", photographersData);
  //création de la section photographes
  const photographersSection = document.querySelector(".photographer_section");

  //boucle sur le json
  photographersData.photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    //ajout des éléments à la classe "photographer_section"
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  try {
    const photographers = await getPhotographers();
    displayPhotographerData(photographers);
    console.log(photographers);
  } catch (error) {
    console.error("Error fetching photographers data:", error);
  }
}

init();
