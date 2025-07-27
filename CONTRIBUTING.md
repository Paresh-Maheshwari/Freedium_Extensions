# Contributing to Freedium Extensions

Thank you for your interest in contributing to the Freedium Extensions project! 🎉

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Freedium_Extensions.git
   cd Freedium_Extensions
   ```
3. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🛠️ Development Setup

1. Load the extension in your browser for testing:
   - Chrome: Go to `chrome://extensions/`, enable Developer mode, click "Load unpacked"
   - Firefox: Go to `about:debugging`, click "Load Temporary Add-on"

2. Make your changes and test thoroughly

3. Ensure your code follows the existing style and patterns

## 📝 Contribution Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Add comments for complex logic
- Follow existing naming conventions
- Keep functions small and focused

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Examples:
  - `Add support for new publication domain`
  - `Fix button positioning on mobile devices`
  - `Update README with new installation steps`

### Pull Request Process

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Create a pull request** with:
   - Clear title and description
   - Screenshots if UI changes
   - List of changes made
   - Any breaking changes

## 🐛 Bug Reports

When reporting bugs, please include:
- Browser and version
- Extension version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Check if it already exists or is planned
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🌐 Adding New Sites

To add support for new publications:

1. **Update `manifest.json`**:
   ```json
   "matches": [
     "*://newsite.com/*",
     "*://*.newsite.com/*"
   ]
   ```

2. **Test the site** with the extension
3. **Update README.md** to list the new site
4. **Submit a pull request**

## 🎨 Design Guidelines

- Maintain consistency with existing UI
- Ensure accessibility (color contrast, keyboard navigation)
- Test on different screen sizes
- Follow Material Design principles where applicable

## 📚 Documentation

- Update README.md for user-facing changes
- Add inline comments for complex code
- Update CONTRIBUTING.md if process changes
- Keep documentation clear and concise

## ✅ Testing

Before submitting:
- [ ] Test on multiple browsers (Chrome, Firefox, Edge)
- [ ] Test on different screen sizes
- [ ] Verify no console errors
- [ ] Test all extension features still work
- [ ] Check that new code doesn't break existing functionality

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person

## 📞 Getting Help

- Open an issue for questions
- Check existing issues and PRs first
- Be patient and respectful

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Appreciated by the community!

---

Thank you for contributing to make the web more accessible! 🌟
