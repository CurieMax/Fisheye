class media{
    constructor(data){
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._image= data.image;
    this._video= data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    }
    get id(){
        return this._id;
    }
    get photographerId(){
        return this._photographerId;
    }
    get image(){
        return `./assets/photographers/${this._images}`;
    }z
    get video(){
        return `./assets/photographers/${this._video}`;
    }
    get title(){
        return this._title;
    }
    get likes(){
        return this._likes;
    }
    get date(){
        return this._date;
    }
    get price(){
        return this._price;
    }
   
    }