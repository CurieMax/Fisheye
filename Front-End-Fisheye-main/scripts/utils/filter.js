class FiltercollectionAdapter {
    constructor(collection, typefilter) {
        this.collection = collection;
        this.typefilter = typefilter;
    }

    async filtercollectionBytype() {

        const collectionfilter = new CollectionFilter(this.collection);
        return  collectionfilter.filterByType(this.typefilter);
    }
}

class CollectionFilter {
    /**
     * Creates an instance of CollectionFilter.
     * 
     * @param {array} collection - The array of objects to filter and sort. Each object should have 'title', 'date', and 'likes' properties.
     */
    constructor(collection) {
        this.collection = collection;
    }

    /**
     * Filters and sorts the collection based on the specified filter type.
     * 
     * @param {string} typeFilter - The type of filter to apply. Can be 'titre', 'Date', or 'Popularité'.
     * @returns {array} The sorted array of objects.
     */
    filterByType(typeFilter) {
        switch(typeFilter) {
            case 'titre':
                this.collection.sort((a, b) => {
                    let titreA = a.title.toLowerCase();
                    let titreB = b.title.toLowerCase();
                    if (titreA < titreB) return -1;
                    if (titreA > titreB) return 1;
                    return 0;
                });
                break;

            case 'Date':
                this.collection.sort((a, b) => {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateB - dateA;
                });
                break;

            case 'Popularité':
                this.collection.sort((a, b) => b.likes - a.likes);
                break;

            default:
                return this.collection; // retourn la liste originale si le filtre n'ai pa reconue
                        }

        return this.collection;
    }
}
