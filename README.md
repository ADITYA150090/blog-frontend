# 🚀 Social Coding Blog Platform

A modern, feature-rich blogging platform with **social features**, **user profiles**, **gamification**, and **interactive code playgrounds**!

![Features Dashboard](/.gemini/antigravity/brain/artifacts/blog_features_dashboard.png)

## ✨ Key Features

### 👤 **User Profiles & Social**
- Beautiful user profiles with avatars, bios, and social links
- Follow/Unfollow system
- Follower & Following counts
- @Mentions in comments
- User search functionality

### 📚 **Content Interaction**
- ❤️ Like articles with animated hearts
- 🔖 Bookmark/Save articles for later
- 📊 Reading progress tracker with circular indicator
- 📖 Reading history tracking
- ⏱️ Reading time tracking

### 🎮 **Interactive Features**
- Code Playground - Run JavaScript code directly in browser
- Toggle between view-only and interactive code modes
- Copy code snippets
- Syntax highlighting for multiple languages

### 🏆 **Gamification**
- Achievement badge system (5+ achievements)
- Reading streaks (🔥 current & longest)
- Progress tracking
- Activity history
- Personal statistics dashboard

### 💬 **Comments**
- User avatars in comments
- @Mention other users
- Like comments
- Threaded replies (parent-child relationships)

### 🎨 **Premium Design**
- VSCode-inspired dark theme
- Modern gradients and glassmorphism
- Smooth animations and transitions
- Responsive design for all devices
- Toast notifications

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Lucide Icons
- Custom CSS

**Backend:**
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

---

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start MongoDB (if local)
mongod

# Start backend server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
# From project root
npm install

# Start development server
npm run dev
# App runs on http://localhost:5173
```

---

## 🔧 Configuration

### Backend Environment Variables (`.env`)

Already configured in `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://0.0.0.0/codeblog
JWT_SECRET=secret123
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Note:** Update `EMAIL_USER` and `EMAIL_PASS` for email verification to work.

---

## 🚀 Usage Guide

### 1. **Register a New Account**
- Click on any login/register prompt
- Fill in: Name, Email, Username, Password
- Check email for verification link (or check console logs)

### 2. **Explore Articles**
- Browse featured articles on homepage
- Click to read full articles
- Watch reading progress tracker in action

### 3. **Interact with Content**
- ❤️ Click **Like** to save favorites
- 🔖 Click **Save** to bookmark for later
- Try the **🎮 Interactive Playground** on code examples

### 4. **Build Your Profile**
- Read articles to increase stats
- Build reading streaks (consecutive days)
- Unlock achievements
- Follow other users

### 5. **Social Features**
- Visit profiles at `/profile/username`
- Follow other users
- @Mention users in comments
- View activity history

---

## 📊 Achievement System

| Achievement | Icon | Requirement |
|------------|------|-------------|
| First Steps | 📚 | Read 1 article |
| Dedicated Reader | 🎯 | Read 10 articles |
| Week Warrior | 🔥 | 7-day reading streak |
| Month Master | 🏆 | 30-day reading streak |
| Growing Community | 👥 | Reach 10 followers |

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify/:token` - Verify email

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)
- `POST /api/users/follow/:userId` - Follow user (protected)
- `DELETE /api/users/follow/:userId` - Unfollow user (protected)
- `POST /api/users/bookmark` - Toggle bookmark (protected)
- `POST /api/users/like` - Toggle like (protected)
- `POST /api/users/reading-history` - Add reading history (protected)
- `GET /api/users/search?q=query` - Search users

### Comments
- `GET /api/comments/:blogSlug` - Get comments for blog
- `POST /api/comments` - Create comment (protected)

---

## 🖼️ Screenshots & Features

### User Profile
- Avatar with cover image
- Stats: Followers, Following, Articles Read, Streak
- Tabs: About, Activity, Achievements, Bookmarks
- Follow/Unfollow buttons

### Article Reading
- Reading progress bar (top)
- Floating progress circle (bottom-left)
- Like & Bookmark buttons
- Interactive code playground
- @Mention support in comments

### Achievements
- Visual badge cards
- Earned date
- Description
- Icons (emojis)

---

## 🎨 Design System

### Color Palette
```css
--vscode-bg: #0d1117
--vscode-sidebar: #161b22
--vscode-border: #30363d
--vscode-blue: #667eea
--vscode-purple: #764ba2
--text-bright: #f0f6fc
--text-secondary: #8b949e
```

### Gradients
- Primary: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Success: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`

---

## 🔒 Security

- JWT-based authentication
- Password hashing with bcryptjs (10 salt rounds)
- Protected routes requiring authentication
- Email verification system
- Token expiration (30 days)

---

## 🚧 Future Enhancements

- [ ] Profile edit page with avatar upload
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] Personal analytics dashboard
- [ ] Article creation for users
- [ ] Rich text editor for comments
- [ ] Email notifications for mentions
- [ ] Social media share cards

---

## 🤝 Contributing

This is a personal project, but feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - feel free to use for personal or commercial projects!

---

## 🙏 Credits

**Built with:**
- React Team
- Express Team  
- MongoDB Team
- Lucide Icons
- UI Inspiration: VSCode, GitHub, Dev.to

---

## 📞 Support

For issues or questions:
- Check `FEATURES.md` for detailed feature documentation
- Review code comments in components
- Test with sample data in `db.json`

---

**Made with ❤️ and ☕**

*A modern, social blogging platform for developers by developers!*
