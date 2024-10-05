/**
 * Creates a lightbox element and appends it to the document body.
 *
 * @return {void}
 */
export function createLightbox() {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.id = "lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-labelledby", "lightboxImage");

  const lightboxClose = document.createElement("img");
  lightboxClose.className = "close-lightbox";
  lightboxClose.setAttribute("src", "assets/icons/close-lightbox.svg");
  lightboxClose.setAttribute("alt", "Close lightbox");
  lightboxClose.setAttribute("tabindex", 0);

  const lightboxImage = document.createElement("div");
  lightboxImage.className = "lightbox-content";
  lightboxImage.id = "lightboxImage";

  const lightboxPrev = document.createElement("a");
  lightboxPrev.className = "prev";
  lightboxPrev.textContent = "<";
  lightboxPrev.setAttribute("aria-label", "Image précédente");
  lightboxPrev.setAttribute("tabindex", 0);
  const lightboxNext = document.createElement("a");
  lightboxNext.className = "next";
  lightboxNext.textContent = ">";
  lightboxNext.setAttribute("aria-label", "Image suivante");
  lightboxNext.setAttribute("tabindex", 0);

  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxImage);
  lightbox.appendChild(lightboxPrev);
  lightbox.appendChild(lightboxNext);

  document.body.appendChild(lightbox);
}

/**
 * Initializes and sets up the lightbox functionality, including event listeners and media handling.
 *
 * @return {void}
 */
export function lightbox() {
  let currentMediaIndex = 0;
  let mediaElements = [];

  /**
   * Sets the inert attribute for all elements that are direct children of the body,
   * except for the element that is passed as an argument.
   *
   * @param {Element} exceptElement - The element that should not be set inert.
   * @return {void}
   */
  function setInertForAll(exceptElement) {
    const allElements = document.querySelectorAll("body > *:not(#lightbox)");

    allElements.forEach((element) => {
      if (element !== exceptElement) {
        element.setAttribute("inert", "true");
      }
    });
  }

  /**
   * Removes the inert attribute from all elements that have it.
   *
   * @return {void}
   */
  function removeInertForAll() {
    const allElements = document.querySelectorAll("[inert]");

    allElements.forEach((element) => {
      element.removeAttribute("inert");
    });
  }

  /**
   * Opens the lightbox and displays the media element at the specified index.
   *
   * @param {number} index - The index of the media element to display.
   * @return {void}
   */
  function openLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const lightboxContainer = document.getElementById("lightboxImage");

    currentMediaIndex = index;
    lightboxContainer.innerHTML = ""; // Delete all existing media elements

    const mediaElement = mediaElements[currentMediaIndex];

    const titleElement = document.createElement("h2");
    titleElement.className = "lightbox-title";
    titleElement.textContent =
      mediaElement.getAttribute("alt") ||
      mediaElement.getAttribute("data-title");

    if (mediaElement.tagName === "VIDEO") {
      const video = mediaElement.cloneNode(true);
      video.controls = true;
      video.play();
      lightboxContainer.appendChild(video);
      titleElement.textContent = mediaElement.getAttribute("data-title");
    } else if (mediaElement.tagName === "IMG") {
      const img = mediaElement.cloneNode(true);
      lightboxContainer.appendChild(img);
      titleElement.textContent = mediaElement.getAttribute("alt");
      img.setAttribute("tabindex", -1);
    }

    lightboxContainer.appendChild(titleElement);

    lightbox.style.display = "block";
    document.querySelector(".close-lightbox").focus();
    document.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";

    setInertForAll(lightbox);
  }

  /**
   * Closes the lightbox and resets the page to its original state.
   *
   * @return {void}
   */
  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const video = document.querySelector(".lightbox-content video");

    if (video) {
      video.pause();
    }

    lightbox.style.display = "none";
    document.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "auto";

    removeInertForAll();
  }

  /**
   * Moves to the next media element in the lightbox and opens it.
   *
   * @return {void} This function does not return a value.
   */
  function showNext() {
    const video = document.querySelector(".lightbox-content video");
    if (video) {
      video.pause();
    }
    currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
    openLightbox(currentMediaIndex);
  }

  /**
   * Moves to the previous media element in the lightbox and opens it.
   *
   * @return {void} This function does not return a value.
   */
  function showPrevious() {
    const video = document.querySelector(".lightbox-content video");
    if (video) {
      video.pause();
    }
    currentMediaIndex =
      (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
    openLightbox(currentMediaIndex);
  }

  /**
   * Handles keydown events in the lightbox.
   *
   * @param {KeyboardEvent} event - The keyboard event object.
   * @return {void} This function does not return a value.
   */
  function handleKeydown(event) {
    if (event.key === "ArrowRight") {
      showNext();
    } else if (event.key === "ArrowLeft") {
      showPrevious();
    } else if (event.key === "Escape") {
      closeLightbox();
    }
  }

  document
    .querySelector(".close-lightbox")
    .addEventListener("click", closeLightbox);
  document
    .querySelector(".close-lightbox")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        closeLightbox();
      }
    });
  document.querySelector(".next").addEventListener("click", showNext);
  document.querySelector(".next").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showNext();
    }
  });
  document.querySelector(".prev").addEventListener("click", showPrevious);
  document.querySelector(".prev").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showPrevious();
    }
  });

  /**
   * Sets up event listeners for media elements in the gallery to open the lightbox when clicked or when the Enter key is pressed.
   *
   * @return {void} This function does not return a value.
   */
  function setupMediaForLightbox() {
    mediaElements = Array.from(
      document.querySelectorAll(".gallery img, .gallery video")
    );

    mediaElements.forEach((media, index) => {
      media.addEventListener("click", () => openLightbox(index));
      media.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          openLightbox(index);
        }
      });
    });
  }
  setupMediaForLightbox();
}
