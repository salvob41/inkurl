# InkUrl

A minimalist, private, and serverless Markdown editor inspired by Notion and Peerpad. Create, edit, and share formatted text instantly—no accounts, no servers, just your words in the URL.

## ✨ Features

- **🔒 Privacy First**: No accounts, no servers, no data collection
- **📝 Markdown Editor**: Professional editing with CodeMirror 6
- **👁️ Live Preview**: Real-time Markdown rendering
- **🔗 URL Storage**: All content encoded in the URL hash
- **📱 Responsive Design**: Works on desktop and mobile
- **🎨 Clean UI**: Peerpad-inspired minimalist aesthetic
- **📊 Smart Gutter**: Navigate headings with visual markers
- **🔄 Soft Wraps**: Long lines wrap without breaking line numbers

## 🚀 Getting Started

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inkurl.git
   cd inkurl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES6 Modules)
- **Editor**: CodeMirror 6 with Markdown support
- **Markdown**: Marked.js for rendering
- **Bundler**: Vite for fast development and optimized builds
- **Styling**: CSS3 with modern features
- **Deployment**: GitHub Pages with GitHub Actions

## 🏗️ Architecture

- **Serverless**: All content stored in URL hash using base64 encoding
- **Modular**: ES6 modules for clean code organization
- **Progressive**: Graceful fallback to basic editor if CodeMirror fails
- **Responsive**: Mobile-first design with flexible layouts

## 📁 Project Structure

```
inkurl/
├── index.html          # Main application HTML
├── script.js           # Core application logic
├── style.css           # Application styling
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── .github/            # GitHub Actions workflows
└── docs/               # Documentation
```

## 🌐 Deployment

### GitHub Pages

The project automatically deploys to GitHub Pages when you push to the `main` branch. The GitHub Actions workflow:

1. Builds the project using Vite
2. Optimizes assets and creates bundles
3. Deploys to GitHub Pages
4. Provides a live URL at `https://yourusername.github.io/inkurl/`

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder to your web server
3. Ensure your server supports single-page applications

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` file is configured for GitHub Pages deployment:

- Base path: `/inkurl/` (adjust for your repository name)
- Asset optimization: Manual chunk splitting for CodeMirror
- Build output: `dist/` directory

### Customization

- **Repository Name**: Update `base` in `vite.config.js`
- **Styling**: Modify `style.css` for custom themes
- **Features**: Extend `script.js` with additional functionality

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **ES6 Modules**: Required for proper functionality
- **CSS Grid/Flexbox**: Used for responsive layouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **CodeMirror**: Professional code editing
- **Marked.js**: Markdown parsing and rendering
- **Vite**: Fast build tooling
- **Peerpad**: UI inspiration

---

Built with ❤️ for privacy and simplicity
