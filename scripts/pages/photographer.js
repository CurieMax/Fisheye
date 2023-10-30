// Fonction factory pour créer les médias
function createMedia(data) {
  const commonData = {
    id: data.id,
    photographerId: data.photographerId,
    title: data.title,
    likes: data.likes,
    date: data.date,
    price: data.price,
  };

  if (data.image) {
    return {
      ...commonData,
      type: "photo",
      source: `assets/galleries/${data.image}`,
    };
  } else if (data.video) {
    return {
      ...commonData,
      type: "video",
      source: `assets/galleries/${data.video}`,
    };
  }
}

// Fonction pour créer l'élément DOM d'un média
function createMediaElement(media) {
  const $mediaElement = document.createElement("div");
  const isVideo = media.type === "video";

  $mediaElement.innerHTML = `
      <div class="media-card ${isVideo ? "video" : ""}">
        <img src="${media.source}" alt="${media.title}">
        </div>
        <div class="media-card-description">
            <p>${media.title}</p>
            <p>${media.likes} <i class="fa-solid fa-heart"></i></p>
        </div>
    `;
  return $mediaElement;
}

// Fonction asynchrone pour récupérer les données depuis un fichier JSON
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Fonction principale pour initialiser la page du photographe
async function initPhotographerPage() {
  const photographerId = getPhotographerIdFromURL();

  if (photographerId) {
    // Récupérer les données du photographe
    const photographer = await fetchData("/data/photographers.json").then(
      (data) => data.photographers.find((p) => p.id === photographerId)
    );

    // Créer le template du photographe
    const photographerTemplate = photographerDetailTemplate(photographer);
    displayPhotographerHeader(photographerTemplate);
    // Récupérer les médias du photographe
    const photographerMedia = await fetchData("/data/photographers.json").then(
      (data) =>
        data.media.filter((media) => media.photographerId === photographerId)
    );

    // Utilisation de la fonction factory pour créer les médias
    const mediaInstances = photographerMedia.map(createMedia);

    // Afficher les médias
    displayMedia(mediaInstances);
  }
}

// Fonction pour récupérer l'ID du photographe depuis l'URL
function getPhotographerIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"), 10);
}

// Fonction pour afficher le template du photographe dans le DOM
function displayPhotographerHeader(photographerTemplate) {
  const $main = document.getElementById("main");
  $main.appendChild(photographerTemplate);
}

// Fonction pour afficher les médias dans le DOM
function displayMedia(mediaInstances) {
  const $mediaContainer = document.getElementById("media-container-main");

  // Utilisation de la fonction pour créer l'élément DOM et l'afficher
  mediaInstances.forEach((media) => {
    const $mediaElement = createMediaElement(media);
    $mediaContainer.appendChild($mediaElement);
  });
}

// Appeler la fonction principale pour initialiser la page du photographe
initPhotographerPage();



