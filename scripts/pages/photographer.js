import { Photographer } from "../models/Photographer.js"
import { API } from "../api/Api.js"
import { createHeader } from "../components/WebsiteHeader.js"
import { ModalDisplayButtons } from "../components/ModalDisplayButtons.js"
import { PhotographerMedia } from "../components/PhotographerMedia.js"

// 1- Variables

// Global variable tracking the medias liked by user
export const likedMediaList = []
export let thatPhotographerMedias = []

const closeModalButton = document.querySelector(".close_modal_button")

// 2- Code moteur
// Adds event listener on corresponding buttons after they have been added to the DOM
function addModalEventListeners() {
  const openModalButton = document.querySelector(".open_modal_button")
  openModalButton.addEventListener("click", ModalDisplayButtons.displayModal)
  closeModalButton.addEventListener("click", ModalDisplayButtons.closeModal)
}

// 3- Fonctions

// Get data from API, find the photographer with the same id as the param in search bar, then create elements of the page with it, and adds event listeners to the modal buttons
async function init() {
  createHeader("profilePage")
  displayData(await API.getPhotographersByID())
  addModalEventListeners()
}

export function displayData(data) {
  new Photographer(
    data.photographer.find((photographer) => photographer)
  ).displayProfile()
  PhotographerMedia.createDropdownOrder()
  PhotographerMedia.createMediaSection()
  PhotographerMedia.sortMedia()
  thatPhotographerMedias[0].forEach((element) => {
    const mediaIndex = thatPhotographerMedias[0].indexOf(element)
    const template = new PhotographerMedia(element)
    document
      .querySelector(".photographer-media")
      .appendChild(template.createMediaList(mediaIndex))
    template.addLikes()
  })
}

//export async function loadthatPhotographerMedias() {
//  const sortingParameter = document.getElementById("order-by").value
//  const mediaList = document.querySelectorAll(".mediaCard")
//  for (let mediaToRemove of mediaList) {
//    document.querySelector(".photographer-media").removeChild(mediaToRemove)
//  }
//  await API.getPhotographersByID(sortingParameter).then((data) => {
//    data.media.forEach((element) => {
//      const template = new PhotographerMedia(element)
//      document
//        .querySelector(".photographer-media")
//        .appendChild(template.createMediaList())
//      template.addLikes()
//    })
//  })
//}

init()
