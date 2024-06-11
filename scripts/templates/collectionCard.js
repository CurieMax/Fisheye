
class collection_data_photo_Card {
    constructor(photographer) {
      this._photographer = photographer;
    }

// Afficher  data photographer 
 create_data_photo_collection(){
    //Recupération de l'élement du Dom Qui accuellera la fiche
const fichesImage = document.querySelector(".image_photographer");
 // Création d’une balise dédiée les photographes
const imageElement = document.createElement("img");
imageElement.src = this._photographer.portrait;

// rattacher la balise article à la section
fichesImage.appendChild(imageElement);


// Création data
const fichesData = document.querySelector(".data_photographer");

const namePhotographer = document.createElement("h2");
namePhotographer.innerText=this._photographer.name;
const citycountryPhotographer = document.createElement("h1");
citycountryPhotographer.innerText = `${this._photographer.city} , ${this._photographer.country}` ;
const descriptionElement = document.createElement("h3");
descriptionElement.innerText = this._photographer.tagline;

fichesData.appendChild(namePhotographer);
fichesData.appendChild(citycountryPhotographer);
fichesData.appendChild(descriptionElement);

} 
}








