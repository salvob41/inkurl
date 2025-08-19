# Deployment Guide

## 🚀 Quick Deploy to GitHub Pages

### Prerequisites
- GitHub repository set up
- Node.js and npm installed
- Git configured

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit with Vite bundler"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select "GitHub Actions" as the source
   - The workflow will automatically deploy on push

3. **Manual Deployment (Optional)**
   ```bash
   npm run deploy
   ```

## 🔧 Local Development

### Start Development Server
```bash
npm run dev
```
Open http://localhost:3000

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📁 Build Output

The build process creates a `dist/` folder containing:
- `index.html` - Main application
- `assets/` - Bundled JavaScript and CSS
- Optimized CodeMirror bundles
- Minified and optimized assets

## 🌐 GitHub Actions

The `.github/workflows/deploy.yml` file automatically:
- Builds the project using Vite
- Optimizes assets
- Deploys to GitHub Pages
- Provides live URL at `https://username.github.io/inkurl/`

## ⚠️ Important Notes

- **Base Path**: Update `vite.config.js` if your repository name is different from `inkurl`
- **Branch**: The workflow triggers on pushes to the `main` branch
- **Permissions**: Ensure GitHub Pages has write permissions

## 🐛 Troubleshooting

### Build Fails
- Check all dependencies are installed: `npm install`
- Verify import statements in `script.js`
- Check console for specific error messages

### Deployment Issues
- Ensure GitHub Actions are enabled
- Check workflow run logs in Actions tab
- Verify repository permissions

### Local Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify Vite configuration
