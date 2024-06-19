const urlParams = new URLSearchParams(window.location.search);
const identify = urlParams.get('id');
const select = document.getElementById('select');
let filter = select.value;

let currentIndex = 0;

class App {
    constructor() {
        this.photographerApi = new PhotographerApi('./data/photographers.json');
    }

    async main() {
        const photographeData = await this.photographerApi.getphotographer();
        const dataMedia = photographeData.data_media;
        const dataPhotographer = photographeData.data;
  
        const dataPhotoCollection = dataPhotographer.find((element) => element.id == identify);
        const photoGrapher = new photographer(dataPhotoCollection);
        const collectioncard = new collectionDataPhotoCard(photoGrapher);
        collectioncard.createDataPhotoCollection();

        const media = dataMedia.filter(element => element.photographerId == identify);
        //Fonction updateMediaDisplay pour gérer le filtrage des médias et la mise à jour de l'affichage.

        const updateMediaDisplay = async () => {
            const filterAdapter = new FiltercollectionAdapter(media, filter);
            const filterMedia = await filterAdapter.filtercollectionBytype();
            displayMediaCollection(filterMedia);
            displayTotalLikes(filterMedia);
            
            
        };

        const filterInput = document.querySelector(".filter_description");
        filterInput.addEventListener("change", async (event) => {
            filter = event.target.value;
            await updateMediaDisplay();
        });

        await updateMediaDisplay();
        }
        }

    const displayMediaCollection = (collection) => {
    const fichesImage = document.querySelector(".collection");
    fichesImage.innerHTML = '';  // Clear existing content

    collection.forEach((element, index) => {
        const mediaItem = mediaFactory(element);
        if (mediaItem) {
            if (element.video) {
                mediaItem.createCardVideoCollection();
            } else if (element.image) {
                mediaItem.createCardPhotoCollection();
            }

            const mediaElement = document.querySelector(`img[src='./assets/images/${element.image}'], video[src='./assets/images/${element.video}']`);
            if (mediaElement) {
                mediaElement.addEventListener('click', function() {
                    currentIndex = index;
                    openModalLight(index, collection);
                });
            }
        }
    });

const acceuil = document.querySelector(".logo");

acceuil.addEventListener('click', () => {
    // Redirect to the homepage URL
    window.location.href = "index.html"; // Replace with your homepage URL
});
}

const app = new App();
app.main();