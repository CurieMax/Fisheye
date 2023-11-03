function createMediaFactory(data) {
  let liked = false; // Ajout d'une variable pour suivre l'état de like

  function createMediaElement() {
    const $mediaElement = document.createElement("article");
    $mediaElement.classList.add("media-card");

    const isVideo = data.video;
    const mediaSource = isVideo ? data.video : data.image;

    $mediaElement.innerHTML = `
        <div class="media-card">
          ${
            isVideo
              ? `<video>
                  <source src="assets/galleries/${mediaSource}" type="video/mp4">
                  Votre navigateur ne supporte pas ce média.
                </video>`
              : `<img src="assets/galleries/${mediaSource}" alt="${data.title}" />`
          }
        </div>
        <div class="media-card-description">
            <p>${data.title}</p>
            <p>
            <span id="likeButton" role="button" tabindex="0" class="${
              liked ? "liked" : ""
            }" aria-label="J'aime">
              <i class="fa-solid fa-heart"></i>
            </span>           
            <span id="likeCount">${data.likes}</span>
            </p>
        </div>
      `;

    // Ajout d'un gestionnaire d'événements sur le bouton de like
    const $likeButton = $mediaElement.querySelector("#likeButton");
    $likeButton.addEventListener("click", handleLikeClick);

    function handleLikeClick() {     
      liked = !liked;// Inverser l'état de liked
      data.likes += liked ? 1 : -1; // Mettre à jour le nombre de likes en fonction de liked
      updateLikes(); // Mettre à jour l'icône et le nombre de likes
    }

    // Incrémentation au clavier
    $likeButton.addEventListener("keydown", handleLikeClickKeyboard);
    function handleLikeClickKeyboard(event) {
      const isEnterKey = event.key === "Enter";
      isEnterKey && handleLikeClick();
    }

    function updateLikes() {
      // Mettre à jour le texte avec le nouveau nombre de likes
      const $likeCount = $mediaElement.querySelector("#likeCount");
      $likeCount.textContent = data.likes;
    }

    return $mediaElement;
  }

  return { createMediaElement };
}
