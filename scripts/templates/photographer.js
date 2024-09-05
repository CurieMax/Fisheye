/**
 * Creates a template for a photographer's profile.
 *
 * @param {object} data - An object containing the photographer's data.
 * @param {string} data.name - The photographer's name.
 * @param {string} data.portrait - The photographer's portrait image.
 * @param {string} data.city - The photographer's city.
 * @param {string} data.country - The photographer's country.
 * @param {string} data.tagline - The photographer's tagline.
 * @param {number} data.price - The photographer's price per day.
 * @param {number} data.id - The photographer's ID.
 * @return {object} An object containing the photographer's data and a function to get the user card DOM.
 */
export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    /**
     * Creates a DOM element representing a photographer's profile card.
     *
     * @param {object} data - An object containing the photographer's data.
     * @param {string} data.id - The photographer's ID.
     * @param {string} data.name - The photographer's name.
     * @param {string} picture - The photographer's picture.
     * @return {HTMLElement} The DOM element representing the photographer's profile card.
     */
    function getUserCardDOM() {
        // Création élément <a> pour envelopper l'article et le rendre cliquable
        const link = document.createElement( 'a' );
        // URL de déstination pour le lien en utilisant l'id du photographe
        link.setAttribute("href", "photographer.html?id="+data.id);
        // Accessibilité
        link.setAttribute("aria-label", "Voir le profil de" +name);
        const article = document.createElement( 'article' );
        const idPhoto = document.createElement('span');
        idPhoto.className = "photographer_id";
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.alt = "Portrait de "+name
        idPhoto.appendChild(img)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        const location = document.createElement ('span');
        const tagline = document.createElement ('span');
        const price = document.createElement ('span');
        location.textContent = `${data.city}, ${data.country}`;
        tagline.textContent = data.tagline;
        price.textContent = `${data.price}€/jour`;
        location.className = "location";
        tagline.className = "tagline";
        price.className = "price";
        p.appendChild(location);
        p.appendChild(tagline);
        p.appendChild(price);
        
        // Ajouter les éléments au contenu de l'article
        
        article.appendChild(idPhoto);
        article.appendChild(h2);
        article.appendChild(p);
        
        // Placez l'article dans le lien
        link.appendChild(article);
        
        // Retourner le lien
        return link;
    }

    function getUserCardSolo() {
        const photographInfo = document.createElement('div');
        photographInfo.className = "photograph_info";

        // Titre du photographe
        const h2 = document.createElement('h2');
        h2.textContent = name;

        // Création des éléments de localisation et de tagline
        const p = document.createElement('p');
        const localisation = document.createElement('span');
        const tag = document.createElement('span');

        localisation.textContent = `${city}, ${country}`;
        tag.textContent = tagline;

        // Ajout des classes pour le style
        localisation.className = "location";
        tag.className = "tagline";

        // Ajout des éléments dans le paragraphe
        p.appendChild(localisation);
        p.appendChild(tag);

        // Ajout du titre et du paragraphe dans le conteneur info
        photographInfo.appendChild(h2);
        photographInfo.appendChild(p);

        // Création de l'image de profil
        const idPhoto = document.createElement('div');
        idPhoto.className = "photographer_photo";
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        idPhoto.appendChild(img);
        

        // Retourne les éléments créés
        return { photographInfo, idPhoto };
    }

    return { name, picture, city, country, tagline, price, getUserCardDOM, getUserCardSolo };
}

export function mediaTemplate(data) {
    const { id, title, image, date, price, likes } = data;
    const picture = `assets/media/${image}`;
    const link = `photographer.html?id=${id}`;

    function getMediaCardDOM() {
        const imgCard = document.createElement('div');
        imgCard.className = "image-card";

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);

        const imgInfo = document.createElement('div');
        imgInfo.className = "image-info";

        const imgTitle = document.createElement('span');
        imgTitle.className = "image-title";
        imgTitle.textContent = title;

        const imgLikes = document.createElement('span');
        imgLikes.className = "image-likes";
        imgLikes.textContent = `${likes} ♥`;



        imgInfo.appendChild(imgTitle);
        imgInfo.appendChild(imgLikes);
        imgCard.appendChild(img);
        imgCard.appendChild(imgInfo);
        return imgCard;
        
    }
    return { id, title, picture, link, date, price, likes, getMediaCardDOM };
}