// mediafactory return la function videoTemplate
// et imageTemplate sinon return null si pas de data en parametre 



function mediaFactory(data) {
    if (!data) {
        return null;
    }
    
    if (data.video) {
        return new videoTemplate(data);
    }
    
    if (data.image) {
        return new pictureTemplate(data);
    }
    
    console.warn('No valid media type found in data');
    return null;
}
