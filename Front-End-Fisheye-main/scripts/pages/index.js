
  
  // Récupération des pièces depuis le fichier JSON
  let data = [];
const dataphotographer = async() => { await fetch('./data/photographers.json').then(response => response.json() ).then((object) => {
         for (let i = 0; i < object["photographers"].length; i++){
           const article = object["photographers"][i];
             templatephotographe(article);
         
        }});}
dataphotographer();
   
        




function  templatephotographe(article){
        //Recupération de l'élement du Dom Qui accuellera les fiches
    const sectionFiches = document.querySelector(".photographer_section");
     // Création d’une balise dédiée les photographes
    const dataElement = document.createElement("a");
    dataElement.href = `./photographer.html?id=${article.id}`;
     
    const imageElement = document.createElement("img");
    
    imageElement.src = `./assets/photographers/${article.portrait}`;

    
    const namePhotographer = document.createElement("h2");
    namePhotographer.innerText=article.name;
    const citycountryPhotographer = document.createElement("h1");
    citycountryPhotographer.innerText =` ${article.city} , ${article.country}` ;
   
    const descriptionElement = document.createElement("h3");
    descriptionElement.innerText = article.tagline;
    const priceElement = document.createElement("p");
    priceElement.innerText =`${article.price}  €/jour`;
   // rattacher la balise article à la sectionfiches 
    sectionFiches.appendChild(dataElement);
    //rattacher img et description à pieceElement
    dataElement.appendChild(imageElement);
    dataElement.appendChild(namePhotographer);
    dataElement.appendChild(citycountryPhotographer);
    dataElement.appendChild(descriptionElement);
    dataElement.appendChild(priceElement);
   
        }  
   
        
            


        // et bien retourner le tableau photographers seulement une fois récupéré
       


//   async function displayData(photographers) {
//  const photographersSection = document.querySelector(".photographer_section");

//   photographers.forEach((photographer) => {
//   const photographerModel = photographerTemplate(photographer);
//  const userCardDOM = photographerModel.getUserCardDOM();
//  photographersSection.appendChild(userCardDOM);
//   });
//  }

//   async function init() {
//       // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//         displayData(photographers);
//   }
    
//      init();
    
