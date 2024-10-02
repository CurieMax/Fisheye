const form = document.getElementById("contact_form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("mail");
const message = document.getElementById("message");
const errors = document.querySelectorAll(".error");
const body = document.querySelector("body");
const main = document.getElementById("main");
const closeImg = document.querySelector(".close");
const header = document.querySelector("header");
/**
 * Displays the contact modal by setting its display style to block.
 *
 * @return {void}
 */
export function displayModal(photographer) {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("tabindex", "0");
  // Bloquer le scroll de la page
  body.style.overflow = "hidden"; 

  closeImg.setAttribute("tabindex", "0");
  
  // passer la navigation du modal en priorité
  modal.focus();
  header.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      modal.focus();
    }
  });
  main.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      modal.focus();
    }
  });

  document.addEventListener("keydown", modalKeydown);
}

function modalKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

/**
 * Closes the contact modal by setting its display style to none and resets the form.
 *
 * @return {void} This function does not return anything.
 */
export function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  form.reset();

  // Relever le scroll de la page
  document.body.style.overflow = "auto";

  header.setAttribute("tabindex", "0");
  document.removeEventListener("keydown", modalKeydown);

}

/**
 * Displays an error message next to the specified element.
 *
 * @param {HTMLElement} element - The element next to which the error message will be displayed.
 * @param {string} message - The error message to be displayed.
 * @return {void}
 */
const showErrorMessage = (element, message) => {
  element.classList.add("error");
  element.nextElementSibling.textContent = message;
};

/**
 * Hides the error message by removing the "error" class from the specified element and clearing its next sibling's text content.
 *
 * @param {HTMLElement} element - The element to hide the error message for.
 * @return {void} This function does not return anything.
 */
const hideErrorMessage = (element) => {
  element.classList.remove("error");
  element.nextElementSibling.textContent = "";
};

/**
 * Validates the first name input field.
 *
 * @return {boolean} true if the first name is valid, false otherwise
 */
function validationFirstName() {
  const reTest = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

  if (!reTest.test(firstName.value)) {
    showErrorMessage(firstName, "Veuillez renseigner un prénom valide");
  } else if (firstName.value === "") {
    showErrorMessage(firstName, "Veuillez renseigner ce champ");
  } else if (firstName.value.length < 2) {
    showErrorMessage(firstName, "Veuillez renseigner au moins 2 caractères");
  } else {
    hideErrorMessage(firstName);
    return true;
  }

  return false;
}

/**
 * Validates the last name input field.
 *
 * @return {boolean} true if the last name is valid, false otherwise
 */
function validationLastName() {
  const reTest = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

  if (!reTest.test(lastName.value)) {
    showErrorMessage(lastName, "Veuillez renseigner un nom valide");
  } else if (lastName.value === "") {
    showErrorMessage(lastName, "Veuillez renseigner ce champ");
  } else if (lastName.value.length < 2) {
    showErrorMessage(lastName, "Veuillez renseigner au moins 2 caractères");
  } else {
    hideErrorMessage(lastName);
    return true;
  }

  return false;
}

/**
 * Validates the email input field.
 *
 * @return {boolean} true if the email is valid, false otherwise
 */
function validationEmail() {
  const reTest =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reTest.test(email.value)) {
    showErrorMessage(email, "Veuillez renseigner une adresse email valide");
  } else if (email.value === "") {
    showErrorMessage(email, "Veuillez renseigner ce champ");
  } else {
    hideErrorMessage(email);
    return true;
  }

  return false;
}

/**
 * Validates the message input field.
 *
 * @return {boolean} true if the message is valid, false otherwise
 */
function validationMessage() {
  if (message.value === "") {
    showErrorMessage(message, "Veuillez renseigner ce champ");
    return false;
  } else {
    hideErrorMessage(message);
    return true;
  }
}

/**
 * Validates the entire contact form input.
 *
 * @return {boolean} true if the form input is valid, false otherwise
 */
function validateInput() {
  let isValidFirstName = validationFirstName();
  let isValidLastName = validationLastName();
  let isValidEmail = validationEmail();
  let isValidMessage = validationMessage();
  if (isValidFirstName && isValidLastName && isValidEmail && isValidMessage) {
    return true;
  }
  return false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formInput = event.target;
  const formData = new FormData(formInput);

  formData.forEach((value, key) => {
    console.log(key + " : " + value);
  });

  if (validateInput()) {
    closeModal();
  }
});
