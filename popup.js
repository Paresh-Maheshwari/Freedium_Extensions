document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('openCurrentPage');
    const statusDiv = document.getElementById('status');
    const repoLink = document.getElementById('repoLink');
    const checkUpdates = document.getElementById('checkUpdates');
    const openOptions = document.getElementById('openOptions');
    const reportIssue = document.getElementById('reportIssue');
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Theme management
    function loadTheme() {
        chrome.storage.sync.get(['theme'], function(result) {
            const theme = result.theme || 'dark';
            applyTheme(theme);
        });
    }
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.body.classList.remove('light-theme');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
    
    function toggleTheme() {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        applyTheme(newTheme);
        chrome.storage.sync.set({ theme: newTheme });
        
        showStatus(`Switched to ${newTheme} theme`, 'success');
    }
    
    // Initialize theme
    loadTheme();
    
    function showStatus(message, type = 'success') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
    
    // Handle main button click
    openButton.addEventListener('click', function() {
        // Get the current active tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                const currentUrl = tabs[0].url;
                
                // Check if it's a valid URL to process
                if (currentUrl.startsWith('http://') || currentUrl.startsWith('https://')) {
                    const freediumUrl = `https://freedium.cfd/${currentUrl}`;
                    
                    // Open in new tab
                    chrome.tabs.create({
                        url: freediumUrl,
                        active: true
                    });
                    
                    showStatus('Opening in Freedium...', 'success');
                    
                    // Close popup after a short delay
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                } else {
                    showStatus('Cannot process this type of page', 'error');
                }
            } else {
                showStatus('Could not get current page', 'error');
            }
        });
    });
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', toggleTheme);
    
    // Handle repository link click
    repoLink.addEventListener('click', function(e) {
        e.preventDefault();
        chrome.tabs.create({
            url: 'https://github.com/Paresh-Maheshwari/Freedium_Extensions',
            active: true
        });
        showStatus('Opening GitHub repository...', 'success');
        setTimeout(() => window.close(), 800);
    });
    
    // Handle options page click
    openOptions.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
        window.close();
    });
    
    // Handle check updates click
    checkUpdates.addEventListener('click', function() {
        chrome.tabs.create({
            url: 'https://github.com/Paresh-Maheshwari/Freedium_Extensions/blob/main/CHANGELOG.md',
            active: true
        });
        showStatus('Opening changelog...', 'success');
        setTimeout(() => window.close(), 800);
    });
    
    // Handle report issue click
    reportIssue.addEventListener('click', function() {
        chrome.tabs.create({
            url: 'https://github.com/Paresh-Maheshwari/Freedium_Extensions/issues/new',
            active: true
        });
        showStatus('Opening issue tracker...', 'success');
        setTimeout(() => window.close(), 800);
    });
    
    // Check if current page is supported and update UI accordingly
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            const url = tabs[0].url;
            const hostname = new URL(url).hostname;
            
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
            
            const isSupported = supportedSites.some(site => 
                hostname.includes(site) || hostname === site
            );
            
            if (isSupported) {
                openButton.innerHTML = 'Open in Freedium';
                openButton.style.background = 'rgba(34, 197, 94, 0.3)';
                openButton.style.borderColor = 'rgba(34, 197, 94, 0.5)';
            } else {
                openButton.innerHTML = 'Try Opening in Freedium';
                openButton.style.opacity = '0.8';
            }
        }
    });
});
