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
                  
    const acceuil = document.querySelector(".logo");
    acceuil.addEventListener('click', () => {
        // Redirect to the homepage URL
        window.location.href = "index.html"; // Replace with your homepage URL
    });
   


const app = new App();
app.main();