# 🚀 Quick Start Guide

## Get Your Social Blog Platform Running in 5 Minutes!

### Step 1: Start MongoDB
```bash
# If you have MongoDB installed locally
mongod

# OR use MongoDB Atlas (cloud) - already configured in .env
# MONGO_URI=mongodb://0.0.0.0/codeblog
```

### Step 2: Start Backend Server
```bash
cd backend
npm install
npm start
```

✅ You should see:
```
Server started on port 5000
MongoDB Connected
```

### Step 3: Start Frontend
```bash
# Open new terminal in project root
npm install
npm run dev
```

✅ You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

---

## 🎮 Test the Features

### 1. **Create Your First Account**
- Open http://localhost:5173
- Look for Login/Register in the interface
- Fill in:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Username: `johndoe`
  - Password: `password123`
- Check terminal for verification link (email not configured)
- Click the link or manually verify in MongoDB

### 2. **Read an Article**
- Click on any blog post
- Watch the **reading progress bar** appear at the top
- See the **floating progress circle** at bottom-left
- Scroll to see progress update in real-time

### 3. **Try Interactive Features**
- Click **❤️ Like** button (you'll need to login)
- Click **🔖 Save** to bookmark
- On code examples, click **🎮 Try Interactive**
- Edit the code and click **▶️ Run Code**

### 4. **View Your Profile**
- After reading an article, go to `/profile/johndoe`
- See your stats updated:
  - Articles Read: 1
  - Reading Streak: 1 day
  - Achievements unlocked: "First Steps 📚"

### 5. **Test Social Features**
- Create a second account (use different browser/incognito)
- Username: `janedoe`, Email: `jane@example.com`
- Search for `johndoe` in user search
- Click Follow button
- Go back to John's profile - see 1 follower!

---

## 📊 Watch Achievements Unlock

Read articles daily to unlock:

| Articles | Achievement |
|----------|-------------|
| 1 | 📚 First Steps |
| 10 | 🎯 Dedicated Reader |
| 7 days | 🔥 Week Warrior (7-day streak) |
| 30 days | 🏆 Month Master |

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is running
# On Windows:
net start MongoDB

# On Mac/Linux:
sudo systemctl start mongod
```

### Port already in use?
```bash
# Change ports in:
# backend/.env → PORT=5001
# Check vite.config.js for frontend port
```

### Can't login?
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify MongoDB is connected

---

## 🎨 Customize Your Blog

### Change Theme Colors
Edit `src/index.css`:
```css
:root {
--vscode-blue: #667eea;  /* Change to your color */
  --vscode-purple: #764ba2; /* Secondary color */
}
```

### Add Your Own Blog Posts
Edit `src/data/db.json`:
```json
{
  "blogs": [
    {
      "id": 7,
      "title": "Your Article Title",
      "slug": "your-article-slug",
      "excerpt": "Short description...",
      "category": "Tutorial",
      "tags": ["React", "JavaScript"],
      "author": "Your Name",
      "date": "2025-11-28",
      "readTime": "5 min",
      "featured": true,
      "code": {
        "language": "javascript",
        "snippet": "console.log('Hello World!');"
      }
    }
  ]
}
```

---

## 🚀 Deploy to Production

### Backend (Example: Railway/Render)
1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy!

### Frontend (Example: Vercel/Netlify)
1. Push code to GitHub
2. Import to Vercel/Netlify
3. Set build command: `npm run build`
4. Deploy!

---

## 📞 Need Help?

- Check `README.md` for detailed docs
- Review `FEATURES.md` for feature list
- Check `ARCHITECTURE.md` for system design
- Look at component code comments

---

## ✨ Pro Tips

1. **Read daily** to maintain your streak 🔥
2. **Bookmark articles** you want to revisit
3. **Follow users** to see their activity
4. **Try the code playground** - it's interactive!
5. **Unlock all achievements** - challenge yourself!

---

**Ready? Let's go! 🚀**

Visit: http://localhost:5173

Happy Coding! 💻✨
