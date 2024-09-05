const gallery = document.querySelector(".gallery");

export function mediaTemplate(data) {
    const {id, photographerId, title, image, likes, date, price} = data;

    const photographMedia = `assets/media/${image}`;

    function getMediaDOM() {
    const imageCard = document.createElement("div");
    imageCard.classList.add("image-card");

    const img = document.createElement("img");
    img.setAttribute("src", photographMedia);
    img.alt = title;

    const imageInfo = document.createElement("div");
    imageInfo.classList.add("image-info");

    const imageTitle = document.createElement("span");
    imageTitle.classList.add("image-title");
    imageTitle.textContent = title;

    const imageLikes = document.createElement("span");
    imageLikes.classList.add("image-likes");
    imageLikes.textContent = `${likes} <i class="fa-solid fa-heart"></i>`;

    imageInfo.appendChild(imageTitle);
    imageInfo.appendChild(imageLikes);
    imageCard.appendChild(img);
    imageCard.appendChild(imageInfo);

    return imageCard;
}

    
}