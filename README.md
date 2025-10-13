# Construction Project Manager

A comprehensive web-based project management application designed specifically for construction companies specializing in internal remodeling and office space equipping.

![Construction Project Manager](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## 🏗️ Overview

Construction Project Manager is a modern, responsive web application that helps construction companies efficiently manage multiple projects, coordinate with architects and contractors, track project phases, and visualize timelines with interactive Gantt charts.

## ✨ Key Features

### Project Management
- Create and manage multiple construction projects simultaneously
- Track project status (Started, Finished, On Hold)
- Add detailed project notes and documentation
- Visual Gantt chart timeline for each project
- Individual pages for each project with unique URLs

### Team Coordination
- Manage architects with company information and contact details
- Manage contractors with specialty fields and company information
- Assign multiple architects and contractors to each project
- Track active and completed projects for each team member
- Bidirectional navigation between projects and team members

### Phase Tracking
- Add multiple phases to each project
- Set start and end dates with calendar picker
- Assign contractors to specific phases
- Visual timeline representation in Gantt chart
- Track phase progress and deadlines

### Dashboard & Analytics
- Real-time overview of all projects
- Upcoming deadlines (phases ending within 7 days)
- Overdue phase alerts
- Project status breakdown
- Recent activity tracking

### Data Management
- Local browser storage (localStorage) for data persistence
- Export data as JSON for backup
- Import data from JSON files
- No external servers or databases required
- Complete data privacy and control

## 🎨 Design

The application features a professional, minimal design with:
- Black and white color scheme with bright accent colors
- Responsive layout for desktop, tablet, and mobile devices
- Intuitive navigation with tab-based interface
- Color-coded status indicators and badges
- Modern, clean UI components

## 🚀 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 6
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Deployment**: Static hosting (GitHub Pages, Netlify, Vercel)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/pnpm installed
- Modern web browser with localStorage support

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/construction-pm-app.git
cd construction-pm-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
pnpm build
```

The built files will be in the `/dist` directory.

## 📖 Usage Guide

### Getting Started

1. **Add Contractors**
   - Navigate to the Contractors tab
   - Click "Add Contractor"
   - Fill in name, company, specialty, email, and phone
   - Click "Add" to save

2. **Add Architects**
   - Navigate to the Architects tab
   - Click "Add Architect"
   - Fill in name, company, email, and phone
   - Click "Add" to save

3. **Create a Project**
   - Navigate to the Projects tab
   - Click "Add Project"
   - Enter project name, select status, and add notes
   - Click "Create" to save

4. **Assign Team Members**
   - Open a project detail page
   - Click "Manage" in the Architects section
   - Select one or more architects
   - Click "Manage" in the Contractors section
   - Select one or more contractors
   - Click "Save"

5. **Add Project Phases**
   - In the project detail page, scroll to Phases section
   - Click "Add Phase"
   - Enter phase name, start date, and end date
   - Select the contractor for this phase
   - Click "Add"
   - View the automatically updated Gantt chart

### Data Backup

To backup your data:
1. Click "Export Data" button in the top navigation
2. Save the JSON file to your computer
3. Store the file in a secure location (e.g., GitHub repository, cloud storage)

To restore data:
1. Click "Import Data" button
2. Select your previously exported JSON file
3. Your data will be loaded into the application

## 🌐 Deployment

### GitHub Pages

See the detailed [GitHub Deployment Guide](GITHUB_DEPLOYMENT_GUIDE.md) for step-by-step instructions.

Quick steps:
1. Create a GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in repository settings
4. Set source to `main` branch and `/dist` folder
5. Access your application at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Other Hosting Options

The application can be deployed to any static hosting service:
- **Netlify**: Connect your GitHub repository for automatic deployments
- **Vercel**: Import your GitHub repository and deploy with one click
- **Cloudflare Pages**: Connect repository and configure build settings

## 📁 Project Structure

```
construction-pm-app/
├── dist/                          # Production build output
├── public/                        # Public static assets
├── src/
│   ├── components/                # React components
│   │   ├── Dashboard.jsx          # Dashboard overview
│   │   ├── ProjectsList.jsx       # Projects list view
│   │   ├── ProjectDetail.jsx      # Individual project page
│   │   ├── GanttChart.jsx         # Gantt chart component
│   │   ├── ArchitectsList.jsx     # Architects list view
│   │   ├── ArchitectDetail.jsx    # Individual architect page
│   │   ├── ContractorsList.jsx    # Contractors list view
│   │   ├── ContractorDetail.jsx   # Individual contractor page
│   │   └── Navigation.jsx         # Navigation component
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   └── main.jsx                   # Application entry point
├── .gitignore                     # Git ignore rules
├── index.html                     # HTML template
├── package.json                   # Project dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── README.md                      # This file
├── GITHUB_DEPLOYMENT_GUIDE.md     # Deployment instructions
└── UPDATED_FEATURES.md            # Feature documentation
```

## 🔒 Privacy & Security

- **No user accounts required** - Start using immediately
- **No external servers** - All data stored locally in your browser
- **No data collection** - Complete privacy and control
- **No tracking** - Your data stays on your device
- **Export/Import** - Full data portability

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the application:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Vite for optimal performance
- UI components styled with Tailwind CSS
- Icons provided by Lucide React
- Inspired by modern project management tools

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the [Updated Features Guide](UPDATED_FEATURES.md) for detailed documentation
- Review the [GitHub Deployment Guide](GITHUB_DEPLOYMENT_GUIDE.md) for hosting help

## 🎯 Roadmap

Future enhancements under consideration:
- PDF export for project reports
- Email notifications for upcoming deadlines
- File attachments for projects and phases
- Advanced filtering and search capabilities
- Multi-user collaboration with real-time sync
- Mobile app version

## 📊 Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [GitHub Pages Documentation](https://docs.github.com/pages)

---

**Built with ❤️ for construction project management**

Start managing your construction projects efficiently today! 🏗️✨

