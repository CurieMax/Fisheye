class App {
    constructor() {
        
        this.photographerApi = new PhotographerApi('./data/photographers.json')
       
    }
   
    async main() {
    //je récuperer mes data de fichier photographers.json       
     const  photographe_data = await this.photographerApi.getphotographer();
     const dataPhotographer = photographe_data.data;
    console.log(dataPhotographer);
    // 
         
    
    for (let i = 0; i < dataPhotographer.length; i++){
        const photo_grapher = new photographer(dataPhotographer[i]);
        const photographerCard = new PhotographerCard(photo_grapher);
        photographerCard.createPhotographerCard();
       }
    }
    }
                    //Recupération de l'élement du Dom Qui accuellera les fiches
    
    // Création d’une balise dédiée les photographes
   


const app = new App();
app.main();