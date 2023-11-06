// import { initPhotograph } from '../pages/photographer.js';
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;
  console.log(data);
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = picture;
    img.alt = name;
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const description = document.createElement('div');
    const location = document.createElement('h3');
    location.textContent = `${city}, ${country}`;
    const tag = document.createElement('p');
    tag.textContent = tagline;
    const price = document.createElement('p');
    price.textContent = `${price}€/jour`;
    description.appendChild(location);
    description.appendChild(tag);
    description.appendChild(price);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(description);
    article.tabIndex = 0;
    article.onclick = function () {
      openPhotographerPage(data);
    };
    return article;
  }
  return { name, picture, getUserCardDOM };
}
async function openPhotographerPage(data) {
  window.location.href = '../../photographer.html';
  initPhotograph(data);
}
