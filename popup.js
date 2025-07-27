document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('openCurrentPage');
    const statusDiv = document.getElementById('status');
    
    function showStatus(message, type = 'success') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
    
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
    
    // Check if current page is supported
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
            
            if (!isSupported) {
                openButton.textContent = 'Try Opening in Freedium';
                openButton.style.opacity = '0.7';
            }
        }
    });
});
