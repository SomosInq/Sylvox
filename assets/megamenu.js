document.addEventListener('DOMContentLoaded', function() {
  const triggers = document.querySelectorAll('[data-trigger-megamenu]');
  let activeTimeout;

  function showMegaMenu(triggerValue) {
    clearTimeout(activeTimeout);
    
    // Hide all mega menus
    const allMegaMenus = document.querySelectorAll('.megamnu-main-wrapper');
    allMegaMenus.forEach(menu => menu.classList.remove('active'));
    
    // Show the target mega menu
    const targetMegaMenu = document.querySelector(`[data-megamenu-for="${triggerValue}"]`);
    if (targetMegaMenu) {
      targetMegaMenu.classList.add('active');
    }
  }

  function hideMegaMenu() {
    activeTimeout = setTimeout(() => {
      const allMegaMenus = document.querySelectorAll('.megamnu-main-wrapper');
      allMegaMenus.forEach(menu => menu.classList.remove('active'));
    }, 300);
  }

  triggers.forEach(trigger => {
    const triggerValue = trigger.getAttribute('data-trigger-megamenu');
    
    // Click event
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const targetMegaMenu = document.querySelector(`[data-megamenu-for="${triggerValue}"]`);
      
      if (targetMegaMenu && targetMegaMenu.classList.contains('active')) {
        hideMegaMenu();
      } else {
        showMegaMenu(triggerValue);
      }
    });

    // Hover events
    trigger.addEventListener('mouseenter', function() {
      showMegaMenu(triggerValue);
    });

    trigger.addEventListener('mouseleave', function() {
      hideMegaMenu();
    });
  });

  // Keep mega menu open when hovering over it
  const megaMenus = document.querySelectorAll('.megamnu-main-wrapper');
  megaMenus.forEach(menu => {
    menu.addEventListener('mouseenter', function() {
      clearTimeout(activeTimeout);
    });

    menu.addEventListener('mouseleave', function() {
      hideMegaMenu();
    });
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('[data-trigger-megamenu]') && !e.target.closest('.megamnu-main-wrapper')) {
      hideMegaMenu();
    }
  });
});