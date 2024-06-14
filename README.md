# Static Website Template
## Overview

This project is a static website template designed to simplify the development and deployment process. It includes features like auto file versioning for CSS and JS files to avoid browser cache issues and a pre-commit build step to reduce local build and push issues.

## Features
* **Auto File Versioning:** Ensures browsers load the latest versions of CSS and JS files, preventing cache-related issues.
* **Pre-commit Build:** Automates the build process before commits to ensure that the latest build is always pushed, reducing local build errors and inconsistencies.
* **Streamlined Development:** Simplifies the process for developers, as we no longer need to manually manage cache busting strategies.

## Getting Started
### Prerequisites
* [Node.js](https://nodejs.org/en) (version 16 or higher)
* [Git](https://git-scm.com/)

### Installation
1. #### Clone the repository:
   ```
   git clone https://github.com/yourusername/static-website-template.git
   cd static-website-template
   ```

2. #### Install dependencies:
   ```
   npm install
   ```
### Development
To start the development server, run:
   ```
   npm run watch
   ```
This will launch a local server at **`http://localhost:3000`** and watch for changes in the source files.

### Building the Project
To build the project for production, run:
```
npm run build
```
This will generate a **`dist`** directory with the minified and versioned CSS and JS files.

### Auto File Versioning
The build process appends a unique hash to the filenames of CSS and JS files to ensure that browsers load the most recent versions. For example:
* **`style.css`** becomes **`style.60ba2bcff2.css`**
* **`app.js`** becomes **`app.09f7cd85f6.js`**

### How It Works
* During the build, a unique hash based on the file content is appended to the filenames.
* References to these files in the HTML are automatically updated to point to the new versioned filenames.

### Pre-commit Build
A pre-commit hook is configured to run the build process before each commit. This ensures that the latest build is always included in your commits, reducing the risk of pushing incomplete or outdated builds.

#### Setting Up Pre-commit Hook
1. **Install Husky:**
   ```
   npm install husky --save-dev
   ```
2. **Enable Git hooks:**
   ```
   npx husky install
   ```
3. **Add pre-commit hook:**
   ```
   npx husky add .husky/pre-commit "npm run build && git add dist/"
   ```

### File Structure
```
static-website-template/
├── dist/               # Built files for production
├── src/                # Source files
│   ├── css/            # CSS files
│   ├── js/             # JavaScript files
│   ├── img/            # Image files
│   └── index.html      # HTML file
├── .husky/             # Husky pre-commit hooks
├── .gitignore          # Git ignore file
├── package.json        # NPM scripts and dependencies
├── README.md           # Project documentation
├── gulpfile.js         # Gulp configuration
└── webpack.config.js   # Webpack configuration
```

### Contributing
Contributions are welcome! Please fork this repository and submit pull requests for any features, bug fixes, or enhancements.

### Contact
For any questions or suggestions, please open an issue or contact [Dilip Mishra](mailto:dilip.mishra@bluestacks.com).
