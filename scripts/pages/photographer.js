//Mettre le code JavaScript lié à la page photographer.html
// ma classe photographerPage retourne le template ou la vue de mes cartes photographer 
class PhotographerPage {
    constructor(photographer, media){
        this._photographer = new Photographer(photographer);
        this._media = new PhotographerMedia(media);
 
        // console.log('model = ' + this._media._title);
    }
    createPhotographerPage() {
        const altImg = `${this._photographer._name}, ${this._photographer._city}, ${this._photographer._tagline}, ${this._photographer.price}€ par jour`;
        
        const $articlePage = document.createElement('article');
        const photographerPage =
        `
        <article class="cardPhotographer">
        
        <div class="cardPhotographer__infos">
        <h1>${this._photographer.name}</h1>
        <h2>${this._photographer.city}, ${this._photographer.country}</h2>
        <p>${this._photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()" aria-label="contactez-moi ${this._photographer.name}" aria-haspopup="dialog" aria-controls="dialog">Contactez-moi</button>
        <img src="${this._photographer.portrait}" alt="${altImg}"/>
        </article>
        
        <div class="filter">
        <p>Trier par</p>
        <button class="filter_btn" onclick="displayChevron()" role="menubar" aria-expanded="false" aria-orientation="vertical">
        <ul class="filter_list" role="menuitem">
        <li class="filter_popular">Popularité<span class="chevron-down"><i class="fa-solid fa-chevron-down"></i></span> <span class="chevron-up"><i class="fa-solid fa-chevron-up"></i></span></li>
        <li class="filter_date">Date</li>
        <li class="filter_title">Titre</li>
        </ul>
        </div> 
        `
        $articlePage.innerHTML = photographerPage;
        return $articlePage;
    }

    createLikes(totalLikes) {
      const $articleLikes = document.createElement('article');
      const displayLikes = 
      `
      <div class="displayTarif">
      <p class="displayTarif_likes">${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i></p>
      <p class="displayTarif_price">${this._photographer.price}€/Jour</p>
      `
      $articleLikes.innerHTML = displayLikes;
      return $articleLikes;
    }

    incrementLikes(totalLikes) {
      const hearts = document.querySelectorAll('.mediaDisplay_heart');
      let like = document.querySelectorAll('.mediaDisplay_infosLike');
      let likesTotal = document.querySelector('.displayTarif_likes');
      hearts.forEach((heart, index) => {
        heart.addEventListener('click', () => {
          if(!heart.classList.contains('active')) {
            like[index].innerHTML ++;
            heart.classList.add('active');
            heart.setAttribute('aria-pressed', 'true');
            heart.setAttribute('aria-label', 'j\'aime');
            this._media.likes = like[index].innerHTML;
            totalLikes ++;
            likesTotal.innerHTML = `${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i>`;
          } else {
            like[index].innerHTML --;
            heart.classList.remove('active');
            heart.setAttribute('aria-pressed', 'false');
            heart.setAttribute('aria-label', 'je n\'aime plus');
            this._media.likes = like[index].innerHTML;
            totalLikes --;
            likesTotal.innerHTML = `${totalLikes} <i class="fa-solid fa-heart likesDisplay_heart"></i>`;
          }
        })
      });
    }

    renderMedia(media) {
        if(media.image) {
            return `<img class="linkRenderMedia" data-id="${media.id}" src="/assets/photographers/${this._photographer.name}/${media.image}"  alt="${media.title}"/>`;
        } else if (media.video) {
            return `<video class="linkRenderMedia" data-id="${media.id}" src="/assets/photographers/${this._photographer.name}/${media.video}" poster="" alt="${media.title}"></video>`;
        }
    }

    linkMedia(media) {
      if(media.image) {
        return `/assets/photographers/${this._photographer.name}/${media.image}`;
      } else if(media.video) {
        return `/assets/photographers/${this._photographer.name}/${media.video}`;
      }
    }
    
    createPhotographerMedia() {

      const $articleMedias = document.createElement('article');
      const displayMedias = 
      `
      <div class="mediaDisplay_bloc">
      <a href="${this.linkMedia(this._media)}" data-mediaId="${this._media.id}" class="mediaDisplay_link">
      ${this.renderMedia(this._media)}
      </a>
      
      <p class="mediaDisplay_infosTitle">${this._media.title}</p>
      <div class="mediaDisplay_boxLike">
      <p class="mediaDisplay_infosLike" onclick="">${this._media.likes}</p>
      <i class="fa-solid fa-heart mediaDisplay_heart"></i>
      </div>
      </div>   
      `
      $articleMedias.innerHTML = displayMedias;
      return $articleMedias;
    }


