export class MediaFactory {
    /**
     * Crée un élément média (image ou vidéo) selon le type de média.
     * @param {Object} media - L'objet média contenant les informations nécessaires (type, source, titre, etc.).
     * @return {HTMLElement} - L'élément HTML à insérer dans la galerie (img ou video).
     */
    static createMedia(media) {
      if (media.type === 'image') {
        return new ImageMedia(media).createMediaElement();
      } else if (media.type === 'video') {
        return new VideoMedia(media).createMediaElement();
      } else {
        throw new Error("Type de média non supporté");
      }
    }
  }

  export class ImageMedia {
    constructor(media) {
      this.media = media;
      this.src = media.src;
      this.title = media.title;
      this.date = media.date;
      this.likes = media.likes;
    }
  
    createMediaElement() {
      const imgElement = document.createElement('img');
      imgElementElement.src = this.media.src;
      imgElement.alt = this.media.title;
      return imgElement;
    }
  }
  
  export class VideoMedia {
    constructor(media) {
      this.media = media;
      this.src = media.src;
      this.title = media.title;
      this.date = media.date;
      this.likes = media.likes;
    }
  
    createMediaElement() {
      const videoElement = document.createElement('video');
      videoElement.src = this.media.src;
      videoElement.alt = this.media.title;
      videoElement.controls = true;
      return videoElement;
    }
  }

