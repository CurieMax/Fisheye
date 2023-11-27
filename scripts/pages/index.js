import { getAllorOnePhotographer } from "/scripts/api/getPhotographer.js";
import { photographerCard } from "/scripts/templates/photographer.js";

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerCard(photographer);
    photographersSection.appendChild(photographerModel);
  });
}

async function init() {
  const { photographers } = await getAllorOnePhotographer();
  displayData(photographers);
}

init();
