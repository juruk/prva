# Authentication & Access Control Guide

## 🔐 Overview

Your Construction Project Manager now includes a **password-protected authentication system** with two access levels:

1. **Admin Access** - Full control (create, edit, delete)
2. **Read-Only Access** - View-only access (no modifications)

---

## 🚀 Quick Start

### Accessing the Application

1. Open the application URL
2. You'll see a **splash screen** with password entry
3. Enter one of the passwords:
   - **Admin**: `admin123` (default - change this!)
   - **Read-Only**: `view123` (default - change this!)
4. Click "Access Application"

### First Time Setup

**⚠️ IMPORTANT**: Change the default passwords before sharing with your team!

See [PASSWORD_SETUP.md](PASSWORD_SETUP.md) for detailed instructions on changing passwords.

---

## 👤 Access Levels Explained

### Admin Access

**Password**: `admin123` (default)

**Capabilities**:
- ✅ View all projects, architects, contractors
- ✅ Create new projects, architects, contractors
- ✅ Edit existing records
- ✅ Delete records
- ✅ Add and manage project phases
- ✅ Assign architects and contractors to projects
- ✅ Export data as JSON backup
- ✅ Import data from JSON files

**Badge**: Shows "Admin" with shield icon 🛡️

**Use For**:
- Project managers
- Company owners
- Administrators
- Anyone who needs to update project information

### Read-Only Access

**Password**: `view123` (default)

**Capabilities**:
- ✅ View all projects, architects, contractors
- ✅ View project phases and timelines
- ✅ View Gantt charts
- ✅ Export data as JSON backup
- ✅ Navigate between all pages
- ❌ **Cannot** create new records
- ❌ **Cannot** edit existing records
- ❌ **Cannot** delete records
- ❌ **Cannot** import data

**Badge**: Shows "Read-Only" with eye icon 👁️

**Use For**:
- Team members who need to check project status
- Architects who want to see their assigned projects
- Contractors checking their work schedules
- Stakeholders who need project visibility
- Anyone who should view but not modify data

---

## 🎯 User Interface Differences

### For Admin Users

When logged in as admin, you'll see:
- **"Admin" badge** in the header (black background)
- **"Add" buttons** on all list pages (Projects, Architects, Contractors)
- **"Edit" and "Delete" buttons** on detail pages
- **"Manage" buttons** to assign architects/contractors
- **"Add Phase" button** in projects
- **"Import Data" button** in the header

### For Read-Only Users

When logged in as read-only, you'll see:
- **"Read-Only" badge** in the header (gray background)
- **NO "Add" buttons** - cannot create new records
- **NO "Edit" or "Delete" buttons** - cannot modify records
- **NO "Manage" buttons** - cannot assign team members
- **NO "Add Phase" button** - cannot add phases
- **NO "Import Data" button** - cannot import data
- **"Export Data" button** is still available

---

## 🔄 Session Management

### Staying Logged In

- Your login session is saved in browser localStorage
- You'll remain logged in even after closing the browser
- No need to re-enter password on each visit

### Logging Out

Click the **"Logout" button** in the header to:
- End your current session
- Return to the splash screen
- Require password re-entry

### Switching Access Levels

To switch from admin to read-only (or vice versa):
1. Click "Logout"
2. Enter the other password
3. Click "Access Application"

---

## 📊 Data Access

### What Data Can Each Role Access?

Both admin and read-only users can **view** the same data:
- All projects (Started, Finished, On Hold)
- All architects and their assigned projects
- All contractors and their assigned projects
- All project phases and timelines
- Gantt charts and visualizations
- Dashboard statistics

The **only difference** is the ability to **modify** data.

### Data Export

Both roles can export data:
- Click "Export Data" in the header
- Downloads a JSON file with all data
- Use for backups or sharing with team

### Data Import

**Only admins** can import data:
- Click "Import Data" in the header
- Select a previously exported JSON file
- All data will be loaded into the application

---

## 🔒 Security Considerations

### Current Security Model

This is a **client-side authentication system**:
- ✅ Simple and easy to use
- ✅ No server or database required
- ✅ Works offline
- ✅ Free to host
- ⚠️ Passwords are in the source code
- ⚠️ Not suitable for highly sensitive data

### Best Practices

1. **Change default passwords immediately**
   - See [PASSWORD_SETUP.md](PASSWORD_SETUP.md)

2. **Share passwords securely**
   - Use password managers
   - Don't send via email or chat
   - Share in person when possible

3. **Limit admin access**
   - Only 1-2 people should have admin password
   - Most team members should use read-only access

4. **Regular backups**
   - Export data regularly
   - Store backups in secure location
   - Consider using GitHub for version control

