# BrilliantEigentikiData2025 - Year in Review

An animated, interactive year-in-review presentation that transforms your Brilliant.org learning data into a beautiful, engaging visualization. Styled after Brilliant and Duolingo apps with smooth animations, liquid glass design, dark mode, and comprehensive statistics.

## 🌐 Live Demo

**🚀 Live Site:** [https://bed2025-ten.vercel.app](https://bed2025-ten.vercel.app)

**Repository:** [https://github.com/tolani007/BrilliantEigentikiData2025](https://github.com/tolani007/BrilliantEigentikiData2025)

**Deploy Now:**
- [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/tolani007/BrilliantEigentikiData2025) (Recommended)
- [Deploy on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/tolani007/BrilliantEigentikiData2025)

*Your site is live and accessible to anyone!*

## 🎯 Overview

This project processes your Brilliant.org data export and creates an animated presentation showcasing:
- Lessons completed
- Problems solved with accuracy metrics
- Practice sets completed
- Learning streaks
- Course progress
- Daily and monthly activity patterns
- Visual statistics and charts

## ✨ Features

- **Animated Hero Section**: Eye-catching opening with smooth animations
- **Scroll-Triggered Animations**: Sections animate as you scroll for engaging experience
- **Interactive Statistics**: Animated counting numbers and progress bars
- **Activity Timeline**: Visual heatmap and monthly activity charts with hover effects
- **Streak Visualization**: Beautiful streak displays with timeline
- **Course Progress**: Individual course cards with progress indicators
- **Problem Statistics**: Charts showing problem-solving performance with glass tooltips
- **Liquid Glass Design**: Modern glassmorphism effects with shimmer animations
- **Duolingo-style Animations**: Bouncy spring animations with playful interactions
- **Sound Effects**: Web Audio API-based sound feedback for all interactions
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Optimized Performance**: Fast, smooth animations optimized for all devices
- **Enhanced Text Contrast**: Maximum visibility with improved color choices

## 🛠️ Technologies

- **React 18** with TypeScript
- **Framer Motion** for Duolingo-style spring animations
- **Web Audio API** for sound effects
- **Tailwind CSS** for styling
- **Recharts** for data visualizations
- **Python 3** for data processing

## 📁 Project Structure

```
year-in-review/
├── scripts/
│   └── extract-data.py          # Python script to process JSON data
├── src/
│   ├── components/              # React components
│   │   ├── Hero.tsx             # Opening hero section
│   │   ├── StatCard.tsx         # Animated statistic cards
│   │   ├── Timeline.tsx         # Activity timeline visualization
│   │   ├── StreakDisplay.tsx   # Streak visualization
│   │   ├── CourseCard.tsx      # Course progress cards
│   │   ├── ProblemStats.tsx    # Problem statistics with charts
│   │   ├── ProgressBar.tsx     # Animated progress bars
│   │   └── Celebration.tsx     # Celebration animations
│   ├── data/
│   │   └── processed-data.json  # Processed data (generated)
│   ├── styles/
│   │   └── index.css            # Global styles with Tailwind
│   ├── App.tsx                  # Main application component
│   ├── index.tsx                 # React entry point
│   └── types.ts                  # TypeScript type definitions
├── public/
│   └── index.html               # HTML template
├── package.json                 # Node.js dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                    # This file
```

## 🚀 Quick Start & Deployment

### Option 1: Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tolani007/BrilliantEigentikiData2025)

**Method A: Via Vercel Dashboard (Recommended if button doesn't work)**
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select the repository: `tolani007/BrilliantEigentikiData2025`
4. Vercel will auto-detect React - just click "Deploy"
5. Your site will be live in ~2 minutes!

**Method B: Via Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Troubleshooting Vercel:**
- If you see "Preparing Git Repository" error, try:
  1. Wait a few minutes and try again (sometimes Vercel has temporary issues)
  2. Use Method A above (dashboard import is more reliable)
  3. Ensure your GitHub repository is public or you've granted Vercel access
  4. Try deploying via Netlify as an alternative (see Option 2)

### Option 2: Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tolani007/BrilliantEigentikiData2025)

1. Click the button above or visit [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy!

### Option 3: Local Development

### Prerequisites

- **Node.js** (v16 or higher) and npm
- **Python 3** (for data extraction)
- Brilliant.org data export (JSON files in `analytics/` and `production/` folders)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd year-in-review
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Prepare your data:**
   - Place your Brilliant.org data export in the parent directory
   - Ensure you have `analytics/` and `production/` folders with JSON files

4. **Extract and process data:**
   ```bash
   npm run extract-data
   # or directly:
   python3 scripts/extract-data.py
   ```
   
   This will:
   - Parse all JSON files from `analytics/` and `production/` directories
   - Filter data for 2025
   - Calculate statistics and metrics
   - Generate `src/data/processed-data.json`

### Running the Application

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Open your browser:**
   - The app will automatically open at `http://localhost:3000`
   - Hot reload is enabled for development

3. **Build for production:**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `build/` folder.

## 📊 Data Processing

The `extract-data.py` script processes your Brilliant.org data export:

### What it extracts:
- **Lessons**: Completed lessons with timestamps
- **Problems**: Problem interactions and completions
- **Practice Sets**: Completed practice sets with scores
- **Streaks**: Learning streak records
- **Courses**: Course progress and completion status
- **Student Actions**: Various learning activities

### Statistics calculated:
- Total lessons completed
- Total problems attempted/completed
- Practice sets completed
- Accuracy percentage
- Longest streak
- Daily and monthly activity patterns
- Active courses count

### Output:
The script generates `src/data/processed-data.json` with all processed data in a format optimized for the React application.

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
colors: {
  brilliant: {
    blue: '#4A90E2',
    // ... customize colors
  }
}
```

### Data Year
To change the year being analyzed, edit `scripts/extract-data.py`:
```python
def is_2025_date(date_str):
    # Change 2025 to your desired year
    return dt.year == 2025
```

### Components
All components are in `src/components/` and can be customized:
- Modify animations in component files
- Adjust styling with Tailwind classes
- Add or remove sections in `App.tsx`

## 📱 Features Breakdown

### Hero Section
- Animated background particles
- Smooth fade-in animations
- Scroll indicator
- Call-to-action button

### Statistics Cards
- Animated number counting with success sound on completion
- Icon support with Duolingo-style hover animations
- Color-coded by category
- Scroll-triggered animations
- Sound feedback on hover and interaction

### Timeline
- Monthly activity bar chart
- Daily activity heatmap
- Visual activity patterns

### Problem Statistics
- Bar chart for monthly activity
- Pie chart for accuracy breakdown
- Summary cards with key metrics

### Streak Display
- Longest streak highlight
- Total streaks count
- Visual streak timeline
- Animated progress bars

### Course Cards
- Individual course progress
- Completion percentages
- Last active timestamps
- Color-coded by course

## 🐛 Troubleshooting

### Vercel Deployment Issues

**"Preparing Git Repository" Error:**
- This is usually a temporary Vercel issue. Try:
  1. Wait 5-10 minutes and retry
  2. Use Vercel Dashboard instead of the deploy button
  3. Go to [vercel.com/new](https://vercel.com/new) and manually import the repo
  4. Ensure your GitHub account is connected to Vercel
  5. Check repository permissions in GitHub settings

**Build Fails on Vercel:**
- Ensure `package.json` has all dependencies listed
- Check that `src/data/processed-data.json` exists (it's included in the repo)
- Verify Node.js version (project requires Node 16+)

### Data not loading
- Ensure `src/data/processed-data.json` exists
- Run `npm run extract-data` to regenerate
- Check that source data files are in the correct location

### Build errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v16+)
- Ensure all dependencies are installed

### Animation issues
- Check browser console for errors
- Ensure Framer Motion is properly installed
- Verify React version compatibility

## 📝 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run extract-data` - Process data files

## 🔧 Configuration

### TypeScript
Configuration in `tsconfig.json` - adjust for your needs.

### Tailwind CSS
Configuration in `tailwind.config.js` - customize colors, fonts, and animations.

### React Scripts
Standard Create React App configuration - see [CRA docs](https://create-react-app.dev/) for details.

## 🚀 Deployment

This project is ready to deploy! After pushing to GitHub, you can deploy on:

### Quick Deploy Options

**Vercel (Recommended):**
1. Push to GitHub (see `QUICK_START.md`)
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel auto-detects React - just click "Deploy"
4. Your site is live! 🎉

**Netlify:**
1. Push to GitHub (see `QUICK_START.md`)
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Build command: `npm run build`
4. Publish directory: `build`
5. Deploy!

**Live URL:** Your site is automatically deployed and updates whenever you push to GitHub! 

**Auto-Deployment:** Vercel automatically rebuilds and deploys your site whenever you push changes to the `main` branch. Just push to GitHub and your changes will be live in 1-2 minutes!

For detailed deployment instructions, see `DEPLOYMENT.md` or `QUICK_START.md`.

For detailed instructions, see `DEPLOYMENT.md` or `QUICK_START.md`.

## 📄 License

This project is provided as-is for personal use with your Brilliant.org data.

## 🙏 Acknowledgments

- Inspired by Brilliant.org and Duolingo app designs
- Built with React, Framer Motion, and Tailwind CSS
- Data visualization powered by Recharts

## 📧 Support

If you encounter issues or need help:
- Check the troubleshooting section
- Review the code comments
- Ensure all prerequisites are installed

---

**Enjoy your year in review! 🎉**