    createModalDisplay() {
      const $displayModal = document.createElement('div');
      $displayModal.setAttribute('class', 'modal');
      $displayModal.setAttribute('role', 'dialog');
      $displayModal.setAttribute('id', 'dialog');
      $displayModal.setAttribute('aria-labelledby', 'modalTitle');
      $displayModal.setAttribute('aria-describedby', 'coordonees');
      $displayModal.setAttribute('tabindex', '-1');
      $displayModal.setAttribute('aria-modal', 'false');

      const modalDisplay = 
      `
      <header>
        <h2 id="modalTitle">Contactez-moi <br>${this._photographer.name}</h2>
        <button class="btnClose" type="button" aria-label="Fermer" title="Fermer cette modale">
          <img src="assets/icons/close.svg" onclick="closeModal()" onfocus() class="closeModal" aria-controls="dialog" alt="Fermer"/>
        </button>
      </header>
      <form id="formContact" action="photographer.html" name="contact" method="get" oninvalid="false" onsubmit="validForm()">
        <div id="coordonees">
          <div class="formData">
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom" name="firstName" aria-labelledby="prenom" tabindex="0"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="nom">Nom</label>
            <input type="text" id="nom" name="lastName" aria-labelledby="nom"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" aria-labelledby="email"/>
            <span class="errorMessage"></span>
          </div>
          <div class="formData">
            <label for="message">Votre Message</label>
            <textarea type="text" id="message" name="message" aria-labelledby="message"></textarea>
            <span class="errorMessage"></span>
          </div>
        </div>  
        <button class="contact_button" aria-label="Envoyer le formulaire">Envoyer</button>
      </form>
      `
      $displayModal.innerHTML = modalDisplay;
      return $displayModal;
    }

    // insertBalise(media) {
    //   if(media.image) {
    //     return `<img class="media" src=""></img>`
    //   } else if(media.video) {
    //     return `<video class="mediaVideo" src="" type="video/mp4"></video>`
    //   }
    // }

    createDivVideo() {  
      const $content = document.createElement('div');
      $content.setAttribute('class', 'lightbox__container');
      const $mediasVideo = document.createElement('video');
      $mediasVideo.setAttribute('id', 'mediasVideo');
      $mediasVideo.setAttribute('src', "");
      $mediasVideo.setAttribute('type', "video/mp4");
      $mediasVideo.setAttribute('poster', "");
      $mediasVideo.setAttribute('controls', "");
      $content.appendChild($mediasVideo);
      return $content;
    }

    createDivImage() {
      const $content = document.createElement('div');
      $content.setAttribute('class', 'lightbox__container');
      const $mediasImage = document.createElement('img');
      $mediasImage.setAttribute('id', 'media');
      $mediasImage.setAttribute('src', "");
      $content.appendChild($mediasImage);
      return $content;
    }

    displayLightBox() {
      const $image = document.querySelectorAll('a[href$=".jpg"]');
      const $video = document.querySelectorAll('a[href$=".mp4"]');
      const links = [...$image, ...$video];   
      const $mediasImage = document.getElementById('media');
      const $mediasVideo = document.getElementById('mediasVideo');
      const $next = document.querySelector('.next');
      const $prev = document.querySelector('.prev');

      let compteur = 0;
      
      links.forEach((link, index) => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          if(link.href == $image){
            $mediasImage.setAttribute('src', `${this.link.bind($image)}`); 
          } 
          if(link.href == $video) {
            // debugger
            $mediasVideo.setAttribute('src', `${this.link.bind($video)}`);
          }
          compteur = index;
          displayLightboxModal();
        })
      });
      $next.addEventListener('click', function(e) {
        e.preventDefault();
        compteur++;
        if(compteur === links.length) {
          compteur = 0;
        }
        if($image){
          $mediasImage.setAttribute('src', `${links[compteur].href}`);
        } else if($video) {
          $mediasVideo.setAttribute('src', `${links[compteur].href}`);
        }
      });
      $prev.addEventListener('click', function(e) {
        e.preventDefault();
        compteur--;
        if(compteur < 0) {
          compteur = links.length - 1;
        }
        if($image){
          $mediasImage.setAttribute('src', `${links[compteur].href}`);
        } else if($video) {
          $mediasVideo.setAttribute('src', `${links[compteur].href}`);
        }
      });
    } 
}

