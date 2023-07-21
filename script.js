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

// Close the mobile navigation when clicking outside the menu
document.addEventListener('click', (event) => {
  const nav = document.querySelector('nav');
  if (!nav.contains(event.target) && window.innerWidth <= 768) {
    subMenus.forEach(menu => {
      if (menu.classList.contains('show')) {
        menu.classList.remove('show');
      }
    });
  }
});
