# Changelog

All notable changes to the Freedium Extensions project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added
- 🆓 **Floating "Free Read" button** that appears automatically on Medium articles
- 🖱️ **Right-click context menu** for universal access on any webpage
- ⌨️ **Keyboard shortcut** (`Ctrl+Shift+F` / `Cmd+Shift+F`) for quick access
- 🎨 **Extension popup** with "Open Current Page in Freedium" button
- 🌐 **Multi-site support** for Medium and Medium-hosted publications:
  - Medium.com and all Medium-hosted publications
  - Substack.com
  - TowardsDataScience.com
  - InfoSecWriteups.com
  - BetterProgramming.pub
  - JavaScript.PlainEnglish.io
  - Python.PlainEnglish.io
  - LevelUp.GitConnected.com
  - Blog.DevGenius.io
- ⚡ **SPA support** - Works with Single Page Applications
- 📱 **Responsive design** that works on mobile and desktop
- 🎨 **Beautiful gradient button design** with hover effects
- 🔒 **Privacy-focused** - No data collection or tracking
- 🎯 **Professional icons** with unlock/free access theme

### Technical Details
- Manifest V3 compliance for modern browsers
- Content script injection for supported sites
- Background service worker for context menu handling
- CSS styling with modern gradients and animations
- Cross-browser compatibility (Chrome, Firefox, Edge, Safari)

### Files Structure
```
Freedium_Extensions/
├── manifest.json     # Extension configuration
├── background.js     # Context menu handler
├── content.js        # Main content script
├── styles.css        # Button styling
├── popup.html        # Extension popup UI
├── popup.js          # Popup functionality
├── README.md         # Documentation
├── LICENSE           # MIT License
├── CONTRIBUTING.md   # Contribution guidelines
├── CHANGELOG.md      # Version history
└── icons/            # Extension icons
    ├── icon.svg      # Original SVG
    ├── icon16.png    # Small icon
    ├── icon48.png    # Medium icon
    └── icon128.png   # Large icon
```

---

## Future Planned Features

### [1.1.0] - Planned
- [ ] Options page for customization
- [ ] Custom button positioning
- [ ] Theme selection (light/dark)
- [ ] Statistics tracking (local only)
- [ ] More publication support

### [1.2.0] - Planned
- [ ] Internationalization (i18n) support
- [ ] Custom keyboard shortcuts
- [ ] Button animation options
- [ ] Export/import settings

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
