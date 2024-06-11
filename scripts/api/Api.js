class Api {
    /**
     * 
     * @ parmétre url de fichier json 
     */
    constructor(url) {
        this._url = url
    }

    async get() {
      
          try {
              const response = await fetch(this._url);
                           
              const promise = await response.json();
        
              const data = promise["photographers"];
               const data_media =   promise["media"] ;  
             
        
              return {data , data_media  }
        
            } catch (error) {
              console.error('Error fetching data:', error);
              return [];  // Return an empty array in case of an error
            }
          }
        }
    
    




class PhotographerApi extends Api {
    /**
     * classe photographer qui herite la classe api
     * 
     */
    constructor(url) {
        super(url)
    }

    async getphotographer() {
        return this.get()
    }
}