# Year in Review - Brilliant.org Learning Journey

An animated, interactive year-in-review presentation that transforms your Brilliant.org learning data into a beautiful, engaging visualization. Styled after Brilliant and Duolingo apps with smooth animations, colorful design, and comprehensive statistics.

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
- **Interactive Statistics**: Animated counting numbers and progress bars
- **Activity Timeline**: Visual heatmap and monthly activity charts
- **Streak Visualization**: Beautiful streak displays with timeline
- **Course Progress**: Individual course cards with progress indicators
- **Problem Statistics**: Charts showing problem-solving performance
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion for fluid interactions

## 🛠️ Technologies

- **React 18** with TypeScript
- **Framer Motion** for animations
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

## 🚀 Getting Started

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
- Animated number counting
- Icon support
- Color-coded by category
- Scroll-triggered animations

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

