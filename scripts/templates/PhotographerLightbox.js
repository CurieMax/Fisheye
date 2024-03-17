import Image from "../models/Image.js"
import Video from "../models/Video.js"

export default class PhotographerLightbox {
	constructor(medias) {
		this.medias = medias
		this.currentIndex = 0 // Index du média actuel
	}

	displayCurrentMedia() {
		const media = this.medias[this.currentIndex]
		const lightboxMediaContainer = document.querySelector(".lightbox_media")
		lightboxMediaContainer.innerHTML = "" 
    
		let mediaElement
        
		if (media instanceof Image) {
			mediaElement = `<img src="${media.src}" alt="${media.title}" />` +
                           `<h3 class="media-title">${media.title}</h3>` 
		} else if (media instanceof Video) {
			mediaElement = `<video controls><source src="${media.src}" type="video/mp4"></video>` +
                           `<h3 class="media-title">${media.title}</h3>`
		}
    
		lightboxMediaContainer.innerHTML = mediaElement
	}

    
	closeLightbox() {
		const lightboxModal = document.querySelector(".lightbox_modal")
		lightboxModal.style.display = "none" 
		const lightboxMediaContainer = document.querySelector(".lightbox_media")
		lightboxMediaContainer.innerHTML = ""
		lightboxModal.setAttribute("aria-hidden", "true")
	}
	attachEventListeners() {
		document.querySelector(".lightbox_prev").addEventListener("click", () => this.navigate(-1))
		document.querySelector(".lightbox_next").addEventListener("click", () => this.navigate(1))
		document.querySelector(".lightbox_close").addEventListener("click", () => this.closeLightbox())
		this.setupMediaLinks()
    
		// Ajouter le gestionnaire pour les touches de navigation
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.closeLightbox()
			} else if (e.key === "ArrowLeft") {
				this.navigate(-1) // Vers le média précédent
			} else if (e.key === "ArrowRight") {
				this.navigate(1) // Vers le média suivant
			}
		})
	}

	setupMediaLinks() {
		document.querySelectorAll(".media_link").forEach((link, index) => {
			link.removeEventListener("click", this.mediaLinkClick) 
			link.addEventListener("click", (e) => this.mediaLinkClick(e, index))
		})
	}

	mediaLinkClick(e, index) {
		e.preventDefault()
		this.currentIndex = index
		this.displayCurrentMedia()
		document.querySelector(".lightbox_modal").style.display = "block"
		document.querySelector(".lightbox_modal").setAttribute("aria-hidden", "false")
	}

	navigate(direction) {
		this.currentIndex += direction
		if (this.currentIndex < 0) this.currentIndex = this.medias.length - 1
		else if (this.currentIndex >= this.medias.length) this.currentIndex = 0
		this.displayCurrentMedia()
	}

	updateMedias(medias) {
		this.medias = medias
		this.setupMediaLinks() 
	}

	initLightbox() {
		this.attachEventListeners()
	}
}