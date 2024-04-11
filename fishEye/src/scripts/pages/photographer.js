let photographersData = null;

async function fetchData() {
  try {
    const response = await fetch("./src/data/photographers.json");
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    photographersData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Arrête l'exécution en lançant l'erreur
  }
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// PHOTOGRAPHER
async function getPhotographer(id) {
  const photographer = photographersData.photographers.find(
    (p) => p.id === parseInt(id)
  );
  return photographer;
}

async function displayData(photographer) {
  if (!photographer) {
    console.error("Photographer not found.");
    return;
  }

  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerTemplate(photographer);
  const userCardDOM = photographerModel.getUserCardDOM();
  photographersSection.insertAdjacentHTML("afterbegin", userCardDOM.outerHTML);
}

async function init(id) {
  try {
    await fetchData();
    const photographer = await getPhotographer(id);
    displayData(photographer);
  } catch (error) {
    console.error("Error initializing:", error);
    // Arrête l'exécution en lançant l'erreur
    throw error;
  }
}

// MEDIA
async function getMedia(photographerId) {
  const fullName = document.querySelector(".photographer-name");
  const namePart = fullName.textContent.split(" ");

  let firstName = namePart[0];
  if (firstName.includes("-")) {
    let nameParts = fullName.textContent.replace("-", " ").split(" ");
    firstName = nameParts[0] + " " + nameParts[1];
  }
  let media = photographersData.media.filter(
    (m) => m.photographerId === parseInt(photographerId)
  );

  media = media.map((m) => ({ ...m, firstName }));
  return media;
}

async function displayDataMedia(media, sortType) {
  const mediasSection = document.querySelector("#content-media");

  if (!media || media.length === 0) {
    console.error("No media data found.");
    return;
  }

  media.forEach((mediaItem) => {
    const mediaCard = mediaCardFactory(mediaItem);
    const userCardMedia = mediaCard.createCard();
    mediasSection.appendChild(userCardMedia);
    // Add event listener for the like button of this media
    const likeButton = userCardMedia.querySelector(".like-button");
    if (likeButton) {
      likeButton.addEventListener("click", async function () {
        mediaItem.likes++; // increment the likes of the media

        // Now update the sumLikes in the insert
        const insert = await getInsert(mediaItem.photographerId);
        if (insert) {
          insert.sumLikes++; // increment the sumLikes
          displayDataInsert(insert); // update the display
        }
      });
    }

    // Add event listener for the media link
    userCardMedia.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const nextMedia = media[index + 1];
        if (nextMedia) {
          const nextMediaCard = mediasSection.querySelector(
            `#media-${nextMedia.id}`
          );
          if (nextMediaCard) {
            nextMediaCard.focus();
          }
        } else {
          const firstMediaCard = mediasSection.querySelector(".card-media");
          if (firstMediaCard) {
            firstMediaCard.focus();
          }
        }
      }
    });
  });
}

async function initMedia() {
  try {
    const medias = await getMedia(id);
    displayDataMedia(medias);
  } catch (error) {
    console.error("Error initializing media:", error);
  }
}

// DROPDOWN

async function getDropdown(photographerId) {
  const dropdown = photographersData.photographers.find(
    (p) => p.id === parseInt(photographerId)
  );

  return { dropdown };
}

async function sortAndDisplayMedia(sortType) {
  const mediaContainer = document.querySelector("#content-media");
  if (!mediaContainer) {
    console.error("Media container not found.");
    return;
  }

  // Sélectionner toutes les cartes
  const mediaCards = Array.from(mediaContainer.querySelectorAll(".card-media"));

  // Trier les cartes en fonction du type de tri
  mediaCards.sort((a, b) => {
    const aValue = a.getAttribute(`data-${sortType}`);
    const bValue = b.getAttribute(`data-${sortType}`);

    if (sortType === "date") {
      return new Date(bValue) - new Date(aValue);
    } else if (sortType === "title") {
      return aValue.localeCompare(bValue);
    }
  });

  // Effacer le contenu du conteneur de médias
  mediaContainer.innerHTML = "";

  // Ajouter les cartes triées dans le conteneur
  mediaCards.forEach((mediaCard) => {
    mediaContainer.appendChild(mediaCard);
  });
}

async function displayDataDropdown(dropdown) {
  const dropdownSection = document.querySelector("#photograph-filter");
  if (!dropdown) {
    console.error("No dropdown data found.");
    return;
  }

  const dropdownObj = dropdownFilterFactory(dropdown);
  const userDropdown = dropdownObj.createDropdownFilter();
  dropdownSection.appendChild(userDropdown);
}

async function initDropdown(id) {
  try {
    const { dropdown, media } = await getDropdown(id);
    displayDataDropdown(dropdown);
    const dropdownElement = document.querySelector("#photograph-filter button");
    dropdownElement.addEventListener("change", () => {
      const sortType = dropdownElement.value;
      sortAndDisplayMedia(sortType);
    });
  } catch (error) {
    console.error("Error initializing dropdown:", error);
  }
}

// INSERT
let insertsData = new Map(); // Map to store the insert data

