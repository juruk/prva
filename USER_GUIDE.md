# Construction Project Manager - User Guide

## Overview

**Construction Project Manager** is a comprehensive web application designed specifically for construction companies managing internal remodeling and office space projects. The application helps you track projects, manage phases, coordinate with architects and contractors, and monitor deadlines—all in one centralized platform.

---

## Key Features

### 📊 Dashboard
- **Real-time Statistics**: View total projects, architects, contractors, and overdue phases at a glance
- **Project Status Overview**: Visual breakdown of started, finished, and on-hold projects
- **Upcoming Deadlines**: See phases ending within the next 7 days
- **Overdue Alerts**: Immediate visibility of phases that have passed their deadline
- **Recent Projects**: Quick access to your latest project updates

### 📁 Projects Management
- **Create & Edit Projects**: Add new projects with names, status, assigned architect, and notes
- **Status Filtering**: Filter projects by All, Started, Finished, or On Hold
- **Phase Management**: Add multiple phases to each project with:
  - Phase name
  - Start and end dates (calendar picker)
  - Assigned contractor
- **Project Notes**: Keep detailed notes for each project
- **Visual Status Indicators**: Color-coded status badges for quick identification

### 👥 Architects Management
- **Contact Information**: Store name, email, and phone for each architect
- **Active Projects**: See current projects assigned to each architect
- **Project History**: Track completed projects for each architect
- **Performance Metrics**: View active vs. completed project counts

### 🔨 Contractors Management
- **Specialty Tracking**: Categorize contractors by their field (Electrical, Plumbing, HVAC, etc.)
- **Contact Details**: Maintain email and phone information
- **Project Assignment**: Automatically linked to projects through phases
- **Work History**: View both active and completed projects
- **Color-Coded Specialties**: Visual identification of contractor types

---

## How to Use

### Getting Started

1. **Add Architects**: Start by adding your architect contacts in the Architects tab
2. **Add Contractors**: Add your contractor network with their specialties
3. **Create Projects**: Create your first project and assign an architect
4. **Add Phases**: Break down projects into manageable phases with deadlines and contractor assignments

### Managing Projects

#### Creating a New Project
1. Click **"Add Project"** button in the Projects tab
2. Fill in:
   - **Project Name** (required): e.g., "Downtown Office Renovation - Floor 3"
   - **Status** (required): Started, Finished, or On Hold
   - **Architect**: Select from your architect list
   - **Notes**: Add any relevant project information
3. Click **"Create"**

#### Adding Phases to a Project
1. Open a project card
2. Click **"Add Phase"**
3. Enter:
   - **Phase Name** (required): e.g., "Electrical System Installation"
   - **Start Date** (required): Use the calendar picker
   - **End Date** (required): Use the calendar picker
   - **Contractor**: Select from your contractor list
4. Click **"Add"**

#### Editing Projects or Phases
- Click the **edit icon** (pencil) on any project or phase
- Make your changes
- Click **"Update"**

#### Deleting Projects or Phases
- Click the **delete icon** (trash) on any project or phase
- Confirm the deletion

### Managing Architects & Contractors

#### Adding an Architect
1. Go to the **Architects** tab
2. Click **"Add Architect"**
3. Enter:
   - **Name** (required)
   - **Email** (optional)
   - **Phone** (optional)
4. Click **"Add"**

#### Adding a Contractor
1. Go to the **Contractors** tab
2. Click **"Add Contractor"**
3. Enter:
   - **Name** (required)
   - **Specialty Field** (required): e.g., Electrical, Plumbing, HVAC
   - **Email** (optional)
   - **Phone** (optional)
4. Click **"Add"**

---

## Data Management

### Export Data (Backup)

**Important**: Your data is stored locally in your browser. Regular backups are essential!

1. Click **"Export Data"** button in the header
2. A JSON file will be downloaded with the current date: `construction-pm-backup-YYYY-MM-DD.json`
3. Save this file to a secure location (local drive, cloud storage, etc.)

**Recommended**: Export your data weekly or after significant updates.

### Import Data (Restore)

1. Click **"Import Data"** button in the header
2. Select your previously exported JSON backup file
3. Your data will be restored immediately
4. A confirmation message will appear

