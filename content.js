// Wait for the page to load
(function() {
    'use strict';
    
    let currentSettings = {};
    
    // Load settings from storage
    function loadSettings() {
        const defaultSettings = {
            theme: 'dark',
            buttonPosition: 'top-right',
            offsetX: 20,
            offsetY: 20,
            buttonSize: 'medium',
            buttonStyle: 'gradient',
            showAnimation: true,
            enableShortcuts: true,
            autoDetect: true,
            showOnAll: true,
            customSites: '',
            debugMode: false,
            contextMenu: true,
            buttonDelay: 1000
        };
        
        chrome.storage.sync.get(defaultSettings, function(settings) {
            currentSettings = settings;
            if (currentSettings.debugMode) {
                console.log('Freedium: Settings loaded', settings);
            }
        });
    }
    
    // Check if we're on a Medium-like page
    function isMediumPage() {
        const hostname = window.location.hostname;
        const url = window.location.href;
        
        // Check if auto-detect is disabled
        if (!currentSettings.autoDetect) {
            return false;
        }
        
        // Check custom sites
        if (currentSettings.customSites) {
            const customSitesList = currentSettings.customSites.split('\n').filter(site => site.trim());
            if (customSitesList.some(site => hostname.includes(site.trim()))) {
                return true;
            }
        }
        
        // Check for Medium domains and Medium-hosted publications
        const supportedSites = [
            'medium.com',
            'substack.com',
            'towardsdatascience.com',
            'infosecwriteups.com',
            'betterprogramming.pub',
            'plainenglish.io',
            'levelup.gitconnected.com',
            'blog.devgenius.io'
        ];
        
        if (!currentSettings.showOnAll) {
            return supportedSites.some(site => hostname.includes(site));
        }
        
        return hostname.includes('medium.com') || 
               hostname.includes('substack.com') ||
               supportedSites.some(site => hostname.includes(site)) ||
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
        
        // Apply settings to button
        applySettingsToButton(button);
        
        // Add click event
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const currentUrl = window.location.href;
            const freediumUrl = `https://freedium.cfd/${currentUrl}`;
            
            // Open in new tab
            window.open(freediumUrl, '_blank');
            
            if (currentSettings.debugMode) {
                console.log('Freedium: Opening URL', freediumUrl);
            }
        });
        
        // Add to page with delay
        setTimeout(() => {
            document.body.appendChild(button);
            
            if (currentSettings.showAnimation) {
                button.style.animation = 'slideInFromRight 0.5s ease-out';
            }
            
            if (currentSettings.debugMode) {
                console.log('Freedium: Button added to page');
            }
        }, currentSettings.buttonDelay);
    }
    
    // Apply settings to button
    function applySettingsToButton(button) {
        // Apply position
        const position = currentSettings.buttonPosition;
        const x = currentSettings.offsetX;
        const y = currentSettings.offsetY;
        
        button.style.position = 'fixed';
        button.style.zIndex = '10000';
        
        // Reset all positions
        button.style.top = 'auto';
        button.style.bottom = 'auto';
        button.style.left = 'auto';
        button.style.right = 'auto';
        
        switch (position) {
            case 'top-right':
                button.style.top = y + 'px';
                button.style.right = x + 'px';
                break;
            case 'top-left':
                button.style.top = y + 'px';
                button.style.left = x + 'px';
                break;
            case 'bottom-right':
                button.style.bottom = y + 'px';
                button.style.right = x + 'px';
                break;
            case 'bottom-left':
                button.style.bottom = y + 'px';
                button.style.left = x + 'px';
                break;
        }
        
        // Apply size
        let padding, fontSize;
        switch (currentSettings.buttonSize) {
            case 'small':
                padding = '8px 14px';
                fontSize = '12px';
                break;
            case 'medium':
                padding = '12px 20px';
                fontSize = '14px';
                break;
            case 'large':
                padding = '16px 24px';
                fontSize = '16px';
                break;
        }
        button.style.padding = padding;
        button.style.fontSize = fontSize;
        
        // Apply theme
        if (currentSettings.theme === 'light') {
            button.classList.add('light-theme');
        } else {
            button.classList.remove('light-theme');
        }
        
        // Apply style
        switch (currentSettings.buttonStyle) {
            case 'gradient':
                // Default gradient style (handled by CSS)
                button.classList.remove('solid-style', 'minimal-style', 'glass-style');
                break;
            case 'solid':
                button.classList.add('solid-style');
                button.classList.remove('minimal-style', 'glass-style');
                break;
            case 'minimal':
                button.classList.add('minimal-style');
                button.classList.remove('solid-style', 'glass-style');
                break;
            case 'glass':
                button.classList.add('glass-style');
                button.classList.remove('solid-style', 'minimal-style');
                break;
        }
    }
    
    // Initialize the extension
    function init() {
        loadSettings();
        
        // Wait for settings to load, then check if we should show button
        setTimeout(() => {
            if (isMediumPage()) {
                createFreediumButton();
                
                // Also listen for navigation changes (for SPAs)
                let lastUrl = location.href;
                new MutationObserver(() => {
                    const url = location.href;
                    if (url !== lastUrl) {
                        lastUrl = url;
                        setTimeout(() => {
                            if (isMediumPage()) {
                                createFreediumButton();
                            }
                        }, currentSettings.buttonDelay);
                    }
                }).observe(document, {subtree: true, childList: true});
            }
        }, 100);
    }
    
    // Listen for settings updates from options page
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.action === 'updateSettings') {
            currentSettings = request.settings;
            
            // Remove existing button
            const existingButton = document.getElementById('freedium-button');
            if (existingButton) {
                existingButton.remove();
            }
            
            // Recreate button with new settings
            if (isMediumPage()) {
                createFreediumButton();
            }
            
            if (currentSettings.debugMode) {
                console.log('Freedium: Settings updated', currentSettings);
            }
        }
    });
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
