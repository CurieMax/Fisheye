class videoTemplate {
  constructor(media) {
      this._media = media;
  }

  createCardVideoCollection() {
      const fichesImage = document.querySelector(".collection");
      const dataElement = document.createElement("a");
      dataElement.classList.add("myCurrentImage");
  
      const videoElement = document.createElement("video");
      videoElement.classList.add("fit_video");
  
      const titlelikes = document.createElement("div");
      const title = document.createElement("p");
      const likes = document.createElement("p");
      const iconElement = document.createElement('i');
      titlelikes.classList.add("title");

      if (this._media.video) {
          videoElement.src = `./assets/images/${this._media.video}`;
          videoElement.autoplay = false;
          videoElement.controls = true;
          videoElement.width = 300;
          videoElement.height = 400;
          title.innerText = `${this._media.title}  `;
          likes.innerText = ` ${this._media.likes}`;
          iconElement.classList.add('fas', 'fa-heart', 'btnLike');
          iconElement.setAttribute('data-id', this._media.id);
          fichesImage.appendChild(dataElement);
          dataElement.appendChild(videoElement);
          dataElement.appendChild(titlelikes);
          titlelikes.appendChild(title);
          titlelikes.appendChild(likes);
          likes.appendChild(iconElement);
      }
  }
}
