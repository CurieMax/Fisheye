let url = new URLSearchParams(window.location.search);
let photographerId = url.get('id');

async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json();

    const { photographers, media} = data;

    console.log("Photographers:", photographers);
    console.log("Media:", media);
    return {photographers, media };
}

async function displayData(photographers, media) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerMedias = document.querySelector(".photograph-medias");

    console.log("Photographer ID:", photographerId);
    console.log("Photographers:", photographers);
    console.log("Media:", media);

    let photographerSelectionne = photographers.find(photographer => photographer.id == photographerId);
    let mediaPhotographe = media.filter(photos => photos.photographerId == photographerId)
    
    console.log("Photographer Selectionne:", photographerSelectionne);
    console.log("Media du photographe:", mediaPhotographe);
    
    const photographerModel = photographerTemplate(photographerSelectionne);
    const userPageDOM = photographerModel.getUserPageDOM();
    const userImg = photographerModel.getUserImg();

    mediaPhotographe.forEach(medias => {
        const photographerMediaModel = mediasTemplate(medias);
        const usermedia = photographerMediaModel.getUserPhotos();
        photographerMedias.appendChild(usermedia);
    });

    photographerHeader.appendChild(userPageDOM);
    photographerHeader.appendChild(userImg);
    photographerHeader.insertBefore(userPageDOM, photographerHeader.firstChild );


}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    await displayData(photographers, media);
}

init();

