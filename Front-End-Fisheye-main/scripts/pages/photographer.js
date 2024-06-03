

const urlParams = new URLSearchParams(window.location.search);
const identify = urlParams.get('id');
// console.log(identify);
const select = document.getElementById('select');
const filter = select.value;

console.log(filter);
 fetch('./data/photographers.json').then((res) => (res.json())).then((object) => {
 const data = object["photographers"];
 const article = data.find((element) => element.id == identify);
 //afficher le photographer
 data_photographe(article);
 const dataMedia = object["media"];
 const media = dataMedia.filter(element => element.photographerId == identify);

 
 // recuperer liste media et affichier les images 
filter_title(media , filter);
filter_date(media , filter);
filter_likes(media);

list_photographer(media);
console.log(media);


 });

 // trier par titre
 function filter_title(tableau, filter){
   if(filter === 'titre') {tableau.sort((a, b) => {
       let titreA = a.title.toLowerCase();
      let titreB = b.title.toLowerCase();
 if (titreA  < titreB) {
       return -1;
   }
    if (titreA  > titreB) {
         return 1;
    }
     return 0;
   })}

   }

 // trier par date
 function filter_date(tableau, filter) {
    if(filter ==='Date'){tableau.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
    }) }
   
}
 // trier par popularité
 function filter_likes(tableau) {
    if(filter === 'Popularité'){tableau.sort((a, b) => {
        return b.likes - a.likes;
    })}}
   

// recuperer liste media et affichier les images
function list_photographer(media){
    for (let i = 0; i < media.length; i++){
        const images = media[i];
        albumPhotographe(images);
          }
}


function  data_photographe(article){
    //Recupération de l'élement du Dom Qui accuellera les fiches
const fichesImage = document.querySelector(".image_photographer");
 // Création d’une balise dédiée les photographes
const imageElement = document.createElement("img");
imageElement.src = `./assets/photographers/${article.portrait}`;

// rattacher la balise article à la section
fichesImage.appendChild(imageElement);


// Création data
const fichesData = document.querySelector(".data_photographer");

const namePhotographer = document.createElement("h2");
namePhotographer.innerText=article.name;
const citycountryPhotographer = document.createElement("h1");
citycountryPhotographer.innerText = `${article.city} , ${article.country}` ;
const descriptionElement = document.createElement("h3");
descriptionElement.innerText = article.tagline;

//rattacher img et description à pieceElement
// imageElement.appendChild(imageElement);

fichesData.appendChild(namePhotographer);
fichesData.appendChild(citycountryPhotographer);
fichesData.appendChild(descriptionElement);

} 

//

function  albumPhotographe(article){
   //Recupération de l'élement du Dom Qui accuellera les fiches
const fichesImage = document.querySelector(".images");

// Création d’une balise dédiée les photos avec description
const dataElement = document.createElement("a");
const imageElement = document.createElement("img");
const videoElement = document.createElement("video");

const titlelikesImage = document.createElement("div");
const titleImage = document.createElement("p");
const likesImage = document.createElement("p");
const iconElement = document.createElement('i');
titlelikesImage.classList.add("title");
if(article.image ){

imageElement.src = `./assets/SamplePhotos/${article.image}`;
titleImage.innerText = `${article.title}  `;
likesImage.innerText = ` ${article.likes}`;
iconElement.classList.add('fas', 'fa-heart', 'red-icon', 'number');
likesImage.classList.add("number");
fichesImage.appendChild(dataElement);
dataElement.appendChild(imageElement);
dataElement.appendChild(titlelikesImage);
titlelikesImage.appendChild(titleImage);
titlelikesImage.appendChild(likesImage);
likesImage.appendChild(iconElement);
 }
 
else if(article.video ){

videoElement.src = `./assets/SamplePhotos/${article.video}`;
videoElement.autoplay = true;
videoElement.controls = true;
videoElement.width = 300;
videoElement.height = 300;
titleImage.innerText=article.title;
fichesImage.appendChild(dataElement);
dataElement.appendChild(videoElement);
dataElement.appendChild(titlelikesImage);
dataElement.appendChild(iconElement);
}
else{ return ""};

} 




