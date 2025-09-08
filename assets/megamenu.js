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

  // Close mega menu function
  function closeMegaMenu() {
    const allMegaMenus = document.querySelectorAll('.megamnu-main-wrapper');
    allMegaMenus.forEach(menu => menu.classList.remove('active'));
  }

  // Add event listeners to close buttons
  const closeButtons = document.querySelectorAll('.megamenu-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closeMegaMenu();
    });
  });

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

  // Internal mega menu functionality
  const megaMenuCollections = document.querySelectorAll('.mega-menu-collections a');
  const megaMenuProducts = document.querySelectorAll('.mega-menu-products');

  function switchMegaMenu(targetIndex) {
    megaMenuCollections.forEach(link => link.classList.remove('active'));
    megaMenuProducts.forEach(product => product.classList.remove('active'));
    
    const targetCollection = document.querySelector(`.mega-menu-collections a[data-loop-index="${targetIndex}"]`);
    const targetProduct = document.querySelector(`.mega-menu-products[data-loop-index="${targetIndex}"]`);
    
    if (targetCollection) targetCollection.classList.add('active');
    if (targetProduct) targetProduct.classList.add('active');
  }

  megaMenuCollections.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const loopIndex = this.getAttribute('data-loop-index');
      switchMegaMenu(loopIndex);
    });

    link.addEventListener('mouseenter', function() {
      const loopIndex = this.getAttribute('data-loop-index');
      switchMegaMenu(loopIndex);
    });
  });

  document.querySelectorAll('.close-details').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      this.closest('details').removeAttribute('open');
    });
  });
});