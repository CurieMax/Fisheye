
function createElements(...args) {

    let listOfElements = []
    args.forEach(arg => listOfElements.push(document.createElement(arg)))

    return listOfElements
}


function setAttributes([ ...args ]= []) {
    args.forEach(arg => arg.attributes.forEach(attribute => 
        arg.element.setAttribute(attribute[0], attribute[1])))
}


function attachContent([ ...args ]) {
    args.forEach(arg => arg.element.textContent = arg.content)
}


function addClasses([ ...args ]) {
    args.forEach(arg => arg.element.classList.add(arg.classes))        
}


function appendChilds([ ...args ]) {
    args.forEach(arg => arg.childs.forEach(child => arg.element.appendChild(child)))
}

export { createElements, setAttributes, attachContent, addClasses, appendChilds } 