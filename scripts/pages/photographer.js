import getSelectedSort from '../functions/getSelectedSort.js';
import mediaFactory from '../factories/media.js';
import sliderModal from '../model/slider.js';
// import createCard from '../templates/Card.js';
import Presentation from '../model/presentation.js';
import Modal from '../model/Modal.js';
import presentationTemplate from '../templates/presentationTemplate.js';
import totalLikes from '../model/totalLikes.js';
import modalTemplate from '../templates/modal.js';

function getphotographerId() {
  return new URL(window.location.href).searchParams.get('id');
}

async function getPresentation(photographerId) {
  fetch('../data/photographers.json')
    .then((res) => res.json())
    .then((data) => data.photographers.filter(
      (photographe) => photographe.id === parseInt(photographerId, 10),
    ))
    .then((filtingphotographe) => {
      const newPresentation = new Presentation(filtingphotographe[0]);
      const section = document.createElement('section');
      section.innerHTML = presentationTemplate(newPresentation);
      document.querySelector('.presentation__section').appendChild(section);
      section.className = 'photograph-header';
    });
}

async function getPhotos(photographerId) {
  fetch('../data/photographers.json')
    .then((res) => res.json())
    .then((data) => {
      const dataMedias = data.media.filter(
        (photo) => photo.photographerId === parseInt(photographerId, 10),
      );
      const mediaPage = data.photographers.filter(
        (photographer) => photographer.id === parseInt(photographerId, 10),
      );
      const container = document.querySelector('.photo-field');
      const medias = dataMedias.map((dataMedia) => {
        const media = mediaFactory(dataMedia, mediaPage[0].name);
        media.createCard(media, container);
        // const card = container.appendChild(media.createCard(media, container));
        // const like = card.querySelector('.photo__likes');
        // like.addEventListener('click', (e) => media.elt.toggleLike(e));
        return media;
      });
      return [medias, mediaPage[0].name, mediaPage[0].price];
    })
    .then((data) => {
      const photosId = data[0];
      const name = data[1];
      const price = data[2];
      const sortMedia = getSelectedSort(photosId);

      const container = document.querySelector('.photo-field');
      sortMedia.forEach((media) => {
        // const card = document.createElement('article');
        // card.classList.add('cardMedia');
        // card.innerHTML = createCard(media, name);
        // const cardMedia = container.appendChild(card);

        // const img = cardMedia.querySelector('.photo');
        // img.addEventListener('click', () => sliderModal(media, sortMedia, name));
        // document.addEventListener('keydown', (e) => {
        //   if (e.code === 'Enter' && e.target === img) { sliderModal(media, sortMedia, name); }
        // });

        // const like = cardMedia.querySelector('.photo__likes');
        // like.addEventListener('click', (e) => media.toggleLike(e));
      });
      const sumLikes = document.querySelector('.totalLikes__likes');
      sumLikes.innerHTML = totalLikes(sortMedia);
      const pricePerDay = document.querySelector('.totalLikes__price');
      pricePerDay.innerHTML = `${price} /jour`;

      const modalContainer = document.getElementById('contact_modal');
      const modal = document.createElement('div');
      modalContainer.appendChild(modal);
      modal.outerHTML = modalTemplate(name);
      const modalData = new Modal(name);
      const contactButton = document.querySelector('.contact_button');
      contactButton.addEventListener('click', () => modalData.displayModal());
    });
}

async function initPhotographe() {
  const photographerId = getphotographerId();
  await getPresentation(photographerId);
  await getPhotos(photographerId);
}

initPhotographe();
