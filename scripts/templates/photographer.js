import { MediaFactory } from "../utils/mediaFactory.js";

/**
 * Creates a template for a photographer's profile.
 *
 * @param {object} data - An object containing the photographer's data.
 * @param {string} data.name - The photographer's name.
 * @param {string} data.portrait - The photographer's portrait image.
 * @param {string} data.city - The photographer's city.
 * @param {string} data.country - The photographer's country.
 * @param {string} data.tagline - The photographer's tagline.
 * @param {number} data.price - The photographer's price per day.
 * @param {number} data.id - The photographer's ID.
 * @return {object} An object containing the photographer's data and a function to get the user card DOM.
 */
export function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  /**
   * Creates a DOM element representing a photographer's profile card.
   *
   * @param {object} data - An object containing the photographer's data.
   * @param {string} data.id - The photographer's ID.
   * @param {string} data.name - The photographer's name.
   * @param {string} picture - The photographer's picture.
   * @return {HTMLElement} The DOM element representing the photographer's profile card.
   */
  function getUserCardDOM() {
    const link = document.createElement("a");

    link.setAttribute("href", "photographer.html?id=" + data.id);
    // Accessibility
    link.setAttribute("aria-label", "Voir le profil de" + name);
    const article = document.createElement("article");
    const idPhoto = document.createElement("span");
    idPhoto.className = "photographer_id";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.alt = "Portrait de " + name;
    idPhoto.appendChild(img);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const p = document.createElement("p");
    const location = document.createElement("span");
    const tagline = document.createElement("span");
    const price = document.createElement("span");
    location.textContent = `${data.city}, ${data.country}`;
    tagline.textContent = data.tagline;
    price.textContent = `${data.price}€/jour`;
    location.className = "location";
    tagline.className = "tagline";
    price.className = "price";
    p.appendChild(location);
    p.appendChild(tagline);
    p.appendChild(price);

    article.appendChild(idPhoto);
    article.appendChild(h2);
    article.appendChild(p);

    link.appendChild(article);

    return link;
  }

  function getUserCardSolo() {
    const photographInfo = document.createElement("div");
    photographInfo.className = "photograph_info";

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const p = document.createElement("p");
    const localisation = document.createElement("span");
    const tag = document.createElement("span");

    localisation.textContent = `${city}, ${country}`;
    tag.textContent = tagline;

    localisation.className = "location";
    tag.className = "tagline";

    p.appendChild(localisation);
    p.appendChild(tag);

    photographInfo.appendChild(h2);
    photographInfo.appendChild(p);

    const idPhoto = document.createElement("div");
    idPhoto.className = "photographer_photo";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Portrait de ${name}`);
    idPhoto.appendChild(img);

    return { photographInfo, idPhoto };
  }

  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    getUserCardDOM,
    getUserCardSolo,
  };
}

export function mediaTemplate(data) {
  const media = MediaFactory.createMedia(data);

  return media.getMediaDOM();
}
