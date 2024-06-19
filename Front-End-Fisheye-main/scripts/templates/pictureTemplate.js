class pictureTemplate {
  constructor(media) {
      this._media = media;
  }

  createCardPhotoCollection() {
      const fichesImage = document.querySelector(".collection");
      const dataElement = document.createElement("a");
      dataElement.classList.add("myCurrentImage");
      const imageElement = document.createElement("img");
      imageElement.classList.add("fit_picture");
  
      const titlelikes = document.createElement("div");
      const title = document.createElement("p");
      const likes = document.createElement("p");
      const iconElement = document.createElement('i');
      titlelikes.classList.add("title");

      if (this._media.image) {
          imageElement.src = `./assets/images/${this._media.image}`;
          title.innerText = `${this._media.title}  `;
          likes.innerText = ` ${this._media.likes}`;
          iconElement.classList.add('fas', 'fa-heart', 'btnLike');
          iconElement.setAttribute('data-id', this._media.id); // Set data-id attribute
        //   likes.classList.add("likes");
          fichesImage.appendChild(dataElement);
          dataElement.appendChild(imageElement);
          dataElement.appendChild(titlelikes);
          titlelikes.appendChild(title);
          titlelikes.appendChild(likes);
          likes.appendChild(iconElement);
      }
  }
}
