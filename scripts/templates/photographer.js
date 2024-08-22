function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

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
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}