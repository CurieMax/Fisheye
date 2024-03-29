class Insert {
  constructor(data) {
    this.sumLikes = data.sumLikes;
    this.price = data.price;
    this.likesElement = null;
  }

  createInsert() {
    const insert = document.createElement("div");
    insert.classList.add("insert");
    const content = document.createElement("div");
    content.classList.add("insert-content");
    const like = document.createElement("div");
    like.classList.add("insert-like");
    const numberLikes = document.createElement("p");
    numberLikes.textContent = this.sumLikes;
    this.likesElement = document.createElement("p");
    this.likesElement.textContent = this.sumLikes;
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart");
    const priceContent = document.createElement("div");
    priceContent.classList.add("insert-price");
    const price = document.createElement("p");
    price.textContent = `${this.price}€ / jour`;
    priceContent.appendChild(price);
    like.appendChild(numberLikes);
    like.appendChild(heart);
    content.appendChild(like);
    content.appendChild(priceContent);
    insert.appendChild(content);

    return insert;
  }

  updateLikes() {
    this.sumLikes++;
    if (this.likesElement) {
      this.likesElement.textContent = this.sumLikes;
    }
  }
}

function insertFactory(data) {
  return new Insert(data);
}
