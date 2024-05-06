function photographerTemplate(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;
    
    // Création des éléments de la page d'accueil
    const lien = document.createElement('a');
    lien.setAttribute("href", `photographer.html?id=${id}`);
    lien.classList.add('photographer_link');
    const article = document.createElement( 'article' );
    const img = document.createElement( 'img' );
    img.setAttribute("src", picture);
    const h2 = document.createElement( 'h2' );
    h2.textContent = name;
    const localisation = document.createElement('h3');
    localisation.textContent = `${city}, ${country}`;
    const accroche = document.createElement('blockquote');
    accroche.textContent = tagline;
    const tarif = document.createElement('p');
    tarif.textContent = `${price}€/jour`;

    // Ajout des éléments pour le header de la page photographe
    const informations = document.createElement('div');
    informations.classList.add('informations_photographe');

    function getUserCardDOM() {

        lien.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(accroche);
        article.appendChild(tarif);

        return (lien);
    }

    function getUserPageDOM() {
        informations.appendChild(h2);
        informations.appendChild(localisation);
        informations.appendChild(accroche);

        return (informations);
    }

    function getUserImg() {
        return (img);
    }

    return { id, name, picture, city, country, tagline, price, getUserCardDOM, getUserPageDOM, getUserImg}
}

function mediasTemplate(data2) {
    const {photographerId, title, image, video } = data2;
    
    console.log("data2 TEMPLATE:", data2);
    console.log("photographerId: ", photographerId);
    // Ajout des éléments pour l'affichage des photos des phographes
    const portfolio = document.createElement('div');
    
    const photos = document.createElement('img');
    photos.setAttribute("src", `assets/photos/Sample_Photos/${photographerId}/${image}`);
    const videos = document.createElement('video');
    videos.setAttribute("src", `assets/photos/Sample_Photos/${photographerId}/${video}`);
    const titre = document.createElement('p');
    titre.textContent = title;
    console.log(title);
    const like = document.createElement('div');

    function getUserPhotos() {
        if (photos !== undefined) {
            portfolio.appendChild(photos);
        }
        if (videos !== undefined) {
            portfolio.appendChild(videos);
        }
        portfolio.appendChild(titre);
        portfolio.appendChild(like);

        return (portfolio);
    }

    return { photographerId, title, image, video, getUserPhotos}
}