async function getInsert(photographerId) {
  photographerId = parseInt(photographerId);

  // Check if the insert data for this photographer id already exists
  if (insertsData.has(photographerId)) {
    return insertsData.get(photographerId);
  }

  let dataInsert = photographersData.media.filter(
    (m) => m.photographerId === photographerId
  );

  const allLikes = dataInsert.map((item) => item.likes);
  const sumLikes = allLikes.reduce((acc, curr) => acc + curr, 0);

  const price = photographersData.photographers.find(
    (p) => p.id === photographerId
  ).price;

  let insert = { photographerId, sumLikes, price };

  // Store the insert data in the map
  insertsData.set(photographerId, insert);

  return insert;
}

async function displayDataInsert(insert) {
  const insertSection = document.querySelector("main");
  if (!insert || insert.length === 0) {
    console.error("No insert data found.");
    return;
  }

  const insertObj = insertFactory(insert);
  const userInsert = insertObj.createInsert();
  insertSection.insertAdjacentHTML("beforeend", userInsert.outerHTML);
}

async function initInsert(id) {
  try {
    const inserts = await getInsert(id);
    displayDataInsert(inserts);
  } catch (error) {
    console.error("Error initializing insert:", error);
  }
}

// LIGHTBOX
async function getLightbox(photographerId) {
  const dataLightbox = photographersData.media.filter(
    (m) => m.photographerId === parseInt(photographerId)
  );
  const fullName = document.querySelector(".photographer-name");
  const namePart = fullName.textContent.split(" ");
  let firstName = namePart[0];
  if (firstName.includes("-")) {
    let nameParts = fullName.textContent.replace("-", " ").split(" ");
    firstName = nameParts[0] + " " + nameParts[1];
  }
  const images = dataLightbox
    .filter((item) => item.image)
    .map((item) => ({ image: item.image, title: item.title }));

  const videos = dataLightbox
    .filter((item) => item.video)
    .map((item) => ({ video: item.video, title: item.title }));

  const lightbox = { images, videos, firstName };
  return lightbox;
}

async function displayDataLightbox(lightbox, initialIndex) {
  const lightboxSection = document.querySelector("#lightbox_modal");
  if (!lightbox || lightbox.length === 0) {
    console.error("No lightbox data found.");
    return;
  }

  const lightboxObj = lightboxFactory(lightbox, initialIndex);
  const userLightbox = lightboxObj.createLightbox();
  lightboxSection.innerHTML = ""; // Clear the lightbox section before adding new content
  lightboxSection.appendChild(userLightbox); // Append the lightbox element to the section

  const closeNav = document.querySelector(".lightbox-nav-close");
  closeNav.onclick = () => lightboxObj.closeModaLightbox();

  const leftNav = document.querySelector(".lightbox-nav-left");
  leftNav.onclick = () => lightboxObj.previousMedia();

  const rightNav = document.querySelector(".lightbox-nav-right");
  rightNav.onclick = () => lightboxObj.nextMedia();

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightboxObj.closeModaLightbox();
    } else if (event.key === "ArrowLeft") {
      lightboxObj.previousMedia();
    } else if (event.key === "ArrowRight") {
      lightboxObj.nextMedia();
    } else if (event.key === " ") {
      const lightboxMedia = document.querySelector(".lightbox-media-container");
      const video = lightboxMedia.querySelector("video");
      if (video & video.paused) {
        video.play();
      } else if (video) {
        video.pause();
      }
    }
  });
}

async function initLightbox(id, initialIndex) {
  try {
    const lightbox = await getLightbox(id);
    displayDataLightbox(lightbox, initialIndex);
  } catch (error) {
    console.error("Error initializing lightbox:", error);
  }
}

// CONTACT FORM
async function getContactForm(photographerId) {
  const contactForm = photographersData.photographers.find(
    (p) => p.id === parseInt(photographerId)
  );
  return contactForm;
}

async function displayDataContactForm(contactForm) {
  const contactFormSection = document.querySelector("#contact_modal");
  if (!contactForm || contactForm.length === 0) {
    console.error("No contact form data found.");
    return;
  }

  const contactFormObj = contactFormFactory(contactForm);
  const userContactForm = contactFormObj.createForm();
  contactFormSection.appendChild(userContactForm);

  const form = document.querySelector(".modal-form-element");
  form.addEventListener("submit", contactFormObj.handleSubmit);

  const closeContactForm = document.querySelector(".modal-close-button");
  closeContactForm.onclick = () => {
    contactFormSection.style.display = "none";
    document.body.classList.remove("no-scroll");
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      contactFormSection.style.display = "none";
      document.body.classList.remove("no-scroll");
    }
  });
}

async function initContactForm(id) {
  try {
    const contactForm = await getContactForm(id);
    displayDataContactForm(contactForm);
  } catch (error) {
    console.error("Error initializing contact form:", error);
  }
}

// INITIALIZE PAGE
async function initialize() {
  try {
    await fetchData();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    await init(id); // Initialiser les données du photographe
    await initMedia(); // Initialiser les médias du photographe
    await initInsert(id); // Initialiser les insertions du photographe
    await initLightbox(id); // Initialiser la lightbox du photographe
    await initContactForm(id); // Initialiser le formulaire de contact du photographe
    await initDropdown(id); // Initialiser la dropdown de tri des médias du photographe
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

initialize();

function toggleDropdown() {
  var menu = document.getElementById("dropdownMenu");
  var menuIcon = document.getElementById("dropdownIcon");

  menu.style.display = menu.style.display === "none" ? "block" : "none";
  menuIcon.classList.toggle("fa-chevron-down");
  menuIcon.classList.add("fa-chevron-up");
}
