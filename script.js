const navLinks = document.querySelectorAll('.nav-link');
  const subMenus = document.querySelectorAll('li ul');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Check if the link has a sub-menu
      const subMenu = link.nextElementSibling;
      if (subMenu && window.innerWidth <= 768) {
        // Toggle the sub-menu's display
        subMenu.classList.toggle('show');
        // Hide other open sub-menus
        subMenus.forEach(menu => {
          if (menu !== subMenu && menu.classList.contains('show')) {
            menu.classList.remove('show');
          }
        });
      }
    });
  });

  // Close the mobile navigation when clicking outside the menu or the link
  document.addEventListener('click', (event) => {
    const nav = document.querySelector('nav');
    const clickedElement = event.target;

    if (!nav.contains(clickedElement) && window.innerWidth <= 768) {
      subMenus.forEach(menu => {
        if (menu.classList.contains('show')) {
          menu.classList.remove('show');
        }
      });
    } else if (clickedElement.classList.contains('nav-link') && window.innerWidth <= 768) {
      // If the clicked element is a nav link with a sub-menu, toggle its display
      const subMenu = clickedElement.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle('show');
      }
    }
  });


// Function to open the image preview modal
function openModal(imgSrc) {
      const modal = document.getElementById('imagePreviewModal');
      const modalImg = document.getElementById('imgPreview');
    
      modal.style.display = 'block';
      modalImg.src = imgSrc;
    }
    
    // Function to close the image preview modal
    function closeModal() {
      const modal = document.getElementById('imagePreviewModal');
      modal.style.display = 'none';
    }
    
    // Add click event listeners to all game images
    const gameImages = document.querySelectorAll('.game img');
    gameImages.forEach((image) => {
      image.addEventListener('click', () => {
        const imgSrc = image.getAttribute('src');
        openModal(imgSrc);
      });
    });
    
    // Close modal when clicking outside the modal content
    const modal = document.getElementById('imagePreviewModal');
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
    