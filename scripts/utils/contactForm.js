function displayModal(modalId) {
  const getPhotographerName = document.querySelector(".photographerNameHero").textContent;
  const contactMeElement = document.querySelector(".photographerNameForm");
  contactMeElement.innerHTML = getPhotographerName;

  const modal = document.querySelector(`#${modalId}`);
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  modal.showModal();
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  header.setAttribute("aria-hidden", "true");
  main.setAttribute("aria-hidden", "true");
}

function closeModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  modal.close();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  header.setAttribute("aria-hidden", "false");
  main.setAttribute("aria-hidden", "false");
}

export { displayModal, closeModal };