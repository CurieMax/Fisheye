function photographerTemplate(data) {
  console.log(data, "data");
  const { name, portrait, country, city, tagline, price, id } = data;

  const picture = `./src/assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add("photographer-profile");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.classList.add("photographer-name");
    const location = document.createElement("p");
    location.textContent = `${country}, ${city}`;
    location.classList.add("photographer-location");
    const tagLine = document.createElement("p");
    tagLine.textContent = tagline;
    tagLine.classList.add("photographer-tagline");
    const img = document.createElement("img");
    img.classList.add("photographer-portrait");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", `Image of photographer ${name}`);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(tagLine);
    const contactButton = document.querySelector(".contact_button");
    console.log(contactButton, "contactButton");
    contactButton.insertAdjacentElement("afterend", img);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
