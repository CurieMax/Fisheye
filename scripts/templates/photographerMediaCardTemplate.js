/**
 * Function that creates an article to display a photographer's image or video
 * @param {string} pictureNameRepository
 * @param {object} media
 * @returns {html}
 */
export const createPhotographerMediaCard = (pictureNameRepository, media) => {
  const { title, src, likes, type, id } = media;
  console.log(media);
  const picture = `../../assets/medias/photographers/${pictureNameRepository}/${src}`;
  // article container
  const mediaArticle = document.createElement('article');
  mediaArticle.className = 'media-card';
  // manage depends of media type format(image or video)
  let mediaPicture;
  if (type === 'image' && src != null) {
    mediaPicture = `<img class="media-card__picture" src="${picture}" alt="${title}">`;
  } else if (type === 'video' && src != null) {
    mediaPicture = `
        <video aria-label="${title}" class="media-card__picture">
          <source src=
          "${picture}"  type="video/mp4">
        </video>`;
  } else {
    mediaPicture = `<div aria-label="absence de media">Absence de media</div>`;
  }
  const mediaCard = `
      <a href="#" id="media-card-${id}" class="media-card__link" aria-label="${title}, vue de près">
        ${mediaPicture}
      </a>
      <div class="media-card__under-picture-container">
        <h2 class="media-card__title" aria-hidden="true">${title}</h2>
        <div class="media-card__likes-container">
          <p class="media-card__likes" id="media-card-likes-${id}" tabindex=0>${likes}<span class="hide-text"> likes</span></p>
          <button id="media-card-button-likes-${id}" class="media-card__likes-button" aria-pressed="false" aria-label="Aimer ${title}">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none" aria-hidden="true">
              <g clip-path="url(#clip0_120_561)">
                <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#911C1C"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
  `;
  mediaArticle.innerHTML = mediaCard;
  return mediaArticle;
};
