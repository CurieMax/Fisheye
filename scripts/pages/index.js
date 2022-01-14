async function getPhotographers() {
  try {
    await DataManager.loadJson("../../data/photographers.json");
    return DataManager.getPhotographers();
  } catch (err) {
    const errMessage = document.createElement("p");
    errMessage.innerText = err;
    document.getElementById("main").appendChild(errMessage);
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getPhotographerPreview();
    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  displayData(await getPhotographers());
}

init();
