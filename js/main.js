// MAIN.JS - HAMBURGER MENU ONLY (No duplicate code)

// Wait for DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. HAMBURGER MENU TOGGLE FUNCTIONALITY...
    
    // Get references to hamburger button and navigation menu
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('mainNav');
    
    // Check if both elements exist on the page
    if (hamburger && navMenu) {
        // Add click event listener to hamburger button
        hamburger.addEventListener('click', function() {
            // Toggle 'open' class on navigation menu (shows/hides menu)
            navMenu.classList.toggle('open');
            // Toggle 'active' class on hamburger (changes to X shape)
            hamburger.classList.toggle('active');
            
            // Get current expanded state for accessibility
            const isExpanded = navMenu.classList.contains('open');
            // Update ARIA attributes for screen readers
            hamburger.setAttribute('aria-expanded', isExpanded);
            hamburger.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
        });
    }
    
    // 2. CLOSE MENU ON NAVIGATION LINK CLICK (MOBILE)...
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    
    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close menu on mobile/tablet devices (width <= 1023px)
            if (window.innerWidth <= 1023) {
                // Remove 'open' class to hide menu
                if (navMenu) navMenu.classList.remove('open');
                // Remove 'active' class to reset hamburger icon
                if (hamburger) hamburger.classList.remove('active');
                // Update ARIA expanded state to false
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS...
    
    // Select all anchor links that point to elements on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Get the target element ID from href attribute
            const targetId = this.getAttribute('href');
            
            // Only process if href is not just '#' and not empty
            if (targetId !== '#' && targetId !== '') {
                // Find the target element on the page
                const targetElement = document.querySelector(targetId);
                
                // If target element exists
                if (targetElement) {
                    // Prevent default jump behavior
                    e.preventDefault();
                    // Smoothly scroll to target element
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });
    
    // 4. RESIZE HANDLER - RESET MOBILE MENU ON DESKTOP...
    
    // Timer variable for debouncing resize events
    let resizeTimer;
    
    // Add resize event listener to window
    window.addEventListener('resize', function() {
        // Clear previous timer to prevent multiple executions
        clearTimeout(resizeTimer);
        
        // Set new timer with 250ms delay
        resizeTimer = setTimeout(function() {
            // If screen size is desktop (width >= 1024px)
            if (window.innerWidth >= 1024) {
                // Close mobile menu if open
                if (navMenu) navMenu.classList.remove('open');
                // Reset hamburger icon if active
                if (hamburger) hamburger.classList.remove('active');
            }
        }, 250);
    });
    
    // 5. CONSOLE LOG - CONFIRM SCRIPT LOADED...
    
    console.log('✅ main.js loaded successfully');
});