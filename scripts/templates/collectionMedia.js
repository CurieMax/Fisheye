class media_collection{
    constructor(media) {
      this._media = media;
    }
  
    create_data_photo_collection(){
      //Recupération de l'élement du Dom 
    const fichesImage = document.querySelector(".collection");
    
    // Création d’une balise dédiée les photos avec description
    const dataElement = document.createElement("a");
    dataElement.classList.add("myCurrentImage");
    const imageElement = document.createElement("img");
    const videoElement = document.createElement("video");
    imageElement.classList.add("fit_picture");
    
    const titlelikes = document.createElement("div");
    const title = document.createElement("p");
    const likes = document.createElement("p");
    const iconElement = document.createElement('i');
    titlelikes.classList.add("title");
    if(this._media.image ){
    
    imageElement.src = `./assets/images/${this._media.image}`;
    
    title.innerText = `${this._media.title}  `;
    likes.innerText = ` ${this._media.likes}`;
    iconElement.classList.add('fas', 'fa-heart', 'red-icon', 'number');
    likes.classList.add("number");
    fichesImage.appendChild(dataElement);
    dataElement.appendChild(imageElement);
    dataElement.appendChild(titlelikes);
    titlelikes.appendChild(title);
    titlelikes.appendChild(likes);
    likes.appendChild(iconElement);
    }
    
    else if(this._media.video ){
    
    videoElement.src = `./assets/images/${this._media.video}`;
    videoElement.autoplay = true;
    videoElement.controls = true;
    videoElement.width = 300;
    videoElement.height = 300;
    title.innerText = `${this._media.title}  `;
    likes.innerText = ` ${this._media.likes}`;
    iconElement.classList.add('fas', 'fa-heart', 'red-icon', 'number');
    likes.classList.add("number");
    fichesImage.appendChild(dataElement);
    dataElement.appendChild(videoElement);
    dataElement.appendChild(titlelikes);
    titlelikes.appendChild(title);
    titlelikes.appendChild(likes);
    likes.appendChild(iconElement);
    }
    else{ return ""};
    
    } 
  }