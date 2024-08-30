const form = document.getElementById("contact_form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("mail");
const message = document.getElementById("message");
const errors = document.querySelectorAll(".error");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
};

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    form.reset();
};

const showErrorMessage = (element, message) => {
  element.classList.add("error");
  element.nextElementSibling.textContent = message;
};

const hideErrorMessage = (element) => {
  element.classList.remove("error");
  element.nextElementSibling.textContent = "";
};



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
  
  return false
};

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
  
  return false
};
  

function validationEmail() {
  const reTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!reTest.test(email.value)) {
    showErrorMessage(email, "Veuillez renseigner une adresse email valide");
  } else if (email.value === "") {
    showErrorMessage(email, "Veuillez renseigner ce champ");
  } else {
    hideErrorMessage(email);
    return true;
  }
  
  return false
};

function validationMessage() {
  if (message.value === "") {
    showErrorMessage(message, "Veuillez renseigner ce champ");
    return false;
  } else {
    hideErrorMessage(message);
    return true;
  }
};

function validateInput () {
  let isValidFirstName = validationFirstName();
  let isValidLastName = validationLastName();
  let isValidEmail = validationEmail();
  let isValidMessage = validationMessage();
  if (isValidFirstName && isValidLastName && isValidEmail && isValidMessage) {
    return true;
  }
  return false;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateInput()) {
    closeModal();
  }
});

init();