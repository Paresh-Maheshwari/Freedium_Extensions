// Wait for the page to load
(function() {
    'use strict';
    
    // Check if we're on a Medium-like page
    function isMediumPage() {
        const hostname = window.location.hostname;
        const url = window.location.href;
        
        // Check for Medium domains and Medium-hosted publications
        return hostname.includes('medium.com') || 
               hostname.includes('substack.com') ||
               hostname === 'towardsdatascience.com' ||
               hostname === 'infosecwriteups.com' ||
               hostname === 'betterprogramming.pub' ||
               hostname.includes('plainenglish.io') ||
               hostname === 'levelup.gitconnected.com' ||
               hostname === 'blog.devgenius.io' ||
               // Check for Medium article patterns in URL
               url.includes('/p/') || // Substack pattern
               document.querySelector('meta[property="al:android:app_name"][content="Medium"]') ||
               document.querySelector('meta[name="twitter:app:name:iphone"][content="Medium"]');
    }
    
    // Create the Freedium button
    function createFreediumButton() {
        // Check if button already exists
        if (document.getElementById('freedium-button')) {
            return;
        }
        
        const button = document.createElement('div');
        button.id = 'freedium-button';
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>Free Read</span>
        `;
        
        button.title = 'Open in Freedium for free reading';
        button.className = 'freedium-btn';
        
        // Add click event
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentUrl = window.location.href;
            const freediumUrl = `https://freedium.cfd/${currentUrl}`;
            
            // Open in new tab
            window.open(freediumUrl, '_blank');
        });
        
        // Add to page
        document.body.appendChild(button);
        
        console.log('Freedium button added to page');
    }
    
    // Initialize the extension
    function init() {
        if (isMediumPage()) {
            // Wait a bit for the page to fully load
            setTimeout(createFreediumButton, 1000);
            
            // Also listen for navigation changes (for SPAs)
            let lastUrl = location.href;
            new MutationObserver(() => {
                const url = location.href;
                if (url !== lastUrl) {
                    lastUrl = url;
                    setTimeout(createFreediumButton, 1000);
                }
            }).observe(document, {subtree: true, childList: true});
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
