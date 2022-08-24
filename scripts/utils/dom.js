// Function for build DOM
function insertPictureInsideElement(element, picture) {
    element.insertAdjacentHTML("beforeend", '<img src="' + picture + '">');
}

function insertVideoInsideElement(element, video) {
    element.insertAdjacentHTML("beforeend", '<video src="' + video + '">');
}

function insertHTMLAfterElement(element, html) {
    element.insertAdjacentHTML("afterend", html);
}

function buildElement(balise, value) {
    // Create balise
    const element = document.createElement(balise);

    // Set Attribute or TextContened depend of balise
    switch (balise) {
        case "a":
            element.setAttribute("href", value);
            break;
        case "img":
            element.setAttribute("src", value);
            break;
        default:
            element.textContent = value;
    }
    return element;
}

function setInnerHtml(querySelector, texte) {
    const texteElement = document.querySelector(querySelector);
    texteElement.innerHTML = texte;
}
// End Function for build DOM