5. **Update passwords periodically**
   - Change every 3-6 months
   - Update if team members leave
   - Update if password is compromised

### When to Upgrade Security

Consider implementing a backend authentication system if:
- You have 20+ users
- You need individual user accounts
- You need audit logs
- You handle sensitive financial data
- You need compliance (HIPAA, SOC 2, etc.)
- You need password reset functionality

---

## 🛠️ Troubleshooting

### "Invalid password" Error

**Problem**: Password not accepted

**Solutions**:
1. Check for typos (passwords are case-sensitive)
2. Verify you're using the correct password
3. Check if passwords were changed in the code
4. Clear browser cache and try again

### Stuck on Login Screen

**Problem**: Can't access the application

**Solutions**:
1. Verify the application is loaded correctly
2. Check browser console for errors (F12)
3. Try a different browser
4. Clear browser localStorage:
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Delete all items
   - Refresh the page

### Can't See Edit/Delete Buttons

**Problem**: Logged in but can't modify data

**Solution**:
- You're logged in as **read-only**
- Log out and log back in with **admin password**
- Check the badge in the header to confirm your access level

### Forgot Password

**Problem**: Don't remember the password

**Solution**:
1. Access the source code
2. Open `src/components/Login.jsx`
3. View the password constants (lines 10-11)
4. Or change them to new passwords and rebuild

### Session Won't Persist

**Problem**: Asked for password every time

**Solution**:
1. Enable cookies/localStorage in your browser
2. Don't use private/incognito mode
3. Check browser settings allow local storage
4. Try a different browser

---

## 📱 Mobile Access

The authentication system works on mobile devices:
- Responsive login screen
- Touch-friendly password input
- Same access levels apply
- Session persists on mobile browsers

---

## 🔄 Updating Passwords

### For Developers

If you need to change passwords:

1. Edit `src/components/Login.jsx`
2. Update the password constants
3. Remove the development info box
4. Rebuild: `npm run build`
5. Redeploy the application
6. Notify all users of the new passwords

### For Non-Developers

If you're not comfortable editing code:
- Contact your web developer
- Provide them with the new passwords you want
- They can update and redeploy for you

---

## 📋 Access Control Checklist

Before sharing your application:

- [ ] Changed default admin password
- [ ] Changed default read-only password
- [ ] Removed development info box
- [ ] Tested both passwords work
- [ ] Documented new passwords securely
- [ ] Decided who gets admin vs. read-only access
- [ ] Shared passwords via secure channels
- [ ] Explained access levels to team members
- [ ] Set up regular data export/backup schedule
- [ ] Planned password rotation schedule (3-6 months)

---

## 🎓 Training Your Team

### For Admin Users

Explain that they can:
- Add new projects, architects, contractors
- Edit any information
- Delete records (use carefully!)
- Manage project phases
- Assign team members to projects
- Import/export data

Remind them to:
- Export data regularly for backup
- Be careful with delete operations
- Keep admin password secure

### For Read-Only Users

Explain that they can:
- View all project information
- Check their assigned projects
- See timelines and deadlines
- Export data for their records

Remind them:
- They cannot modify any data
- Contact admin if changes are needed
- They can still export data for reference

---

## 🆘 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review [PASSWORD_SETUP.md](PASSWORD_SETUP.md)** for password issues
3. **Check browser console** for error messages (F12)
4. **Try a different browser** to isolate issues
5. **Clear browser data** and try again
6. **Contact your web developer** for technical issues

---

## 📊 Access Control Summary

| Feature | Admin | Read-Only |
|---------|-------|-----------|
| View Projects | ✅ | ✅ |
| Create Projects | ✅ | ❌ |
| Edit Projects | ✅ | ❌ |
| Delete Projects | ✅ | ❌ |
| View Architects | ✅ | ✅ |
| Add Architects | ✅ | ❌ |
| Edit Architects | ✅ | ❌ |
| Delete Architects | ✅ | ❌ |
| View Contractors | ✅ | ✅ |
| Add Contractors | ✅ | ❌ |
| Edit Contractors | ✅ | ❌ |
| Delete Contractors | ✅ | ❌ |
| Add Phases | ✅ | ❌ |
| Edit Phases | ✅ | ❌ |
| Delete Phases | ✅ | ❌ |
| Assign Team Members | ✅ | ❌ |
| View Gantt Charts | ✅ | ✅ |
| Export Data | ✅ | ✅ |
| Import Data | ✅ | ❌ |
| View Dashboard | ✅ | ✅ |

---

**Your Construction Project Manager is now secure and ready for team use!** 🎉

Remember to change the default passwords and share this guide with your team members so they understand their access levels.

