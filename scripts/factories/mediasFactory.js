function profileFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const headerPh = document.querySelector('.photograph-header');
        const profile = document.createElement('div');
            profile.style.margin = "auto 0";
            profile.style.ordre = "1" ; 

        const img = document.createElement('img');
            img.setAttribute("src", picture); 
            img.style.width = "200px";
            img.style.height = "200px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "50%";
            img.style.margin = "auto 0";
            img.style.order = "3"; 

        const photographerName = document.createElement('h2');
            photographerName.textContent = name;
            photographerName.style.fontSize = "64px";
            photographerName.style.color = "#D3573C";

        const photographerCity = document.createElement('p');
            photographerCity.textContent = city + ', ' + country; 
            photographerCity.style.fontSize = "24px";
            photographerCity.style.color = "#D3573C";

        const photographerTagline = document.createElement('p');
            photographerTagline.textContent = tagline;
            photographerTagline.style.fontSize = "18px";
            photographerTagline.style.marginTop = "20px";

        const photographerPrice = document.createElement('p');
            photographerPrice.textContent = price + '€/jour';

        profile.appendChild(photographerName);
        profile.appendChild(photographerCity);
        profile.appendChild(photographerTagline);
        headerPh.appendChild(profile);
        headerPh.appendChild(img);
        
        return (profile);
        
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

