const urlParams = new URLSearchParams(window.location.search);
const identify = urlParams.get('id');
console.log(identify);
const select = document.getElementById('select');
const filter = select.value;


class App {
    constructor() {
        
        this.photographerApi = new PhotographerApi('./data/photographers.json')
        console.log(this.photographerApi);
        
    }
   
    async main() {
      
    //je récuperer mes data de fichier photographers.json   
    let collection = [];    
     const  photographe_data = await this.photographerApi.getphotographer();
     const dataMedia = photographe_data.data_media;
     const dataPhotographer = photographe_data.data;
     const data_photo_collection = dataPhotographer.find((element) => element.id == identify);
    console.log(data_photo_collection);
   
    const photo_grapher = new photographer( data_photo_collection);
    const collectioncard = new collection_data_photo_Card(photo_grapher);
    collectioncard.create_data_photo_collection();



    const media = dataMedia.filter(element => element.photographerId == identify);
    collection = media;

    console.log(media);
   
    for (let i = 0; i < collection.length; i++){
        const images = collection[i];
       
        const collectioncard = new media_collection(images);
        collectioncard.create_data_photo_collection();
    
                 }

    }
    }
                    //Recupération de l'élement du Dom Qui accuellera les fiches
    
    // Création d’une balise dédiée les photographes
   


const app = new App();
app.main();