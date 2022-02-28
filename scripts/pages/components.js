/* Import factories */
import { LayoutsFactory } from "../factories/layoutsFactory.js";
import { ComponentsFactory } from "../factories/componentsFactory.js";
import { textfieldFactory } from "../factories/textfieldFactory.js";
import { likeBtnFactory } from "../factories/likeBtnFactory.js";
import { sortBtnFactory } from "../factories/sortBtnFactory.js";
import { btnFactory } from "../factories/btnFactory.js";
import { logoFactory } from "../factories/logoFactory.js";
import { avatarFactory } from "../factories/avatarFactory.js";
import { userNameFactory } from "../factories/userNameFactory.js";
import { userLocationFactory } from "../factories/userLocationFactory.js";
import { userTaglineFactory } from "../factories/userTaglineFactory.js";

function displayComponents() {
    /* Facotries initialisation */
    const layoutsFactory = new LayoutsFactory();
    const componentsFactory = new ComponentsFactory();

    /* Create the components layout and add it to the body */
    const componentsContainer = layoutsFactory.getComponentsContainerDOM();
    document.querySelector("body").prepend(componentsContainer);

    /* Create the textfield component and add it to its container */
    const textfieldContainer = document.querySelector(".components-container__textfield");
    const textfield = componentsFactory.getTextfieldDOM("Prénom", false);
    textfieldContainer.appendChild(textfield);

    const buttonsContainer = document.querySelector(".components-container__buttons");
    const likeBtn = likeBtnFactory(12, true);
    const sortBtn = sortBtnFactory();
    const btn = btnFactory("Contactez-moi");

    buttonsContainer.appendChild(likeBtn);
    buttonsContainer.appendChild(sortBtn);
    buttonsContainer.appendChild(btn);

    const logoContainer = document.querySelector(".components-container__logo");
    const logo = logoFactory();

    logoContainer.appendChild(logo);

    const cardsContainer = document.querySelector(".components-container__cards");
    const cardComponentsContainer = document.querySelector(".card-components");

    const avatar = avatarFactory("../../assets/photographers/MarcelNikolic.jpg", "Marcel Nikolic");
    const userName = userNameFactory("Marcel Nikolic");
    const userLocation = userLocationFactory("Berlin, Germany");
    const userTagline = userTaglineFactory("Toujours à la recherche de LA photo");

    cardComponentsContainer.appendChild(avatar);
    cardComponentsContainer.appendChild(userName);
    cardComponentsContainer.appendChild(userLocation);
    cardComponentsContainer.appendChild(userTagline);

    cardsContainer.appendChild(cardComponentsContainer);
}

function init() {
    displayComponents();
}

init();
