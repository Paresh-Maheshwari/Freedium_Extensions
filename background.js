// Background script for context menu functionality

// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    // Create main context menu item
    chrome.contextMenus.create({
        id: "openInFreedium",
        title: "Open in Freedium",
        contexts: ["page", "link"],
        documentUrlPatterns: ["http://*/*", "https://*/*"]
    });
    
    // Create submenu for current page
    chrome.contextMenus.create({
        id: "openCurrentPageInFreedium",
        title: "Open Current Page in Freedium",
        contexts: ["page"],
        parentId: "openInFreedium"
    });
    
    // Create submenu for links
    chrome.contextMenus.create({
        id: "openLinkInFreedium", 
        title: "Open Link in Freedium",
        contexts: ["link"],
        parentId: "openInFreedium"
    });
    
    console.log("Freedium context menu created");
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    let targetUrl = "";
    
    switch (info.menuItemId) {
        case "openCurrentPageInFreedium":
            targetUrl = tab.url;
            break;
            
        case "openLinkInFreedium":
            targetUrl = info.linkUrl;
            break;
            
        case "openInFreedium":
            // Fallback for main menu item
            targetUrl = info.linkUrl || tab.url;
            break;
    }
    
    if (targetUrl) {
        // Check if URL is valid
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
            const freediumUrl = `https://freedium.cfd/${targetUrl}`;
            
            // Open in new tab
            chrome.tabs.create({
                url: freediumUrl,
                active: true
            });
            
            console.log(`Opening in Freedium: ${freediumUrl}`);
        } else {
            console.log("Invalid URL for Freedium:", targetUrl);
        }
    }
});

// Optional: Add keyboard shortcut support
chrome.commands.onCommand.addListener((command) => {
    if (command === "open-in-freedium") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                const freediumUrl = `https://freedium.cfd/${tabs[0].url}`;
                chrome.tabs.create({
                    url: freediumUrl,
                    active: true
                });
            }
        });
    }
});
