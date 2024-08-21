function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
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
        
        article.appendChild(p);
        article.appendChild(idPhoto);
        article.appendChild(h2);
        article.appendChild(p);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}