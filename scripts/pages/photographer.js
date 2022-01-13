const currentUrl = new URL(window.location.href);
const photographerId = parseInt(currentUrl.searchParams.get("id"));

//Mettre le code JavaScript lié à la page photographer.html
async function displayPhotographer() {
  const photographer = new Photographer(await getPhotographer());
  console.log(photographer);
  document.getElementById("description").innerHTML +=
    photographer.getPhotographerDetailsDOM();
  document
    .getElementById("profile-pic")
    .setAttribute("src", photographer.getPortraitUrl());
  document.getElementById("price-count").innerText =
    photographer.getFormattedPrice();
  document.getElementsByTagName("title")[0].innerText =
    photographer.getPageName();
}

//call API avec le photographe sélectionné
async function getPhotographer() {
  const jsonData = await (await fetch("../../data/photographers.json")).json();
  const jsonPhotographer = jsonData.photographers.find(
    (photographer) => photographer.id == photographerId
  );
  return jsonPhotographer;
}

displayPhotographer();
