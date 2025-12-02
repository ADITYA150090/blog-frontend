# 🚀 New Features: Search, Admin Panel & Content Management

## 🔍 Find Users Feature
- **Route:** `/search`
- Search for users and view suggestions.

## 🛡️ Admin Panel & Content Management
A complete dashboard for managing your blog platform.

- **Route:** `/admin`
- **Access:** Admin users only.

### 📝 New Admin Features:
1.  **Overview:** View stats for Users, Blogs, Projects, and Subscribers.
2.  **User Management:** Delete users.
3.  **Upload Blog:** Create and publish new blog posts directly from the dashboard.
    - Supports Markdown/HTML content.
    - Auto-generates slugs.
4.  **Upload Project:** Add new projects to your portfolio.
5.  **Newsletter:**
    - View total subscriber count.
    - **Send Broadcast:** Send emails to ALL subscribers at once.

### 📧 Newsletter System
- **Public:** Users can subscribe via the form on the Home page.
- **Backend:** Stores emails in MongoDB (`subscribers` collection).
- **Sending:** Uses `nodemailer`.
  - *Note:* To send real emails, configure `EMAIL_USER` and `EMAIL_PASS` in `.env`.
  - Currently logs to console if credentials are missing.

### 🛠️ Setup Instructions

1. **Restart Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Make Yourself Admin:**
   ```bash
   mongosh
   use codeblog
   db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
   ```

3. **Test It:**
   - Go to `/admin`
   - Try "Upload Blog"
   - Check "Newsletter" tab

---

## ✅ Verification Checklist

- [ ] **Home Page:** Check if Newsletter form appears at bottom.
- [ ] **Subscribe:** Enter an email -> Should say "Subscribed!".
- **Admin Panel:**
  - [ ] **Blogs Tab:** Create a test blog -> Check if it saves (API returns 201).
  - [ ] **Projects Tab:** Create a test project.
  - [ ] **Newsletter Tab:** Check if subscriber count increased.
  - [ ] **Send Email:** Try sending a broadcast (check server console for mock output).
