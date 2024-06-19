const lightbox = document.querySelector(".lightbox");
lightbox.setAttribute('id', 'myModal');
document.getElementById("myModal").style.display = "none";

function openModalLight(index, list) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    currentIndex = index;

    const imageElement = document.createElement("img");
    const videoElement = document.createElement("video");

    if (list[index].image) {
        imageElement.src = `./assets/images/${list[index].image}`;
        imageElement.style.maxWidth = "100%";
        imageElement.style.maxHeight = "100%";
        modal.innerHTML = '';
        modal.appendChild(imageElement);
    } else if (list[index].video) {
        videoElement.src = `./assets/images/${list[index].video}`;
        videoElement.autoplay = true;
        videoElement.controls = true;
        videoElement.style.maxWidth = "100%";
        videoElement.style.maxHeight = "100%";
        modal.innerHTML = '';
        modal.appendChild(videoElement);
    }

    const close = document.createElement("a");
    close.classList.add("lightbox_close");
    close.innerHTML = '&#x2715;';
    close.setAttribute('onclick', "closeModalLight()");
    lightbox.appendChild(close);

    const next = document.createElement("a");
    next.classList.add("lightbox_next");
    next.innerHTML = '&#10095;';
    next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % list.length;
        openModalLight(currentIndex, list);    
    });
    lightbox.appendChild(next);

    const prev = document.createElement("a");
    prev.classList.add("lightbox_prev");
    prev.innerHTML = '&#10094;';
    prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + list.length) % list.length;
        openModalLight(currentIndex, list);
    });
    lightbox.appendChild(prev);

    document.onkeyup = (event) => {
        if (event.key === 'Escape') {
            closeModalLight();
        }
        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + list.length) % list.length;
            openModalLight(currentIndex, list);
        }
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % list.length;
            openModalLight(currentIndex, list);
        }
    };
}

function closeModalLight() {
    document.getElementById("myModal").style.display = "none";
    document.onkeyup = null;
}