class PhotographerCard {
    constructor(photographer) {
      this._photographer = photographer;
    }
  
    createPhotographerCard() {
      // Recupération de l'élement du Dom Qui accuellera les fiches
      const sectionFiches = document.querySelector(".photographer_section");
  
      // Création d’une balise dédiée les photographes
      const dataElement = document.createElement("a");
 

      dataElement.href = `./photographer.html?id=${this._photographer.id}`;
  
      const imageElement = document.createElement("img");
      imageElement.src = this._photographer.portrait;

      imageElement.alt = `${this._photographer.name}`;
  
      const namePhotographer = document.createElement("h2");
      namePhotographer.innerText = this._photographer.name;
  
      const cityCountryPhotographer = document.createElement("h3");
      cityCountryPhotographer.innerText = `${this._photographer.city}, ${this._photographer.country}`;
  
      const descriptionElement = document.createElement("h4");
      descriptionElement.innerText = this._photographer.tagline;
  
      const priceElement = document.createElement("p");
      priceElement.innerText = `${this._photographer.price} €/jour`;
  
      // rattacher la balise article à la sectionfiches 
      sectionFiches.appendChild(dataElement);
  
      // rattacher img et description à dataElement
      dataElement.appendChild(imageElement);
      dataElement.appendChild(namePhotographer);
      dataElement.appendChild(cityCountryPhotographer);
      dataElement.appendChild(descriptionElement);
      dataElement.appendChild(priceElement);
    }
  }
        // This section can be expanded based on how you want to handle the data
       
       
    
   
