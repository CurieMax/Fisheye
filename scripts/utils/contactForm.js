/**
 * @fileoverview Displays the contact modal on the page.
 * Adds a dimmed background to the body to focus on the modal content.
 */
function displayModal () {
  const modal = document.getElementById('contact_modal');
  document.body.classList.add('dimmed');
  modal.style.display = 'block';

  // Function to handle escape key press
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscapeKey);
    }
  };

  // Add event listener for escape key
  document.addEventListener('keydown', handleEscapeKey);
}

/**
 * Closes the contact modal on the page.
 * Removes the dimmed background from the body to return to normal page view.
 */
function closeModal () {
  const modal = document.getElementById('contact_modal');
  document.body.classList.remove('dimmed');
  modal.style.display = 'none';
}

/**
 * Closes the modal by hiding the modal container and overlay.
 */
const closeModalBtn = document.getElementById('closeModalBtn');
closeModalBtn.addEventListener('click', closeModal);

const openModalBtn = document.getElementById('openModal');
openModalBtn.addEventListener('click', displayModal);
