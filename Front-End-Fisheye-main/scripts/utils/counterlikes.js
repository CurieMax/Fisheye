/// Fonction pour calculer le nombre total de likes
const calculateTotalLikes = (collection) => {
    return collection.reduce((acc, media) => acc + media.likes, 0);
};

// Function to update the total likes displayed on the page
const updateTotalLikesDisplay = (totalLikes) => {
    const likesElement = document.querySelector(".nombreTotale .likes");
    likesElement.textContent = `${totalLikes}`;
};

// Function to handle the like button click
const handleLikeButtonClick = (btn, collection) => {
    const mediaId = parseInt(btn.getAttribute('data-id'));
    const media = collection.find(media => media.id === mediaId);

    if (media) {
        // Toggle the like state and update the media likes
        if (!btn.classList.contains("liked")) {
            media.likes++;
        } else {
            media.likes--;
        }

        btn.classList.toggle("liked");

        // Update the likes count for the specific media item
        const mediaLikesElement = btn.parentElement.firstChild;
        mediaLikesElement.textContent = `${media.likes}`;

        // Update the total likes count
        const totalLikes = calculateTotalLikes(collection);
        updateTotalLikesDisplay(totalLikes);
    }
};

// Main function to display total likes and set up event listeners
const displayTotalLikes = (collection) => {
    // Initial display of total likes
    const totalLikes = calculateTotalLikes(collection);
    updateTotalLikesDisplay(totalLikes);

    // Set up event listeners for like buttons
    document.querySelectorAll(".btnLike").forEach(btn => {
        btn.addEventListener("click", () => handleLikeButtonClick(btn, collection));
    });
};


