        const mainWrapper = document.getElementById('main_wrapper');
        const modal = document.getElementById('contact_modal');
        const modal_filter = document.getElementById('filter');
        const modal_collection = document.getElementById('collection');
        const body = document.body;
        const modalCloseBtn = document.getElementById('modal_close_btn');
        const openModalBtn = document.getElementById('open_modal_btn');

        function displayModal() {
            modal.style.display = "block";
            modal_filter.style.display = "none";
            modal_collection.style.display = "none";
            mainWrapper.setAttribute('aria-hidden', 'true');
            modal.setAttribute('aria-hidden', 'false');
            body.classList.add('no-scroll');
            modal.style.display = 'flex';
            modalCloseBtn.focus();
        }

        function closeModal() {
            modal.style.display = "none";
            modal_filter.style.display = "block";
            modal_collection.style.display = "block";
            mainWrapper.setAttribute('aria-hidden', 'false');
            modal.setAttribute('aria-hidden', 'true');
            body.classList.remove('no-scroll');
            openModalBtn.focus();
        }

        // Close modal when escape key is pressed
        document.addEventListener('keydown', (e) => {
            const keyCode = e.keyCode || e.which;
            if (modal.getAttribute('aria-hidden') === 'false' && keyCode === 27) {
                closeModal();
            }
        });