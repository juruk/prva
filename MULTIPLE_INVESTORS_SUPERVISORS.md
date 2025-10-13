# Multiple Investors and Supervisors Feature

## Overview

The Construction Project Management application now supports **multiple investors and supervisors per project**. This enhancement allows you to track and manage contact information for all stakeholders involved in each project.

## What's New

### Previous Functionality
- Each project could have only **one investor** and **one supervisor**
- Limited to basic contact information stored as single objects

### New Functionality
- Each project can now have **multiple investors** and **multiple supervisors**
- Each investor/supervisor entry includes:
  - Name
  - Company
  - Phone number
  - Email address
- Easy-to-use interface for adding, editing, and removing entries
- Individual contact cards for each investor and supervisor

## How to Use

### Adding Investors

1. Navigate to a project's detail page
2. Locate the **Investors** card
3. Click the **"Add"** button (Admin access required)
4. Fill in the investor's information:
   - Name (optional)
   - Company (optional)
   - Phone (optional)
   - Email (optional)
5. Click **"Add"** to save

### Adding Supervisors

1. Navigate to a project's detail page
2. Locate the **Supervisors** card
3. Click the **"Add"** button (Admin access required)
4. Fill in the supervisor's information:
   - Name (optional)
   - Company (optional)
   - Phone (optional)
   - Email (optional)
5. Click **"Add"** to save

### Editing Investors/Supervisors

1. Find the investor or supervisor card you want to edit
2. Click the **Edit** icon (pencil) on the card
3. Update the information as needed
4. Click **"Update"** to save changes

### Removing Investors/Supervisors

1. Find the investor or supervisor card you want to remove
2. Click the **Delete** icon (trash) on the card
3. Confirm the deletion when prompted

## User Interface

### Investor Card Features
- **Icon**: Briefcase icon for easy identification
- **Display**: Shows all investors in separate cards
- **Information**: Name, company, email, and phone for each investor
- **Actions**: Edit and delete buttons for each entry (Admin only)

### Supervisor Card Features
- **Icon**: User check icon for easy identification
- **Display**: Shows all supervisors in separate cards
- **Information**: Name, company, email, and phone for each supervisor
- **Actions**: Edit and delete buttons for each entry (Admin only)

## Data Migration

### Automatic Migration
The application automatically migrates existing project data when you log in:

- **Old format**: Single `investor` and `supervisor` objects
- **New format**: Arrays of `investors` and `supervisors`

### Migration Process
1. When the app loads, it checks each project for old format data
2. If a single investor/supervisor object is found with data, it's converted to an array with one entry
3. Empty objects are converted to empty arrays
4. The migrated data is automatically saved to localStorage

### No Data Loss
- All existing investor and supervisor information is preserved
- The migration happens seamlessly in the background
- No manual intervention required

## Technical Details

### Data Structure

**Old Format:**
```json
{
  "investor": {
    "name": "John Doe",
    "company": "Investment Group",
    "phone": "+1 555-1234",
    "email": "john@example.com"
  },
  "supervisor": {
    "name": "Jane Smith",
    "company": "Oversight Inc",
    "phone": "+1 555-5678",
    "email": "jane@example.com"
  }
}
```

**New Format:**
```json
{
  "investors": [
    {
      "name": "John Doe",
      "company": "Investment Group",
      "phone": "+1 555-1234",
      "email": "john@example.com"
    },
    {
      "name": "Sarah Johnson",
      "company": "Capital Partners",
      "phone": "+1 555-9999",
      "email": "sarah@example.com"
    }
  ],
  "supervisors": [
    {
      "name": "Jane Smith",
      "company": "Oversight Inc",
      "phone": "+1 555-5678",
      "email": "jane@example.com"
    },
    {
      "name": "Mike Brown",
      "company": "Quality Control LLC",
      "phone": "+1 555-7777",
      "email": "mike@example.com"
    }
  ]
}
```

### Component Updates

#### ProjectDetail.jsx
- Added state management for multiple investors and supervisors
- Implemented add, edit, and delete functions for both
- Created dialog forms for data entry
- Updated UI to display multiple cards

#### App.jsx
- Added `migrateProjectData()` function for automatic data migration
- Migration runs on app load when authenticated
- Automatically saves migrated data back to localStorage

## Access Control

### Admin Users
- Can add, edit, and delete investors and supervisors
- Full access to all management features

### Read-Only Users
- Can view all investor and supervisor information
- Cannot add, edit, or delete entries
- Management buttons are hidden

## Benefits

1. **Better Stakeholder Management**: Track all investors and supervisors in one place
2. **Complete Contact Information**: Store name, company, phone, and email for each person
3. **Flexibility**: Add as many investors and supervisors as needed
4. **Easy Updates**: Edit or remove entries as project stakeholders change
5. **Backward Compatible**: Existing data is automatically migrated without data loss

## Best Practices

1. **Keep Information Updated**: Regularly review and update contact information
2. **Use Descriptive Names**: Include full names and company affiliations
3. **Verify Contact Details**: Ensure phone numbers and emails are accurate
4. **Remove Old Entries**: Delete investors/supervisors who are no longer involved
5. **Consistent Formatting**: Use consistent phone number and email formats

## Troubleshooting

### Issue: Old data not showing
**Solution**: The migration runs automatically on login. Try logging out and back in.

### Issue: Can't add investors/supervisors
**Solution**: Ensure you're logged in as an Admin user. Read-only users cannot modify data.

### Issue: Changes not saving
**Solution**: Check that you're clicking the "Add" or "Update" button in the dialog, not just closing it.

## Future Enhancements

Potential future improvements could include:
- Import/export investor and supervisor lists
- Link investors/supervisors across multiple projects
- Add notes or roles for each investor/supervisor
- Email notification integration
- Contact history tracking

## Support

For questions or issues with this feature, refer to the main USER_GUIDE.md or contact your system administrator.

---

**Version**: 2.0  
**Last Updated**: October 2025  
**Feature Status**: Active

