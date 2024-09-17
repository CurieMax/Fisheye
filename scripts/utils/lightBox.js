/**
 * Creates a lightbox element and appends it to the document body.
 * The lightbox includes a close button, a content area, and navigation controls.
 *
 * @return {void} This function does not return a value.
 */
export function createLightbox() {

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.id = "lightbox";
  
    const lightboxClose = document.createElement("img");
    lightboxClose.className = "close-lightbox";
    lightboxClose.setAttribute("src", "assets/icons/close.svg");
    
    const lightboxImage = document.createElement("div");
    lightboxImage.className = "lightbox-content";
    lightboxImage.id = "lightboxImage";
  
    const lightboxPrev = document.createElement("a");
    lightboxPrev.className = "prev";
    lightboxPrev.textContent = "<";
    const lightboxNext = document.createElement("a");
    lightboxNext.className = "next";
    lightboxNext.textContent = ">";
  
    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(lightboxPrev);
    lightbox.appendChild(lightboxNext);
    
    document.body.appendChild(lightbox);
  
    showMedia ();
    
  }
  
  function showMedia () {
    const lightboxItem = document.createElement ("img");
    lightboxItem.className = "lightbox-item";
    lightboxItem.id = "lightboxItem";

    document.getElementById("lightboxImage").appendChild(lightboxItem);
  }

  /**
   * Initializes the lightbox functionality for displaying media in a gallery.
   *
   * This function sets up the necessary event listeners and variables for the lightbox
   * to work properly. It also defines functions for opening, closing, and navigating
   * through the lightbox images. The `setupMediaForLightbox` function is called to
   * attach click event listeners to each image in the gallery, so that when an
   * image is clicked, the corresponding lightbox image is displayed.
   *
   * @return {void} This function does not return anything.
   */
  export function lightbox() {
    // Ajouter les fonctionnalités de la lightbox
    let currentMediaIndex = 0;
    let mediaElements = [];
  
    /**
     * Opens the lightbox and displays the media at the specified index.
     *
     * @param {number} index - The index of the media to display in the lightbox.
     * @return {void} This function does not return anything.
     */
    function openLightbox(index) {
      const lightbox = document.getElementById("lightbox");
      const lightboxItem = document.getElementById("lightboxItem");

      currentMediaIndex = index;
      lightbox.style.display = "block";
      lightboxItem.src = mediaElements[currentMediaIndex].src;
  
      // Ajouter un écouteur pour les touches du clavier
      document.addEventListener("keydown", handleKeydown);
      
      document.body.style.overflow = "hidden";
    }
  
  
    /**
     * Closes the lightbox by hiding it from the user's view.
     *
     * @return {void} This function does not return anything.
     */
    function closeLightbox() {
      document.getElementById("lightbox").style.display = "none";
  
      // Enlever le routeur pour les touches du clavier
      document.removeEventListener("keydown", handleKeydown);

      document.body.style.overflow = "auto";
    }
  
    /**
     * Displays the next media item in the lightbox by incrementing the current media index.
     *
     * @return {void} This function does not return anything.
     */
    function showNext() {
      // On change le numero de l'index lorsqu'on clique sur le bouton suivant
      currentMediaIndex = (currentMediaIndex + 1) % mediaElements.length;
      document.getElementById("lightboxItem").src =
        mediaElements[currentMediaIndex].src;

    }
  
    /**
     * Displays the previous media item in the lightbox by decrementing the current media index.
     *
     * @return {void} This function does not return anything.
     */
    function showPrevious() {
      // On change le numero de l'index lorsqu'on clique sur le bouton precedent
      currentMediaIndex =
        (currentMediaIndex - 1 + mediaElements.length) % mediaElements.length;
      document.getElementById("lightboxItem").src =
        mediaElements[currentMediaIndex].src;

    }
  
    // Gérer les touches fléchées
    function handleKeydown(event) {
      if (event.key === "ArrowRight") {
        showNext(); // Flèche droite pour l'élément suivant
      } else if (event.key === "ArrowLeft") {
        showPrevious(); // Flèche gauche pour l'élément précédent
      } else if (event.key === "Escape") {
        closeLightbox(); // Touche "Escape" pour fermer la lightbox
      }
    }
  
    document
      .querySelector(".close-lightbox")
      .addEventListener("click", closeLightbox);
    document.querySelector(".next").addEventListener("click", showNext);
    document.querySelector(".prev").addEventListener("click", showPrevious);
  
    /**
     * Sets up media elements in the gallery for lightbox functionality.
     *
     * @return {void} This function does not return anything.
     */
    function setupMediaForLightbox() {
      // On récupère les medias et lorsqu'on clique sur une image, on ouvre la lightbox
      mediaElements = Array.from(document.querySelectorAll(".gallery img"));
      mediaElements.forEach((img,  index) => {
        img.addEventListener("click", () => openLightbox(index));
      });
    }
  
    setupMediaForLightbox();
  }