# Password Setup Guide

## 🔐 Changing Default Passwords

**IMPORTANT**: The application comes with default passwords for testing. You **MUST** change these passwords before deploying to production.

---

## Default Passwords (Change These!)

- **Admin Password**: `admin123`
- **Read-Only Password**: `view123`

---

## How to Change Passwords

### Step 1: Locate the Login Component

Open the file: `src/components/Login.jsx`

### Step 2: Find the Password Constants

Look for these lines (around line 10-11):

```javascript
// Default passwords - Admin should change these in the code
const ADMIN_PASSWORD = 'admin123'
const READONLY_PASSWORD = 'view123'
```

### Step 3: Change the Passwords

Replace the default passwords with your own secure passwords:

```javascript
// Default passwords - Admin should change these in the code
const ADMIN_PASSWORD = 'YourSecureAdminPassword123!'
const READONLY_PASSWORD = 'YourReadOnlyPassword456!'
```

### Step 4: Remove Development Info Box

**IMPORTANT**: Remove the development info box that displays passwords on the login screen.

In the same file (`src/components/Login.jsx`), find and **DELETE** this entire section (around line 60-70):

```javascript
{/* Password Info for Development - Remove in production */}
<div className="fixed bottom-4 right-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-xs max-w-xs shadow-lg">
  <p className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Development Info</p>
  <p className="text-yellow-800 dark:text-yellow-200 mb-1">Admin: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">admin123</code></p>
  <p className="text-yellow-800 dark:text-yellow-200">Read-Only: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">view123</code></p>
  <p className="text-yellow-700 dark:text-yellow-300 mt-2 italic">Remove this box in production!</p>
</div>
```

### Step 5: Rebuild the Application

After changing the passwords, rebuild the application:

```bash
npm run build
```

### Step 6: Test Your New Passwords

Start the development server and test:

```bash
npm run dev
```

Open `http://localhost:5173` and verify:
- Your new admin password works
- Your new read-only password works
- The development info box is gone

### Step 7: Deploy

Once verified, deploy the updated application to GitHub Pages or your hosting platform.

---

## 🔒 Password Security Best Practices

### Creating Strong Passwords

**Admin Password** (Full Access):
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Example: `Constr#2025!Admin$Secure`

**Read-Only Password** (View Access):
- Minimum 10 characters
- Easier to share with team members
- Example: `ViewOnly2025!`

### Password Management

1. **Don't share passwords via email or chat**
   - Use secure password managers
   - Share in person or via encrypted channels

2. **Change passwords regularly**
   - Update every 3-6 months
   - Update immediately if compromised

3. **Different passwords for different environments**
   - Use different passwords for testing vs. production
   - Never reuse passwords from other systems

4. **Document password changes**
   - Keep a secure record of when passwords were changed
   - Notify team members when passwords are updated

---

## 👥 Sharing Passwords with Team

### For Admin Access
- Only share with trusted administrators
- Limit to 1-2 people maximum
- Use encrypted password managers (1Password, LastPass, Bitwarden)

### For Read-Only Access
- Can be shared more broadly with team members
- Still use secure channels
- Consider creating a team password manager vault

---

## 🚨 Security Warnings

### ⚠️ Current Limitations

This is a **client-side only** authentication system:

1. **Passwords are stored in the source code**
   - Anyone with access to the code can see the passwords
   - This is suitable for small teams with trusted members
   - NOT suitable for public-facing applications

2. **No password encryption**
   - Passwords are compared as plain text
   - Suitable for internal team use only

3. **No account management**
   - No password reset functionality
   - No user registration
   - No multi-user accounts

### ✅ What This System IS Good For

- **Internal team use** (5-20 people)
- **Trusted team members only**
- **Simple access control** (admin vs. read-only)
- **Small construction companies**
- **Projects with limited budget**

### ❌ What This System is NOT Good For

- **Public-facing applications**
- **Large organizations** (50+ users)
- **Sensitive financial data**
- **Compliance requirements** (HIPAA, SOC 2, etc.)
- **Multi-tenant applications**

---

## 🔐 Upgrading to Better Security (Future)

If you need more robust security, consider:

### Option 1: Add Backend Authentication
- Use Firebase Authentication
- Use Auth0
- Use AWS Cognito
- Implement your own Node.js/Express backend

### Option 2: Use Environment Variables
Instead of hardcoding passwords, use environment variables:

```javascript
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const READONLY_PASSWORD = import.meta.env.VITE_READONLY_PASSWORD
```

Create a `.env` file:
```
VITE_ADMIN_PASSWORD=YourSecurePassword123!
VITE_READONLY_PASSWORD=YourReadOnlyPassword456!
```

**Note**: Environment variables are still visible in the built JavaScript, but they're not in the source code repository.

### Option 3: Implement Proper Backend
For production use with multiple users:
- Build a Node.js/Express backend
- Use PostgreSQL or MongoDB for user storage
- Implement JWT tokens for sessions
- Add password hashing (bcrypt)
- Add password reset functionality
- Add email verification

---

## 📝 Quick Checklist

Before deploying to production:

- [ ] Changed admin password from `admin123`
- [ ] Changed read-only password from `view123`
- [ ] Removed the yellow development info box
- [ ] Tested both passwords work correctly
- [ ] Rebuilt the application (`npm run build`)
- [ ] Documented the new passwords securely
- [ ] Shared passwords with team via secure channel
- [ ] Set a reminder to change passwords in 3-6 months

---

## 🆘 Forgot Your Password?

If you forget your password:

1. **Access the source code**
   - Open `src/components/Login.jsx`
   - View the password constants
   - Or change them to new passwords

2. **Rebuild and redeploy**
   - Run `npm run build`
   - Deploy the updated version

3. **Clear browser storage** (if needed)
   - Open browser DevTools (F12)
   - Go to Application → Local Storage
   - Delete `construction_auth` and `construction_role`
   - Refresh the page

---

## 📞 Support

If you need help with password setup or security:
- Review this guide carefully
- Check the main README.md for general setup
- Consult with a web developer for advanced security needs

---

**Remember**: Security is a balance between convenience and protection. This system is designed for small teams with trusted members. For larger organizations or sensitive data, consider implementing a proper backend authentication system.

---

**Last Updated**: October 2025

