// Options page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const themeSelect = document.getElementById('theme-select');
    const positionSelect = document.getElementById('position-select');
    const offsetX = document.getElementById('offset-x');
    const offsetY = document.getElementById('offset-y');
    const buttonSize = document.getElementById('button-size');
    const buttonStyle = document.getElementById('button-style');
    const showAnimation = document.getElementById('show-animation');
    const enableShortcuts = document.getElementById('enable-shortcuts');
    const autoDetect = document.getElementById('auto-detect');
    const showOnAll = document.getElementById('show-on-all');
    const customSites = document.getElementById('custom-sites');
    const debugMode = document.getElementById('debug-mode');
    const contextMenu = document.getElementById('context-menu');
    const buttonDelay = document.getElementById('button-delay');
    const saveButton = document.getElementById('save-settings');
    const resetButton = document.getElementById('reset-settings');
    const statusMessage = document.getElementById('status-message');
    const dialogOverlay = document.getElementById('dialog-overlay');
    const cancelResetButton = document.getElementById('cancel-reset');
    const confirmResetButton = document.getElementById('confirm-reset');
    const previewButton = document.getElementById('preview-button');
    const positionPreview = document.getElementById('position-preview');

    // Default settings
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

    // Load settings from storage
    function loadSettings() {
        chrome.storage.sync.get(defaultSettings, function(settings) {
            themeSelect.value = settings.theme;
            positionSelect.value = settings.buttonPosition;
            offsetX.value = settings.offsetX;
            offsetY.value = settings.offsetY;
            buttonSize.value = settings.buttonSize;
            buttonStyle.value = settings.buttonStyle;
            showAnimation.checked = settings.showAnimation;
            enableShortcuts.checked = settings.enableShortcuts;
            autoDetect.checked = settings.autoDetect;
            showOnAll.checked = settings.showOnAll;
            customSites.value = settings.customSites;
            debugMode.checked = settings.debugMode;
            contextMenu.checked = settings.contextMenu;
            buttonDelay.value = settings.buttonDelay;

            // Apply theme to options page
            applyTheme(settings.theme);
            updatePreview();
        });
    }

    // Apply theme to options page
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.remove('dark-theme');
        } else if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else if (theme === 'auto') {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        }
    }

    // Update button position preview
    function updatePreview() {
        const position = positionSelect.value;
        const x = parseInt(offsetX.value);
        const y = parseInt(offsetY.value);
        const size = buttonSize.value;

        // Reset position
        previewButton.style.top = 'auto';
        previewButton.style.bottom = 'auto';
        previewButton.style.left = 'auto';
        previewButton.style.right = 'auto';

        // Apply position
        switch (position) {
            case 'top-right':
                previewButton.style.top = y + 'px';
                previewButton.style.right = x + 'px';
                break;
            case 'top-left':
                previewButton.style.top = y + 'px';
                previewButton.style.left = x + 'px';
                break;
            case 'bottom-right':
                previewButton.style.bottom = y + 'px';
                previewButton.style.right = x + 'px';
                break;
            case 'bottom-left':
                previewButton.style.bottom = y + 'px';
                previewButton.style.left = x + 'px';
                break;
        }

        // Apply size
        let padding, fontSize;
        switch (size) {
            case 'small':
                padding = '6px 10px';
                fontSize = '11px';
                break;
            case 'medium':
                padding = '8px 12px';
                fontSize = '12px';
                break;
            case 'large':
                padding = '10px 16px';
                fontSize = '14px';
                break;
        }
        previewButton.style.padding = padding;
        previewButton.style.fontSize = fontSize;

        // Apply style
        const style = buttonStyle.value;
        switch (style) {
            case 'gradient':
                previewButton.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                previewButton.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                break;
            case 'solid':
                previewButton.style.background = '#667eea';
                previewButton.style.border = '1px solid #5a67d8';
                break;
            case 'minimal':
                previewButton.style.background = 'rgba(102, 126, 234, 0.1)';
                previewButton.style.color = '#667eea';
                previewButton.style.border = '1px solid #667eea';
                break;
            case 'glass':
                previewButton.style.background = 'rgba(255, 255, 255, 0.2)';
                previewButton.style.backdropFilter = 'blur(10px)';
                previewButton.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                break;
        }
    }

    // Save settings
    function saveSettings() {
        const settings = {
            theme: themeSelect.value,
            buttonPosition: positionSelect.value,
            offsetX: parseInt(offsetX.value),
            offsetY: parseInt(offsetY.value),
            buttonSize: buttonSize.value,
            buttonStyle: buttonStyle.value,
            showAnimation: showAnimation.checked,
            enableShortcuts: enableShortcuts.checked,
            autoDetect: autoDetect.checked,
            showOnAll: showOnAll.checked,
            customSites: customSites.value,
            debugMode: debugMode.checked,
            contextMenu: contextMenu.checked,
            buttonDelay: parseInt(buttonDelay.value)
        };

        chrome.storage.sync.set(settings, function() {
            showStatus('Settings saved successfully!', 'success');
            
            // Apply theme immediately
            applyTheme(settings.theme);
            
            // Notify content scripts to update
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'updateSettings',
                        settings: settings
                    }).catch(() => {
                        // Ignore errors for tabs that don't have content script
                    });
                });
            });
        });
    }

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `status-message ${type} show`;
        
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 3000);
    }

    // Show custom confirmation dialog
    function showResetDialog() {
        dialogOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Hide custom confirmation dialog
    function hideResetDialog() {
        dialogOverlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Reset to defaults
    function resetSettings() {
        chrome.storage.sync.set(defaultSettings, function() {
            loadSettings();
            hideResetDialog();
            showStatus('All settings have been reset to default!', 'success');
            
            // Notify content scripts to update
            chrome.tabs.query({}, function(tabs) {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'updateSettings',
                        settings: defaultSettings
                    }).catch(() => {
                        // Ignore errors for tabs that don't have content script
                    });
                });
            });
        });
    }

    // Event listeners
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });

    positionSelect.addEventListener('change', updatePreview);
    offsetX.addEventListener('input', updatePreview);
    offsetY.addEventListener('input', updatePreview);
    buttonSize.addEventListener('change', updatePreview);
    buttonStyle.addEventListener('change', updatePreview);

    saveButton.addEventListener('click', saveSettings);
    resetButton.addEventListener('click', showResetDialog);
    cancelResetButton.addEventListener('click', hideResetDialog);
    confirmResetButton.addEventListener('click', resetSettings);

    // Close dialog when clicking overlay
    dialogOverlay.addEventListener('click', function(e) {
        if (e.target === dialogOverlay) {
            hideResetDialog();
        }
    });

    // Close dialog with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dialogOverlay.classList.contains('show')) {
            hideResetDialog();
        }
    });

    // Keyboard shortcut change
    document.getElementById('reset-shortcut').addEventListener('click', function() {
        chrome.tabs.create({
            url: 'chrome://extensions/shortcuts'
        });
    });

    // Load settings on page load
    loadSettings();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
            if (themeSelect.value === 'auto') {
                applyTheme('auto');
            }
        });
    }

    // Add keyboard shortcut for save
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveSettings();
        }
    });
});
