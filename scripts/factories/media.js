function mediaFactory(data) {
    function getmedia(media) {
        if(media.image){
            return `<img data-id="${media.id}" src="/assets/photographers/${photographer.name}/${media.image}" class="media_img" alt="image de ${media.image}">`
        }
        else {
            return `<video data-id="${media.id}" controls class="media_img" aria-label="${media.title}"><source src="/assets/photographers/${photographer.name}/${media.video}" ></video>`
        }
      }
    function getMediaCard() {
        return `<div id="id-${data.id}">
        ${getmedia(data)}
        <div class="flex">
        <h3>${data.title}</h3>
        <h4><span>${data.likes}</span> <i class="fa-solid fa-heart off like" data-id="${data.id}"></i></h4>
        </div>
        </div>`
         
    }
    return {getMediaCard, likeUpdate}
}



    
  
    
  