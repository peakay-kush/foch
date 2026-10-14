# TrueVolt Systems — PHP Backend & Admin CMS

A lightweight, zero-dependency, modern PHP backend and admin content management system designed for **cPanel Shared Hosting** with **MySQL/MariaDB**, seamlessly connected to the **Vercel Next.js** frontend.

---

## 📁 Directory Structure

```text
backend/
├── config/
│   └── database.php         # PDO connection & environment configuration
├── api/
│   ├── cors.php             # Unified CORS and JSON response helper
│   ├── projects.php         # REST API: GET projects (all, by category, featured)
│   └── contact.php          # REST API: POST client contact inquiries
├── admin/
│   ├── index.php            # Admin Overview Dashboard & stats
│   ├── projects.php         # Manage / Filter / Delete projects
│   ├── project-form.php     # Add / Edit project + Image file uploader
│   ├── login.php            # Secure admin authentication
│   ├── logout.php           # Session destroyer
│   ├── auth.php             # Session & CSRF security helpers
│   └── includes/
│       ├── header.php       # Admin navigation header
│       └── footer.php       # Admin footer
├── uploads/
│   ├── .htaccess            # Security: Blocks PHP execution in uploads
│   └── projects/            # Uploaded project photo assets
├── database/
│   └── schema.sql           # Database tables + Pre-seeded projects data
├── .htaccess                # Apache routing, security & CORS
└── README.md                # Deployment documentation
```

---

## 🚀 cPanel Deployment (Step-by-Step)

### Step 1: Create Database & User in cPanel
1. Log in to your cPanel.
2. Under the **Databases** section, click **MySQL® Databases**.
3. Create a new database: e.g. `cpaneluser_truevolt`.
4. Create a new MySQL user: e.g. `cpaneluser_admin` with a strong password.
5. In **Add User to Database**, select your user and database, click **Add**, and check **ALL PRIVILEGES**.

### Step 2: Import Schema via phpMyAdmin
1. In cPanel, click **phpMyAdmin**.
2. Select your newly created database on the left sidebar.
3. Click the **Import** tab at the top.
4. Click **Choose File** and select `backend/database/schema.sql`.
5. Click **Import** (or **Go**) at the bottom.
   > All tables (`admins`, `projects`, `inquiries`) will be created and pre-populated with all the live site's initial projects!

### Step 3: Upload Backend Files
1. In cPanel, open **File Manager**.
2. Navigate to your website's root:
   - If hosting on a subdomain (e.g. `api.truevoltsystems.co.ke`): upload contents of `backend/` directly into its root folder.
   - If hosting on a subfolder of your main domain (e.g. `truevoltsystems.co.ke/backend`): create a folder named `backend` and upload the files there.
3. Configure your database credentials:
   - In cPanel File Manager, make a copy of `.env.example` named `.env` in the `backend/` folder (or edit the included `.env` file).
   - Fill in your database details:
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=cpaneluser_truevolt
     DB_USER=cpaneluser_admin
     DB_PASS=YourStrongPasswordHere
     APP_URL=https://your-cpanel-domain.com/backend
     ```
   - *Note: `backend/.htaccess` has built-in security preventing anyone from downloading your `.env` file from the web.*
4. Verify that `backend/uploads/projects` has `755` write permissions.

---

## 🔐 Default Admin Credentials

* **URL**: `https://yourdomain.com/backend/admin/` (or `https://api.yourdomain.com/admin/`)
* **Username**: `admin`
* **Password**: `TrueVolt@2025`

*(You can change your password anytime directly in the database or via the admin portal).*

---

## 🌐 Connecting to Vercel (Frontend)

In your **Vercel Project Settings** &rarr; **Environment Variables**, add:

```env
NEXT_PUBLIC_API_URL=https://your-cpanel-domain.com/backend
```
*(Or `https://api.yourdomain.com` if using a subdomain).*

### 🛡️ Automatic Fallback Guarantee
If the PHP backend or cPanel server is ever unreachable, offline, undergoing maintenance, or experiencing slow database response, the Next.js frontend **automatically and instantly falls back to its built-in static data**. The live frontend will **never crash, display an error, or go down**.
