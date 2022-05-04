export default function createPhotoCard(media){
    const article = 
                `<${media.tag} src=${media.path} role="Image link" aria-Label="${media.title}, closeup view}" class="photo"></${media.tag}>
                <aside class="media__aside">
                    <span class="photo__title" >${media.title}</span>
                    <span class="photo__likes" >
                        ${media.likes} 
                        <i class="fas fa-heart" role="Image" aria-label="likes">
                    </i></span>
                </aside>`
    return article
}