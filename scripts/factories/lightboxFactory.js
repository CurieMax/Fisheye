import {mediaPhotographer} from '../pages/photographerController.js'
import {disableBodyScroll, enableBodyScroll} from "./bodyScrollLock.js";
import  {arrayToSort} from '../controllers/sortMedia.js';

// Récupérez tous les éléments nécessaires
const lightbox = document.getElementById('lightbox');
// const lightboxContent = document.getElementById('lightbox-content');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxMedia = document.getElementById('lightbox-media');
const closeButton = document.getElementById('close-button');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const mediaTitle = document.getElementById('media-title');

let currentIndex = -1;
let mediaElements = [];


console.log('medias data:', mediaPhotographer)
console.log('medias SORT:', arrayToSort)


// Fonction pour ouvrir la lightbox
function openLightbox(index) {
  lightbox.style.display = 'flex'

  currentIndex = index;
  const mediaElement = mediaElements[currentIndex];

  let title = mediaElement.getAttribute('alt')
  console.log('affichage element:' , mediaElement)
  console.log('affichage du titre:' ,title)
  mediaTitle.innerHTML=title

  const isVideo = mediaElement.tagName === 'VIDEO';
  if (isVideo) {
    lightboxMedia.src = mediaElement.src;
    lightboxMedia.style.display = 'block';
    lightboxImage.style.display = 'none';
  } else {
    lightboxImage.src = mediaElement.src;
    lightboxImage.style.display = 'block';
    lightboxMedia.style.display = 'none';
  }
  lightbox.classList.add('open');
  disableBodyScroll(lightbox)
}

// Fonction pour fermer la lightbox
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.classList.add('fadeOut')
  lightbox.style.display = 'none'
  lightboxMedia.pause();
  lightboxMedia.currentTime = 0;
  enableBodyScroll(lightbox)
}

// Fonction pour passer à la photo suivante
function nextMedia() {
  currentIndex = (currentIndex + 1) % mediaElements.length;
  openLightbox(currentIndex);
}

// Fonction pour passer à la photo précédente
function previousMedia() {
  currentIndex = (currentIndex - 1 + mediaElements.length) % mediaElements.length;
  openLightbox(currentIndex);
}

// Événement pour ouvrir la lightbox lorsqu'une image ou une vidéo est cliquée
mediaElements = document.querySelectorAll('.picture img[src$=".jpg"], .picture video');
console.log(mediaElements)
mediaElements.forEach((mediaElement, index) => {
  mediaElement.addEventListener('click', () => {
    openLightbox(index);
  });
});


// Événement pour fermer la lightbox lorsqu'on clique sur le bouton de fermeture
closeButton.addEventListener('click', closeLightbox);

// Événement pour fermer la lightbox lorsqu'on clique sur la zone grise en dehors de la lightbox
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

// Événement pour passer à la photo suivante lorsqu'on clique sur le bouton "Suivant"
nextButton.addEventListener('click', nextMedia);

// Événement pour passer à la photo précédente lorsqu'on clique sur le bouton "Précédent"
previousButton.addEventListener('click', previousMedia);

// Événements pour naviguer au clavier et quitter la lightbox 
document.onkeyup = (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
  }
}

document.addEventListener('keydown', keyHandler);
function keyHandler(e) {
  // Left Arrow
  if (e.key === 'ArrowLeft') {
    
    previousMedia();
  }
  // Right Arrow
  if  (e.key === 'ArrowRight') {
    
    nextMedia();
  }
}