### GitHub Backup Strategy

To store your data on GitHub for team access and version control:

1. **Export your data** using the Export button
2. **Create a GitHub repository** for your project data
3. **Upload the JSON file** to the repository
4. **Commit regularly** after major updates
5. **Share the repository** with team members who need access
6. **To restore**: Download the JSON file from GitHub and use the Import button

---

## Tips & Best Practices

### Project Management
- ✅ Use clear, descriptive project names including location or floor details
- ✅ Update project status regularly (Started → Finished)
- ✅ Add detailed notes about client requirements, special considerations, or challenges
- ✅ Break projects into logical phases (Demolition, Electrical, HVAC, Finishing, etc.)

### Phase Management
- ✅ Set realistic start and end dates for each phase
- ✅ Assign contractors to phases as soon as they're confirmed
- ✅ Check the Dashboard regularly for upcoming deadlines
- ✅ Address overdue phases immediately

### Architect & Contractor Management
- ✅ Keep contact information up to date
- ✅ Use consistent naming for contractors (company names)
- ✅ Specify contractor specialties clearly for easy filtering
- ✅ Review project history when selecting contractors for new work

### Data Safety
- ✅ **Export your data weekly** or after significant changes
- ✅ Store backups in multiple locations (local + cloud)
- ✅ Consider using GitHub for team collaboration and version control
- ✅ Test your backup by importing it occasionally to verify integrity

---

## Understanding Status Colors

### Project Status
- 🔵 **Blue** = Started (active projects)
- 🟢 **Green** = Finished (completed projects)
- 🟠 **Orange** = On Hold (paused projects)

### Deadline Indicators
- 🔴 **Red Badge** = Overdue or due within 2 days
- ⚪ **Gray Badge** = Due in 3-7 days
- 🟢 **Green Badge** = Completed phases

### Contractor Specialties
- 🟡 **Yellow** = Electrical
- 🔵 **Blue** = Plumbing
- 🔷 **Cyan** = HVAC
- 🟠 **Amber** = Carpentry
- 🟣 **Purple** = Painting
- 🟤 **Stone** = Flooring
- 🔴 **Red** = Demolition
- ⚫ **Gray** = General

---

## Technical Information

### Data Storage
- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- Data persists between sessions on the same browser
- Clearing browser data will delete your information (always keep backups!)

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Fully responsive design works on desktop, tablet, and mobile
- Requires JavaScript enabled

### Privacy & Security
- Your data never leaves your device unless you export it
- No user accounts or login required
- No tracking or analytics
- Complete data ownership and control

---

## Troubleshooting

### Data Not Appearing
- Check if you're using the same browser where you entered the data
- Try importing your latest backup file
- Ensure JavaScript is enabled in your browser

### Export Not Working
- Check your browser's download settings
- Ensure pop-ups are not blocked
- Try a different browser

### Import Failed
- Verify the JSON file is not corrupted
- Ensure you're importing a file exported from this application
- Check the file format is `.json`

### Changes Not Saving
- Ensure you click "Create" or "Update" buttons after making changes
- Check browser console for errors (F12 key)
- Try refreshing the page and re-entering data

---

## Support & Feedback

For questions, issues, or feature requests, please visit: **https://help.manus.im**

---

## Version Information

**Application**: Construction Project Manager  
**Version**: 1.0  
**Release Date**: October 2025  
**Framework**: React with Tailwind CSS  
**Data Storage**: Browser localStorage  

---

## Quick Reference

| Action | Location | Button |
|--------|----------|--------|
| Add Project | Projects Tab | "+ Add Project" |
| Add Phase | Project Card | "+ Add Phase" |
| Add Architect | Architects Tab | "+ Add Architect" |
| Add Contractor | Contractors Tab | "+ Add Contractor" |
| Export Data | Header | "Export Data" |
| Import Data | Header | "Import Data" |
| Edit Item | Any Card | Pencil Icon |
| Delete Item | Any Card | Trash Icon |
| Filter Projects | Projects Tab | Status Buttons |
| View Dashboard | Dashboard Tab | Dashboard Button |

---

**Remember**: Regular data exports are your safety net. Make it a habit to export your data after significant updates!

