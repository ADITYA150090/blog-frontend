┌─────────────────────────────────────────────────────────────────┐
│                    🚀 SOCIAL BLOG PLATFORM                       │
│                     Component Architecture                        │
└─────────────────────────────────────────────────────────────────┘

📁 BACKEND
├── 🗄️  Models
│   ├── User Model (Enhanced)
│   │   ├── Profile (username, bio, avatar, title, location)
│   │   ├── Social Links (GitHub, Twitter, LinkedIn, Instagram)
│   │   ├── Skills Array
│   │   ├── Followers/Following Arrays
│   │   ├── Bookmarks (blogId, slug, savedAt)
│   │   ├── Reading History (blogId, time, completed)
│   │   ├── Likes (blogId, slug, likedAt)
│   │   ├── Achievements (type, title, icon, earnedAt)
│   │   └── Statistics (articles read, reading time, streaks)
│   │
│   └── Comment Model (Enhanced)
│       ├── User Avatar
│       ├── Mentions (@username detection)
│       ├── Likes Array
│       └── Parent-Child Relationships (replies)
│
├── ⚙️  Services
│   ├── Auth Service (register, login, verify)
│   └── User Service
│       ├── Profile Management
│       ├── Follow/Unfollow
│       ├── Bookmark/Like System
│       ├── Reading History Tracking
│       ├── Achievement System
│       └── User Search
│
└── 🛣️  Routes
    ├── /api/auth/* (register, login, verify)
    ├── /api/users/* (profile, follow, bookmark, like, search)
    └── /api/comments/* (get, create, update)

═══════════════════════════════════════════════════════════════════

📁 FRONTEND
├── 🎯 Context
│   └── AuthContext
│       ├── User state management
│       ├── Login/Register/Logout
│       └── LocalStorage persistence
│
├── 📄 Pages
│   ├── Home
│   │   ├── Hero Section
│   │   ├── Featured Blogs
│   │   ├── Portfolio Section
│   │   └── Email Subscribe
│   │
│   ├── BlogDetail (Enhanced)
│   │   ├── 📊 Reading Progress Tracker
│   │   ├── ❤️ Like Button
│   │   ├── 🔖 Bookmark Button
│   │   ├── 🎮 Code Playground Toggle
│   │   ├── 💬 Comment Section
│   │   └── 📤 Share Buttons
│   │
│   ├── UserProfile (NEW!)
│   │   ├── Profile Header
│   │   │   ├── Cover Image (gradient)
│   │   │   ├── Avatar
│   │   │   ├── Bio & Title
│   │   │   └── Social Links
│   │   │
│   │   ├── Statistics
│   │   │   ├── Followers Count
│   │   │   ├── Following Count
│   │   │   ├── Articles Read
│   │   │   └── 🔥 Current Streak
│   │   │
│   │   ├── Follow/Unfollow Button
│   │   │
│   │   └── Tabbed Content
│   │       ├── 📖 About (Skills)
│   │       ├── 📊 Activity (Reading History)
│   │       ├── 🏆 Achievements (Badges)
│   │       └── 🔖 Bookmarks (Saved Articles)
│   │
│   └── ProjectDetail
│
├── 🧩 Components
│   ├── ReadingProgress (NEW!)
│   │   ├── Top Progress Bar (gradient)
│   │   └── Floating Progress Circle
│   │       ├── SVG Progress Ring
│   │       └── Percentage Display
│   │
│   ├── ArticleActions (NEW!)
│   │   ├── Like Button (with heartbeat animation)
│   │   ├── Bookmark Button
│   │   └── Toast Notifications
│   │
│   ├── CodePlayground (NEW!)
│   │   ├── Code Editor (textarea)
│   │   ├── Run Button (executes JS)
│   │   ├── Copy Button
│   │   ├── Reset Button
│   │   ├── Output Console
│   │   └── Error Display
│   │
│   ├── CommentSection
│   │   ├── Comment List
│   │   ├── @Mention Support
│   │   └── Add Comment Form
│   │
│   ├── Sidebar (Navigation)
│   ├── Hero
│   ├── FeaturedBlogs
│   ├── EmailSubscribe
│   ├── ShareButtons
│   ├── VideoPlayer
│   ├── CodeBlock
│   └── Footer
│
└── 🎨 Styles
    ├── index.css (Global Styles)
    ├── UserProfile.css (Profile Styles)
    ├── ArticleActions.css (Action Buttons)
    ├── ReadingProgress.css (Progress UI)
    └── CodePlayground.css (VSCode Theme)

═══════════════════════════════════════════════════════════════════

🎮 USER FLOW

1️⃣  AUTHENTICATION
    Register → Email Verify → Login → Token Stored

2️⃣  READING ARTICLES
    Browse → Click Article → Reading Progress Tracked
    → Like/Bookmark → Complete (>90%) → Stats Updated
    → Achievement Unlocked (if milestone)

3️⃣  CODE INTERACTION
    View Code Block → Click "Try Interactive"
    → Edit Code → Run → See Output → Copy Code

4️⃣  SOCIAL FEATURES
    View Profile → Follow User → See Activity
    → Write Comment with @mention → Get Notified

5️⃣  GAMIFICATION
    Read Article (+1 article count)
    → Daily Read (streak +1)
    → Unlock Achievement → View Badge Collection

═══════════════════════════════════════════════════════════════════

🏆 ACHIEVEMENT TRIGGERS

📚 First Steps          → 1 article read
🎯 Dedicated Reader     → 10 articles read
🔥 Week Warrior         → 7-day streak
🏆 Month Master         → 30-day streak
👥 Growing Community    → 10 followers

═══════════════════════════════════════════════════════════════════

📊 DATA MODELS

User {
  username, email, password (hashed)
  profile: { name, bio, avatar, title, location, website }
  socialLinks: { github, twitter, linkedin, instagram }
  skills: [string]
  followers: [userId]
  following: [userId]
  bookmarks: [{ blogId, slug, savedAt }]
  readingHistory: [{ blogId, slug, readAt, readingTime, completed }]
  likes: [{ blogId, slug, likedAt }]
  achievements: [{ type, title, description, icon, earnedAt }]
  stats: {
    totalArticlesRead,
    totalReadingTime,
    currentStreak,
    longestStreak,
    lastReadDate
  }
}

Comment {
  blogSlug, user, userName, userAvatar, content
  mentions: [{ userId, username }]
  likes: [userId]
  parentComment: commentId
  replies: [commentId]
}

═══════════════════════════════════════════════════════════════════

✨ KEY FEATURES SUMMARY

✅ User Profiles & Bios
✅ Follow/Unfollow System
✅ @Mentions in Comments
✅ Like Articles (with animations)
✅ Bookmark Articles
✅ Reading Progress Tracker
✅ Reading Time & History
✅ Streak System (Daily Reads)
✅ Achievement Badges
✅ Interactive Code Playground
✅ User Search
✅ Activity Feed
✅ Social Links Integration
✅ Toast Notifications
✅ Responsive Design
✅ Dark Mode (VSCode theme)
✅ Smooth Animations

═══════════════════════════════════════════════════════════════════
        Built with ❤️ - A Complete Social Coding Platform
═══════════════════════════════════════════════════════════════════
