// Classe de base Media
class Media {

  /**
   * Initializes a new instance of the Media class.
   *
   * @param {object} data - The data object containing media properties.
   * @param {number} data.id - The unique identifier of the media.
   * @param {string} data.title - The title of the media.
   * @param {string} data.date - The date of the media.
   * @param {number} data.likes - The number of likes for the media.
   * @return {undefined}
   */
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.date = data.date;
    this.likes = data.likes;
    this.path = `assets/media/`;
  }


  /**
   * Creates a media card element with title, likes, and a like button.
   *
   * @return {HTMLElement} The created media card element.
   */
  createMediaCard() {
    const imgCard = document.createElement("div");
    imgCard.className = "image-card";
    imgCard.setAttribute("id", this.id);
    imgCard.setAttribute("title", this.title);
    imgCard.setAttribute("date", this.date);
    imgCard.setAttribute("likes", this.likes);

    const imgInfo = document.createElement("div");
    imgInfo.className = "image-info";

    const imgTitle = document.createElement("span");
    imgTitle.className = "image-title";
    imgTitle.textContent = this.title;

    const imgLikes = document.createElement("span");
    imgLikes.className = "image-likes";

    const imgLikesSpan = document.createElement("span");
    imgLikesSpan.className = "image-likes-span";
    imgLikesSpan.textContent = `${this.likes} `;

    imgLikes.appendChild(imgLikesSpan);

    const icon = document.createElement("i");
    icon.className = "fa-regular fa-heart";
    icon.setAttribute("aria-label", "Ajouter aux favoris");
    icon.setAttribute("likes", this.likes);
    icon.setAttribute("tabindex", 0);
    icon.setAttribute("role", "button");
    icon.setAttribute("id", `like-icon-${this.id}`);
    
    let isLiked = false;
    let currentLikes = this.likes;

    icon.addEventListener("click", () => {
      if (isLiked) {
        currentLikes--;
        icon.classList.remove("liked");
        icon.setAttribute("aria-label", "Retirer des favoris");
      } else {
        currentLikes++;
        icon.classList.add("liked");
        icon.setAttribute("aria-label", "Ajouter aux favoris");
      }
      imgLikesSpan.textContent = `${currentLikes} `;
      isLiked = !isLiked;
    });

    imgLikes.appendChild(icon);
    imgInfo.appendChild(imgTitle);
    imgInfo.appendChild(imgLikes);
    imgCard.appendChild(imgInfo);

    return imgCard;
  }
}

// Classe pour les images
class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  getMediaDOM() {
    const imgCard = this.createMediaCard();
    const media = document.createElement("img");
    media.className = "gallery-item";
    media.setAttribute("src", this.path + this.image);
    media.setAttribute("alt", this.title);
    media.setAttribute("tabindex", 0);
    imgCard.prepend(media);
    return imgCard;
  }
}

// Classe pour les vidéos
class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  getMediaDOM() {
    const imgCard = this.createMediaCard();
    const media = document.createElement("video");
    media.className = "gallery-item";
    media.setAttribute("src", this.path + this.video);
    media.setAttribute("tabindex", 0);
    imgCard.prepend(media);
    return imgCard;
  }
}

// Classe Factory
export class MediaFactory {
  static createMedia(data) {
    if (data.image) {
      return new ImageMedia(data);
    } else if (data.video) {
      return new VideoMedia(data);
    } else {
      throw new Error("Type de média non supporté");
    }
  }
}
