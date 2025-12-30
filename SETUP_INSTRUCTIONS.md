# Setup Instructions for Full React App

## Current Status

✅ **Demo Available**: A standalone HTML demo is running at `http://localhost:8000/demo.html`

## To Run the Full React Application

### Step 1: Install Node.js

**Option A: Using Homebrew (macOS)**
```bash
brew install node
```

**Option B: Download from Official Site**
1. Visit https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Verify installation: `node --version` and `npm --version`

### Step 2: Install Dependencies

Once Node.js is installed, navigate to the project directory and run:

```bash
cd "/Users/tiki/Desktop/machine learning hub/data/year-in-review"
npm install
```

This will install all required packages:
- React and React DOM
- TypeScript
- Framer Motion (animations)
- Tailwind CSS (styling)
- Recharts (charts)
- And all other dependencies

### Step 3: Start the Development Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

### Step 4: Build for Production (Optional)

To create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

## Viewing the Demo

While you set up Node.js, you can view the demo:

1. **Demo is running at**: `http://localhost:8000/demo.html`
2. Open your browser and navigate to that URL
3. The demo shows a static preview of the year-in-review presentation

## Troubleshooting

### If npm install fails:
- Make sure Node.js is properly installed
- Try clearing npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`, then try again

### If the app won't start:
- Check that port 3000 is not in use
- Verify all dependencies installed correctly
- Check the console for error messages

### If data doesn't load:
- Run the data extraction script: `npm run extract-data`
- Verify `src/data/processed-data.json` exists

## What's Different Between Demo and Full App?

**Demo (HTML)**:
- Static HTML/CSS/JavaScript
- Shows the layout and design
- Basic animations
- No interactive charts

**Full React App**:
- Fully interactive components
- Smooth Framer Motion animations
- Interactive Recharts visualizations
- Scroll-triggered animations
- Number counting animations
- Real-time data loading
- Responsive design optimizations

## Next Steps

1. Install Node.js (see Step 1 above)
2. Run `npm install`
3. Run `npm start`
4. Enjoy your fully animated year-in-review! 🎉


