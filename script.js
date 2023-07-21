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






    
    

  // Function to check if the notification should be shown or not
function shouldShowNotification() {
      return localStorage.getItem('showNotification') !== 'false';
    }
    
    // Function to show the notification popup
    function showNotification() {
      if (shouldShowNotification()) {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
      }
    }
    
    // Function to close the notification popup
    function closeNotification() {
      const notification = document.getElementById('notification');
      notification.style.display = 'none';
    }
    
    // Function to hide the notification and set "Don't show again" preference
    function hideNotification() {
      const notification = document.getElementById('notification');
      notification.style.display = 'none';
    
      // Set the "showNotification" flag in localStorage to false
      localStorage.setItem('showNotification', 'false');
    }
    
    // Function to reset the "Don't show again" preference
    function resetNotificationPreference() {
      localStorage.setItem('showNotification', 'true');
    }
    
    // Check if there's a new update (You can trigger this function when needed)
    function checkForUpdate() {
      // Your logic to check for updates goes here
    
      // For demonstration purposes, I'm just setting a timer to show the notification after 3 seconds.
      setTimeout(() => {
        showNotification();
      }, 3000);
    }
    
    // Call the function to check for updates on page load
    window.addEventListener('load', checkForUpdate);
    