export { PriceAndLikesCard }
class PriceAndLikesCard {
    constructor(likes, price) {
        this.price = price
        this.likes = likes
    }
 
    getPriceAndLikesDom() {
        const div = document.createElement('div')
        div.setAttribute('class', 'priceAndLikes')

        const spanLikes = document.createElement('span')
        spanLikes.textContent = `${this.likes}`
        spanLikes.setAttribute('class', 'likes')

        const spanPrice = document.createElement('span')
        spanPrice.textContent = `${this.price}€ / jour`
        spanPrice.setAttribute('class', 'price')

        const iconLike = document.createElement('i')
        iconLike.setAttribute('class', 'fa-solid fa-heart icon icon--black')
        iconLike.setAttribute('data-fa-transform', 'up-0.75')
        iconLike.setAttribute('aria-label', 'likes')

        const likeDiv = document.createElement('div')
        likeDiv.setAttribute('class', 'likeContent')

        likeDiv.appendChild(spanLikes)
        likeDiv.appendChild(iconLike)
        div.appendChild(likeDiv)
        div.appendChild(spanPrice)

        return div
    }
}
