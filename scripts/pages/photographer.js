import DataObject from "./dataJson.js";
import MediaTemplate from "../templates/mediaTemplate.js";
import contactForm from "../utils/contactForm.js";
import getCaroussel from "../utils/caroussel.js";

async function apply() {
  const params = new URL(document.location).searchParams;
  const photographerID = params.get("id");

  // getting photographer data
  const Object = new DataObject();
  console.log(Object.data);
  // console.log(Object.data.photographers[0].name);

  const photographer = await Object.getPhotographerById(photographerID);

  // CREATING SELECTOR
  // getting dom elements
  const popularité= document.getElementById('popularité');
  const date= document.getElementById("date");
  const titre= document.getElementById("titre");
  const trieur = document.getElementById("trieur");
  const optionList = document.getElementById("optionList");
  const selected = document.getElementById("selected");
  const checkbox = document.getElementById("checkbox");

  // setting eventLisener
  optionList.addEventListener("click", (e) => {
    checkbox.checked = false;
    const selection = e.target.textContent;
    if (
      selection === "Popularité" ||
      selection === "Date" ||
      selection === "Titre"
    ) {
      selected.textContent = selection;
    }
    if (selection === "Popularité") {
      sortingMedia("Popularité");
    } else if (selection === "Date") {
      sortingMedia("Date");
    } else if (selection === "Titre") {
      sortingMedia("Titre");
    }
  });
  trieur.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
   
      checkbox.checked = true;
      popularité.focus();

    }
  });
  // setting inlusive event listener
  optionList.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkbox.checked = false;
      const selection = e.target.textContent;
      if (
        selection == "Popularité" ||
        selection == "Date" ||
        selection == "Titre"
      ) {
        selected.textContent = selection;
      }
      if (selection == "Popularité") {
        sortingMedia("Popularité");
      } else if (selection == "Date") {
        sortingMedia("Date");
      } else if (selection == "Titre") {
        sortingMedia("Titre");
      }
    }
  });

  const infoSection = document.createElement("section");

  // iplementing photographer section elements

  // implementing infosection

  const NameH2 = document.createElement("h2");
  NameH2.setAttribute("class", "name");
  NameH2.textContent = `${photographer[0].name}`;

  const localisationP = document.createElement("p");
  localisationP.setAttribute("class", "localisation");
  localisationP.textContent = `${photographer[0].country}, ${photographer[0].city}`;

  const tagP = document.createElement("p");
  tagP.setAttribute("class", "tag");
  tagP.textContent = photographer[0].tagline;

  infoSection.appendChild(NameH2);

  infoSection.appendChild(localisationP);

  infoSection.appendChild(tagP);

  // implementing photographer section in the dom
  const photographHeader = document.querySelector(".photographer");

  // implementing infoSection
  photographHeader.prepend(infoSection);

  // implementing photo

  const portraitImg = document.createElement("img");
  portraitImg.setAttribute(
    "src",
    `assets/photographers/${photographer[0].portrait}`
  );
  portraitImg.setAttribute(`alt`, `photo de ${photographer[0].name}`);
  portraitImg.setAttribute("class", "portrait");

  // MEDIA SECTION

  // getting media info
  photographHeader.append(portraitImg);

  let media = await Object.getMediaById(photographerID);

  // sorting media
  async function sortingMedia(param) {
    if (param == "Popularité") {
      media = media.sort((a, b) => {
        if (b.likes > a.likes) {
          return 1;
        }
        return -1;
      });
    }
    if (param == "Date") {
      media = media.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateB > dateA) {
          return -1;
        }
        return 1;
      });
    }
    if (param == "Titre") {
      media = media.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        return 1;
      });
    }
    mediaSectionCreator();
  }
  // creating media section
  async function mediaSectionCreator() {
    const mediaSection = document.getElementById("media");
    const mediaTab = document.createElement(`tab`);
    mediaTab.setAttribute(`captation`, `select productions`);
    mediaTab.setAttribute(`scope`, `row`);
    mediaTab.setAttribute(`id`, `mediaTab`);

    // creating caroussel section
    const carousselSection = document.getElementById("caroussel");

    // implementing mediaArticls
    media.forEach((mediaElement) => {
      (async function () {
        // in media section
        const mediaArticle = await MediaTemplate(
          photographer,
          media,
          mediaElement
        );
        mediaTab.appendChild(mediaArticle);
      })();
    });
    mediaSection.innerHTML = "";
    // Implementing mediatab in dom
    mediaSection.appendChild(mediaTab);
  }
  sortingMedia("Popularité");
  mediaSectionCreator();

  // SECTION PHOTOGRAPHER PRICE

  // creating price p
  const priceP = document.createElement("footer");
  priceP.setAttribute("class", "likePriceFooter");
  priceP.textContent = `${photographer[0].price} € `;
  mediaSection.appendChild(priceP);

  // implementing contact button
  const contactButton = document.getElementById("contact_button");
  const formManipulator = new contactForm();
  contactButton.addEventListener("click", () => {
    formManipulator.displayModal();
  });

  // implementing valid button
  const validButton = document.getElementById("validButton");
  validButton.addEventListener("click", () => {
    formManipulator.validModal();
  });

  // implementing close button
  const closeButton = document.getElementById("modalCloseBtn");
  closeButton.addEventListener("click", () => {
    formManipulator.closeModal();
  });

  // setting blide processor
}

apply();
