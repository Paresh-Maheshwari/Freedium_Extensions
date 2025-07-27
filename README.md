# 🆓 Freedium Medium Redirector Extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/webstore)
[![Firefox Add-ons](https://img.shields.io/badge/Firefox-Add--on-orange.svg)](https://addons.mozilla.org/)

A powerful browser extension that adds a "Free Read" button to Medium articles and other paywalled content, allowing you to open them in Freedium for free reading without restrictions.

## ✨ Features

- 🆓 **One-click access** to Freedium for any Medium article
- 🎯 **Automatic detection** of Medium and Medium-hosted publications
- 🎨 **Beautiful floating button** with modern gradient design
- 📱 **Responsive design** that works on mobile and desktop
- ⚡ **SPA support** - Works with Single Page Applications
- 🖱️ **Right-click context menu** for universal access
- ⌨️ **Keyboard shortcut** for power users
- 🔒 **Privacy-focused** - No data collection or tracking

## 🌐 Supported Sites

- **Medium.com** and all Medium-hosted publications
- **Substack.com** - Newsletter platforms
- **TowardsDataScience.com** - Data science articles
- **InfoSecWriteups.com** - Cybersecurity content
- **BetterProgramming.pub** - Programming tutorials
- **JavaScript.PlainEnglish.io** - JavaScript guides
- **Python.PlainEnglish.io** - Python tutorials
- **LevelUp.GitConnected.com** - Developer content
- **Blog.DevGenius.io** - Tech articles
- And many more Medium-hosted publications!

## 🚀 Installation

### Chrome/Edge/Brave/Opera

1. **Download the extension:**
   ```bash
   git clone https://github.com/Paresh-Maheshwari/Freedium_Extensions.git
   cd Freedium_Extensions
   ```

2. **Load in browser:**
   - Open `chrome://extensions/` (or `edge://extensions/`)
   - Enable **"Developer mode"** (toggle in top right)
   - Click **"Load unpacked"**
   - Select the `Freedium_Extensions` folder
   - ✅ Extension installed successfully!

### Firefox

1. **Download the extension** (same as above)
2. **Load in Firefox:**
   - Open `about:debugging`
   - Click **"This Firefox"**
   - Click **"Load Temporary Add-on"**
   - Select the `manifest.json` file
   - ✅ Extension loaded successfully!

## 🎯 Usage

### Method 1: Floating Button (Automatic)
1. Navigate to any Medium article
2. Look for the **"Free Read"** button in the top-right corner
3. Click the button to open the article in Freedium

### Method 2: Right-Click Context Menu (Universal)
1. Right-click anywhere on any webpage
2. Select **"🆓 Open in Freedium"** from the context menu
3. Choose **"Open Current Page in Freedium"** or **"Open Link in Freedium"**
4. The page/link will open in Freedium in a new tab

### Method 3: Extension Popup
1. Click the extension icon in your browser toolbar
2. Click **"Open Current Page in Freedium"**
3. The current page will open in Freedium in a new tab

### Method 4: Keyboard Shortcut
1. Press `Ctrl+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)
2. The current page will open in Freedium in a new tab

## 🛠️ How It Works

The extension:
1. **Detects** when you're on a Medium or supported publication page
2. **Injects** a floating "Free Read" button with beautiful styling
3. **Redirects** to `https://freedium.cfd/[original-url]` when clicked
4. **Opens** the Freedium version in a new tab for seamless reading

## 🎨 Icons

The extension includes professionally designed icons in the `icons/` folder:
- `icons/icon16.png` - 16x16 toolbar icon
- `icons/icon48.png` - 48x48 extension manager icon  
- `icons/icon128.png` - 128x128 Chrome Web Store icon
- `icons/icon.svg` - Original SVG source file

**Icon Design Features:**
- Purple gradient background representing premium content
- Unlocked padlock symbolizing free access
- Green checkmark indicating availability
- Document lines representing articles
- "F" branding for Freedium

## ⚙️ Customization

### Button Position
Edit `styles.css` and modify the `.freedium-btn` positioning:
```css
.freedium-btn {
    top: 20px;    /* Distance from top */
    right: 20px;  /* Distance from right */
    /* Change to left: 20px; for left side */
}
```

### Button Appearance
Modify colors, size, or styling in `styles.css` to match your preferences.

### Add More Sites
Edit `manifest.json` and add more URL patterns to the `matches` array:
```json
"matches": [
    "*://your-site.com/*",
    "*://*.your-site.com/*"
]
```

## 🔧 Development

### Project Structure
```
Freedium_Extensions/
├── manifest.json     # Extension configuration
├── background.js     # Context menu handler
├── content.js        # Main content script
├── styles.css        # Button styling
├── popup.html        # Extension popup UI
├── popup.js          # Popup functionality
├── README.md         # Documentation
└── icons/            # Extension icons
    ├── icon.svg      # Original SVG
    ├── icon16.png    # Small icon
    ├── icon48.png    # Medium icon
    └── icon128.png   # Large icon
```

### Building from Source
```bash
# Clone the repository
git clone https://github.com/Paresh-Maheshwari/Freedium_Extensions.git
cd Freedium_Extensions

# Load in browser (see installation instructions above)
```

## 🐛 Troubleshooting

### Button Not Appearing
- Ensure you're on a supported site
- Check browser console for JavaScript errors
- Try refreshing the page
- Verify extension is enabled

### Extension Not Loading
- Ensure all files are in the same folder
- Check that `manifest.json` is valid JSON
- Make sure Developer mode is enabled
- Try reloading the extension

### Freedium Not Working
- Verify the URL format: `https://freedium.cfd/[original-url]`
- Some articles may not be available on Freedium
- Try the original Freedium website directly
- Check if the article is publicly accessible

## 🔒 Privacy & Security

This extension:
- ✅ **Only runs** on specified Medium-related domains
- ✅ **Does not collect** or store any personal data
- ✅ **Does not track** your browsing activity
- ✅ **Only accesses** the current page URL when you click the button
- ✅ **No external servers** - all processing is local
- ✅ **Open source** - code is fully transparent

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contributions:
- 🌐 Add support for more publications
- 🎨 Improve the design or functionality
- 🐛 Fix bugs or issues
- 📚 Improve documentation
- 🌍 Add internationalization support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Paresh Maheshwari**
- GitHub: [@Paresh-Maheshwari](https://github.com/Paresh-Maheshwari)

## 🙏 Acknowledgments

- [Freedium](https://freedium.cfd/) - For providing the free Medium reading service
- Medium - For creating great content (even if it's behind paywalls)
- The open-source community for inspiration and tools

## ⭐ Support

If you find this extension helpful, please:
- ⭐ **Star** this repository
- 🐛 **Report** any bugs or issues
- 💡 **Suggest** new features
- 🔄 **Share** with others who might find it useful

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Paresh-Maheshwari/Freedium_Extensions?style=social)
![GitHub forks](https://img.shields.io/github/forks/Paresh-Maheshwari/Freedium_Extensions?style=social)
![GitHub issues](https://img.shields.io/github/issues/Paresh-Maheshwari/Freedium_Extensions)

---

**Disclaimer:** This extension is for educational purposes. Please respect content creators and consider supporting them directly when possible. The extension simply redirects to Freedium, which is a third-party service.
